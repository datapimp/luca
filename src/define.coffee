# Component Definition Helpers
#
#
# We have customized the core Backbone.extend process to use a slightly
# different syntax, which allows us to intercept the component definition at
# various points, and maintain information about classes being defined, and
# the relationships between inherited classes, etc.

# _.def, or Luca.define returns a chainable object which allows you to define
# your components with a readable syntax.  For example:

# _.def("Luca.View").extends("Backbone.View").with the_good:"shit"
# _.def("MyView").extends("Luca.View").with the_custom:"shit"
_.mixin
  def: Luca.component = Luca.define = Luca.register = (componentName)-> new DefineProxy(componentName)

# The define proxy chain sets up a call to Luca.extend, which is a wrapper around Luca and Backbone component class' extend function.
class DefineProxy
  constructor:(componentName)->
    @namespace = Luca.util.namespace()
    @componentId = @componentName = componentName
    @superClassName = 'Luca.View' 
    @properties ||= {}

    if componentName.match(/\./)
      @namespaced = true
      parts = componentName.split('.')
      @componentId = parts.pop()
      @namespace = parts.join('.')

      # automatically add the namespace to the namespace registry
      Luca.registry.addNamespace( parts.join('.') )

  meta: (key, value)->
    metaKey = @namespace + '.' + @componentId
    metaKey = metaKey.replace(/^\./,'')
    data = Luca.registry.addMetaData(metaKey, key, value)

    @properties.componentMetaData = ()->
      Luca.registry.getMetaDataFor(metaKey)

  # allow for specifying the namespace
  in: (@namespace)-> @

  # allow for multiple ways of saying the same thing for readability purposes
  from: (@superClassName)-> @
  extends: (@superClassName)-> @
  extend: (@superClassName)-> @

  triggers: (hooks...)->
    _.defaults(@properties ||= {}, hooks: []) 
    for hook in hooks
      @properties.hooks.push(hook) 
    @properties.hooks = _.uniq(@properties.hooks)
    @meta("hooks", @properties.hooks)
    @

  includes: (includes...)->
    _.defaults(@properties ||= {}, include: []) 
    for include in includes
      @properties.include.push(include) 
    @properties.include = _.uniq(@properties.include)
    @meta("includes", @properties.include)
    @

  mixesIn: (mixins...)->
    _.defaults(@properties ||= {}, mixins: []) 
    for mixin in mixins
      @properties.mixins.push(mixin) 
    @properties.mixins = _.uniq(@properties.mixins)

    @meta("mixins", @properties.mixins)
    @

  publicConfiguration: (properties={})->
    @meta("public configuration", _.keys(properties) )
    _.defaults((@properties||={}), properties)

  privateConfiguration: (properties={})->
    @meta("private configuration", _.keys(properties) )
    _.defaults((@properties||={}), properties)

  publicInterface: (properties={})->
    @meta("public interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)

  privateInterface: (properties={})->
    @meta("private interface", _.keys(properties) )
    _.defaults((@properties||={}), properties)

  definePrototype: (properties={})->
    _.defaults((@properties||={}), properties)

    at = if @namespaced
      Luca.util.resolve(@namespace, (window || global))
    else
      (window||global)

    # automatically create the namespace
    if @namespaced and not at?
      eval("(window||global).#{ @namespace } = {}")
      at = Luca.util.resolve(@namespace,(window || global))

    @meta("super class name", @superClassName )
    @meta("display name", @componentName)

    @properties.displayName = @componentName
    
    @properties.componentMetaData = ()->
      Luca.registry.getMetaDataFor(@displayName)

    definition = at[@componentId] = Luca.extend(@superClassName,@componentName, @properties)

    if Luca.config.autoRegister is true 
      componentType = "view" if Luca.isViewPrototype( definition )

      if Luca.isCollectionPrototype( definition )
        Luca.Collection.namespaces ||= []
        Luca.Collection.namespaces.push( @namespace )
        componentType = "collection" 

      componentType = "model" if Luca.isModelPrototype( definition )

      # automatically register this with the component registry
      Luca.registerComponent( _.string.underscored(@componentId), @componentName, componentType)

    definition

# Aliases for the mixin definition
DefineProxy::behavesAs = DefineProxy::uses = DefineProxy::mixesIn 

# Aliases for the final call on the define proxy
DefineProxy::defines = DefineProxy::defaults = DefineProxy::exports = DefineProxy::defaultProperties = DefineProxy::definePrototype
DefineProxy::defaultsTo = DefineProxy::enhance = DefineProxy::with = DefineProxy::definePrototype

# The last method of the DefineProxy chain is always going to result in
# a call to Luca.extend.  Luca.extend wraps the call to Luca.View.extend,
# or Backbone.Collection.extend, and accepts the names of the extending,
# and extended classes as strings.  This allows us to maintain information
# and references to the classes and their prototypes, mainly for the purposes
# of introspection and development tools
Luca.extend = (superClassName, childName, properties={})->
  superClass = Luca.util.resolve( superClassName, (window || global) )

  unless _.isFunction(superClass?.extend)
    throw "Error defining #{ childName }. #{ superClassName } is not a valid component to extend from"

  properties.displayName = childName

  properties._superClass = ()->
    superClass.displayName ||= superClassName
    superClass

  properties._super = (method, context=@, args=[])->
    # TODO: debug this better
    # protect against a stack too deep error in weird cases
    @_superClass().prototype[method]?.apply(context, args)

  definition = superClass.extend(properties)

  # _.def("MyView").extends("View").with
  #   include: ['Luca.Events']
  if _.isArray( properties?.include )
    for include in properties.include
      include = Luca.util.resolve(include) if _.isString(include)
      _.extend(definition::, include)

  definition


Luca.mixin = (mixinName)->
  namespace = _( Luca.mixin.namespaces ).detect (space)->
    Luca.util.resolve(space)?[ mixinName ]?

  namespace ||= "Luca.modules"

  resolved = Luca.util.resolve(namespace)[ mixinName ]

  console.log "Could not find #{ mixinName } in ", Luca.mixin.namespaces unless resolved?

  resolved

Luca.mixin.namespaces = [
  "Luca.modules"
]

Luca.mixin.namespace = (namespace)->
  Luca.mixin.namespaces.push(namespace)
  Luca.mixin.namespaces = _( Luca.mixin.namespaces ).uniq()

# Luca.decorate('Luca.View').with('Luca.modules.MyCustomMixin')
Luca.decorate = (componentPrototype)->
  componentPrototype = Luca.util.resolve(componentPrototype).prototype if _.isString(componentPrototype)
  
  return with: (mixin)->
    mixinDefinition = Luca.mixin(mixin)

    mixinPrivates   = _( mixinDefinition ).chain().keys().select (key)-> 
      "#{ key }".match(/^__/)

    sanitized   = _( mixinDefinition ).omit( mixinPrivates.value() )

    _.extend(componentPrototype, sanitized)

    # When a mixin is included, we may want to do things 
    mixinDefinition?.__included?.call(mixinDefinition, mixin) 

    superclassMixins = componentPrototype._superClass()::mixins

    componentPrototype.mixins ||= []
    componentPrototype.mixins.push( mixin )
    componentPrototype.mixins = componentPrototype.mixins.concat( superclassMixins )

    componentPrototype.mixins = _( componentPrototype.mixins ).chain().uniq().compact().value()

    componentPrototype
