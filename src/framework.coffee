window.Luca =
  VERSION: "0.8.599"
  core: {}
  containers: {}
  components: {}
  modules: {}
  util: {}
  fields: {}
  component_cache:
    cid_index: {}
    name_index: {}
  registry:
    classes: {}
    namespaces:["Luca.containers","Luca.components"]


# The Global Observer is very helpful in development
# it observes every event triggered on every view, collection, model
# and allows you to inspect / respond to them.  Use in production
# may have performance impacts which has not been tested
Luca.enableGlobalObserver = false

# let's use the Twitter 2.0 Bootstrap Framework
# for what it is best at, and not try to solve this
# problem on our own!
Luca.enableBootstrap = true

Luca.isBackboneModel = (obj)->
  _.isFunction(obj?.set) and _.isFunction(obj?.get) and _.isObject(obj?.attributes)

Luca.isBackboneView = (obj)->
  _.isFunction(obj?.render) and !_.isUndefined(obj?.el)

Luca.isBackboneCollection = (obj)->
  _.isFunction(obj?.fetch) and _.isFunction(obj?.reset)

# adds an additional namespace to look for luca ui
# components.  useful for when you define a bunch of
# components in your own application's namespace
Luca.registry.addNamespace = (identifier)->
  Luca.registry.namespaces.push( identifier )
  Luca.registry.namespaces = _( Luca.registry.namespaces ).uniq()

# stores or looks up a component in the component cache
# by its backbone @cid or by its component_name
Luca.cache = (needle, component)->
  Luca.component_cache.cid_index[ needle ] = component if component?

  component = Luca.component_cache.cid_index[ needle ]

  # optionally, cache it by tying its name to its cid for easier lookups
  if component?.component_name?
    Luca.component_cache.name_index[ component.component_name ] = component.cid
  else if component?.name?
    Luca.component_cache.name_index[ component.name ] = component.cid

  return component if component?

  # perform a lookup by name if the component_id didn't turn anything
  lookup_id = Luca.component_cache.name_index[ needle ]

  Luca.component_cache.cid_index[ lookup_id ]

# Takes an string like "deep.nested.value" and an object like window
# and returns the value of window.deep.nested.value.  useful for defining
# references on objects which don't yet exist, as strings, which get
# evaluated at runtime when such references will be available
Luca.util.resolve = (accessor, source_object)->
  _( accessor.split(/\./) ).inject (obj,key)->
    obj = obj?[key]
  , source_object

# A better name for Luca.util.nestedValue
Luca.util.nestedValue = Luca.util.resolve

# turns a word like form_view into FormView
Luca.util.classify = (string="")->
  _.string.camelize( _.string.capitalize( string ) )

# Lookup a component in the Luca component registry
# by it's ctype identifier.  If it doesn't exist,
# check any other registered namespace
Luca.registry.lookup = (ctype)->
  c = Luca.registry.classes[ctype]

  return c if c?

  className = Luca.util.classify(ctype)

  parents = _( Luca.registry.namespaces ).map (namespace)-> Luca.util.nestedValue(namespace, (window || global))

  _( parents ).chain().map((parent)-> parent[className]).compact().value()?[0]

# one of the main benefits of Luca is the ability to structure your app as
# large blocks of JSON configuration.  In order to convert an object into
# a Luca component, we lookup the object's class by converting its ctype / type
# property into a class that has been registered in the component registry
Luca.util.lazyComponent = (config)->
  ctype = config.ctype || config.type

  componentClass = Luca.registry.lookup( ctype )

  throw "Invalid Component Type: #{ ctype }.  Did you forget to register it?" unless componentClass

  constructor = eval( componentClass )

  new constructor(config)

# for lazy component creation
Luca.register = (component, constructor_class)->
  exists = Luca.registry.classes[component]

  if exists? and !window.TestRun?
    console.log "Attempting to register component with the signature #{ component }. Already exists"
  else
    Luca.registry.classes[component] = constructor_class

Luca.available_templates = (filter="")->
  available = _( Luca.templates ).keys()

  if filter.length > 0
    _( available ).select (tmpl)-> tmpl.match(filter)
  else
    available

Luca.util.isIE = ()->
  try
    Object.defineProperty({}, '', {})
    return false
  catch e
    return true

# This is a convenience method for accessing the templates
# available to the client side app, either the ones which ship with Luca
# available in Luca.templates ( these take precedence ) or
# the app's own templates which are usually available in JST

# optionally, passing in variables will compile the template for you, instead
# of returning a reference to the function which you would then call yourself
Luca.template = (template_name, variables)->
  window.JST ||= {}

  luca = Luca.templates?[ template_name ]
  jst = JST?[ template_name ]

  unless luca? or jst?
    needle = new RegExp("#{ template_name }$")

    luca = _( Luca.templates ).detect (fn,template_id)->
      needle.exec( template_id )

    jst = _( JST ).detect (fn,template_id)->
      needle.exec( template_id )

  throw "Could not find template with #{ template_name }" unless luca || jst

  template = luca || jst

  return template(variables) if variables?

  template

#### Component Definition And Inheritance
#
# this is a nice way of extending / inheriting
# this allows for syntactic sugar such as:
#
# Luca.define("TestClass").extends("Luca.View").with
#   property: "value"
#   name: "whatever"
#
# All instances of TestClass defined this way, will have
# _className properties of 'TestClass' as well as a reference
# to the extended class 'Luca.View' so that you can inspect
# an instance of TestClass and know that it inherits from 'Luca.View'
class DefineProxy
  constructor:(componentName)->
    @namespace = (window || global)
    @componentId = @componentName = componentName

    if componentName.match(/\./)
      @namespaced = true
      parts = componentName.split('.')
      @componentId = parts.pop()
      @namespace = parts.join('.')

      # automatically add the namespace to the namespace registry
      Luca.registry.addNamespace( parts.join('.') )

  in: (@namespace)-> @
  from: (@superClassName)-> @
  extends: (@superClassName)-> @
  extend: (@superClassName)-> @
  with: (properties)->
    at = if @namespaced then Luca.util.resolve(@namespace, (window || global)) else (window||global)

    if @namespaced and _.isUndefined(at)
      eval("window.#{ @namespace } = {}")
      at = Luca.util.resolve(@namespace,(window || global))

    at[@componentId] = Luca.extend(@superClassName,@componentName, properties)

    # automatically register this with the component registry
    Luca.register( _.string.underscored(@componentId), @componentName)

    at[@componentId]

Luca.define = (componentName)->
  new DefineProxy(componentName)

# An alias for Luca.define
# which I think reads better:
#
# Luca.component('Whatever').extends('Something').with(enhancements)
Luca.component = Luca.define

Luca.extend = (superClassName, childName, properties={})->
  superClass = Luca.util.resolve( superClassName, (window || global) )

  unless _.isFunction(superClass?.extend)
    throw "#{ superClassName } is not a valid component to extend from"

  properties._className = childName

  properties._superClass = ()->
    superClass._className ||= superClassName
    superClass

  superClass.extend(properties)

_.mixin
  component: Luca.define

#### Once We Are Ready To go....
$ do ->
  $('body').addClass('luca-ui-enabled')