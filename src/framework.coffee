# the Luca() browser utility function is meant to be a smart wrapper around various
# types of input which will return what the developer would expect given the
# context it is used.
lucaUtilityHelper = (payload, args...)->
  unless payload?
    return _( Luca.Application.instances ).values()?[0]

  if _.isString(payload) and result = Luca.cache(payload)
    return result

  if _.isString(payload) and result = Luca.find(payload)
    return result

  if _.isString(payload) and result = Luca.registry.find(payload)
    return result

  if payload instanceof jQuery and result = Luca.find(payload)
    return result

  if _.isObject(payload) and payload.ctype?
    return Luca.util.lazyComponent( payload )

  if _.isObject(payload) and payload.defines and payload.extends
    definition = payload.defines
    inheritsFrom = payload.extends

  if _.isFunction( fallback = _(args).last() )
    return fallback()

(window || global).Luca = ()-> lucaUtilityHelper.apply(@, arguments)

_.extend Luca,
  VERSION: "0.9.76"
  core: {}
  collections: {}
  containers: {}
  components: {}
  models: {}
  concerns: {}
  util: {}
  fields: {}
  registry:{}
  options: {}
  config: {}
  getHelper: ()->
    ()-> lucaUtilityHelper.apply(@, arguments)

# for triggering / binding to component definitions
_.extend Luca, Backbone.Events

Luca.config.maintainStyleHierarchy = true
Luca.config.maintainClassHierarchy = true
Luca.config.autoApplyClassHierarchyAsCssClasses = true

# When using Luca.define() should we automatically register
# the component with the registry?
Luca.autoRegister = Luca.config.autoRegister = true

# if developmentMode is true, you have access to some neat development tools
Luca.developmentMode = Luca.config.developmentMode = false

# The Global Observer is very helpful in development
# it observes every event triggered on every view, collection, model
# and allows you to inspect / respond to them.  Use in production
# may have performance impacts which has not been tested
Luca.enableGlobalObserver = Luca.config.enableGlobalObserver = false

# let's use the Twitter 2.0 Bootstrap Framework
# for what it is best at, and not try to solve this
# problem on our own!
Luca.config.enableBoostrap = Luca.config.enableBootstrap = true

Luca.config.enhancedViewProperties = true

Luca.keys = Luca.config.keys =
  ENTER: 13
  ESCAPE: 27
  KEYLEFT: 37
  KEYUP: 38
  KEYRIGHT: 39
  KEYDOWN: 40
  SPACEBAR: 32
  FORWARDSLASH: 191

# build a reverse map
Luca.keyMap = Luca.config.keyMap = _( Luca.keys ).inject (memo, value, symbol)->
  memo[value] = symbol.toLowerCase()
  memo
, {}

Luca.config.showWarnings = true

Luca.setupCollectionSpace = (options={})->
  {baseParams, modelBootstrap} = options

  if baseParams? 
    Luca.Collection.baseParams( baseParams )
  else
    Luca.warn('You should remember to set the base params for Luca.Collection class.  You can do this by defining a property or function on Luca.config.baseParams')

  if modelBootstrap?
    Luca.Collection.bootstrap( modelBootstrap )
  else
    Luca.warn("You should remember to set the model bootstrap location for Luca.Collection.  You can do this by defining a property or function on Luca.config.modelBootstrap")

# Creates a basic Namespace for you to begin defining
# your application and all of its components.
Luca.initialize = (namespace, options={})->
  defaults = 
    views: {}
    collections: {}
    models: {}
    components: {}
    lib: {}
    util: {}
    concerns: {}
    register: ()->
      Luca.register.apply(@, arguments)
    onReady: ()-> 
      Luca.onReady.apply(@, arguments)
    getApplication: ()->
      Luca.getApplication?.apply(@, arguments)
    getCollectionManager: ()->
      Luca.CollectionManager.get?.apply(@, arguments)


  object = {}
  object[ namespace ] = _.extend(Luca.getHelper(), defaults)

  _.extend(Luca.config, options)
  _.extend (window || global), object

  Luca.concern.namespace "#{ namespace }.concerns"
  Luca.registry.namespace "#{ namespace }.views"
  Luca.Collection.namespace "#{ namespace }.collections"

  Luca.on "ready", ()->
    Luca.define.close()
    Luca.setupCollectionSpace(options)

