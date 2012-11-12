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

Luca.define = (componentName)->
  new DefineProxy(componentName)

Luca.component = Luca.define

# The define proxy chain sets up a call to Luca.extend, which is a wrapper around Luca and Backbone component class' extend function.
class DefineProxy
  constructor:(componentName)->
    @namespace = Luca.util.namespace()
    @componentId = @componentName = componentName

    if componentName.match(/\./)
      @namespaced = true
      parts = componentName.split('.')
      @componentId = parts.pop()
      @namespace = parts.join('.')

      # automatically add the namespace to the namespace registry
      Luca.registry.addNamespace( parts.join('.') )

  # allow for specifying the namespace
  in: (@namespace)-> @

  # allow for multiple ways of saying the same thing for readability purposes
  from: (@superClassName)-> @
  extends: (@superClassName)-> @
  extend: (@superClassName)-> @

  includes: (includes...)->
    _.defaults(@properties ||= {}, include: []) 
    for include in includes
      @properties.include.push(include) 
    @

  mixesIn: (mixins...)->
    _.defaults(@properties ||= {}, mixins: []) 
    for mixin in mixins
      @properties.mixins.push(mixin) 
    @

  defaultProperties: (properties={})->
    _.defaults((@properties||={}), properties)

    at = if @namespaced
      Luca.util.resolve(@namespace, (window || global))
    else
      (window||global)

    # automatically create the namespace
    if @namespaced and not at?
      eval("(window||global).#{ @namespace } = {}")
      at = Luca.util.resolve(@namespace,(window || global))

    at[@componentId] = Luca.extend(@superClassName,@componentName, @properties)

    if Luca.autoRegister is true 
      componentType = "view" if Luca.isViewPrototype( at[@componentId] )

      if Luca.isCollectionPrototype( at[@componentId] )
        Luca.Collection.namespaces ||= []
        Luca.Collection.namespaces.push( @namespace )
        componentType = "collection" 

      componentType = "model" if Luca.isModelPrototype( at[@componentId] )

      # automatically register this with the component registry
      Luca.register( _.string.underscored(@componentId), @componentName, componentType)

    at[@componentId]

# Aliases for the mixin definition
DefineProxy::behavesAs = DefineProxy::uses = DefineProxy::mixesIn 

# Aliases for the final call on the define proxy
DefineProxy::defines = DefineProxy::defaults = DefineProxy::defaultProperties 
DefineProxy::defaultsTo = DefineProxy::enhance = DefineProxy::with = DefineProxy::defaultProperties

# The last method of the DefineProxy chain is always going to result in
# a call to Luca.extend.  Luca.extend wraps the call to Luca.View.extend,
# or Backbone.Collection.extend, and accepts the names of the extending,
# and extended classes as strings.  This allows us to maintain information
# and references to the classes and their prototypes, mainly for the purposes
# of introspection and development tools
Luca.extend = (superClassName, childName, properties={})->
  superClass = Luca.util.resolve( superClassName, (window || global) )

  unless _.isFunction(superClass?.extend)
    throw "#{ superClassName } is not a valid component to extend from"

  properties.displayName = childName

  properties._superClass = ()->
    superClass.displayName ||= superClassName
    superClass

  properties._super = (method, context, args)->
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

# Luca.decorate('Luca.View')
Luca.decorate = (componentPrototype)->
  componentPrototype = Luca.util.resolve(componentPrototype).prototype if _.isString(componentPrototype)
  
  return with: (mixin)->
    _.extend(componentPrototype, Luca.mixin(mixin) )

    componentPrototype.mixins ||= []
    componentPrototype.mixins.push( mixin )
    componentPrototype.mixins = _( componentPrototype.mixins ).uniq()
    componentPrototype

_.mixin
  def: Luca.define