Luca.onReady = (callback)->
  Luca.trigger("ready")

  $ -> callback.apply(@, arguments)

Luca.warn = (message)->
  console.log(message) if Luca.config.showWarnings is true

Luca.find = (el)->
  Luca( $(el).data('luca-id') )

Luca.supportsEvents = Luca.supportsBackboneEvents = (obj)->
  Luca.isComponent(obj) or (_.isFunction( obj?.trigger ) or _.isFunction(obj?.bind))

Luca.isComponent = (obj)->
  Luca.isBackboneModel(obj) or Luca.isBackboneView(obj) or Luca.isBackboneCollection(obj)

Luca.isComponentPrototype = (obj)->
  Luca.isViewPrototype(obj) or Luca.isModelPrototype(obj) or Luca.isCollectionPrototype(obj)

Luca.isBackboneModel = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.set) and _.isFunction(obj?.get) and _.isObject(obj?.attributes)

Luca.isBackboneView = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.render) and !_.isUndefined(obj?.el)

Luca.isBackboneCollection = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  _.isFunction(obj?.fetch) and _.isFunction(obj?.reset)

Luca.isViewPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? and obj::make? and obj::$? and obj::render?

Luca.isModelPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? obj::save? and obj::changedAttributes?

Luca.isCollectionPrototype = (obj)->
  obj = Luca.util.resolve(obj) if _.isString(obj)
  obj? and obj::? and !Luca.isModelPrototype(obj) and obj::reset? and obj::select? and obj::reject?

Luca.inheritanceChain = (obj)->
  Luca.parentClasses(obj)

Luca.parentClasses = (obj)->
  list = []

  if _.isString(obj)
    obj = Luca.util.resolve(obj)

  metaData = obj.componentMetaData?()
  metaData ||= obj::componentMetaData?()

  list = metaData?.classHierarchy() || [obj.displayName || obj::displayName]

Luca.parentClass = (obj, resolve=true)->
  if _.isString( obj )
    obj = Luca.util.resolve(obj)

  parent = obj.componentMetaData?()?.meta["super class name"]
  parent ||= obj::componentMetaData?()?.meta["super class name"]

  parent || obj.displayName || obj.prototype?.displayName

  if resolve then Luca.util.resolve(parent) else parent


# This is a convenience method for accessing the templates
# available to the client side app, either the ones which ship with Luca
# available in Luca.templates ( these take precedence ) or
# the app's own templates which are usually available in JST

# optionally, passing in variables will compile the template for you, instead
# of returning a reference to the function which you would then call yourself
Luca.template = (template_name, variables)->
  window.JST ||= {}

  if _.isFunction(template_name)
    return template_name(variables)

  luca = Luca.templates?[ template_name ]
  jst = JST?[ template_name ]

  unless luca? or jst?
    needle = new RegExp("#{ template_name }$")

    luca = _( Luca.templates ).detect (fn,template_id)->
      needle.exec( template_id )

    jst = _( JST ).detect (fn,template_id)->
      needle.exec( template_id )

  throw "Could not find template named #{ template_name }" unless luca || jst

  template = luca || jst

  return template(variables) if variables?

  template

Luca.available_templates = (filter="")->
  available = _( Luca.templates ).keys()

  if filter.length > 0
    _( available ).select (tmpl)-> tmpl.match(filter)
  else
    available


UnderscoreExtensions =
  module: (base,module)->
    _.extend base, module
    if base.included and _(base.included).isFunction()
      base.included.apply(base)

  delete: (object, key)->
    value = object[key]
    delete object[key]
    value

  # this function will ensure a function gets called at least once
  # afrer x delay.  by setting defaults, we can use this on backbone
  # view definitions
  #
  # Note:  I am not sure if this is the same as _.debounce or not.  I will need
  # to look into it
  idle: (code, delay=1000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleShort: (code, delay=100)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleMedium: (code, delay=2000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleLong: (code, delay=5000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

_.mixin(UnderscoreExtensions)
