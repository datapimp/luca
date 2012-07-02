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

  # an alias for with, or a readability helper in multi-line definitions
  enhance: (properties)->
    return @with(properties) if properties?
    @

  # which properties, methods, etc will you be extending the base class with?
  with: (properties)->
    at = if @namespaced
      Luca.util.resolve(@namespace, (window || global))
    else
      (window||global)

    # automatically create the namespace
    if @namespaced and not at?
      eval("(window||global).#{ @namespace } = {}")
      at = Luca.util.resolve(@namespace,(window || global))

    at[@componentId] = Luca.extend(@superClassName,@componentName, properties)

    if Luca.autoRegister is true 
      componentType = "view" if Luca.isViewPrototype( at[@componentId] )
      componentType = "collection" if Luca.isCollectionPrototype( at[@componentId] )
      componentType = "model" if Luca.isModelPrototype( at[@componentId] )

      # automatically register this with the component registry
      Luca.register( _.string.underscored(@componentId), @componentName, componentType)

    at[@componentId]

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

  superClass.extend(properties)

_.mixin
  def: Luca.define


# Luca.Events
#
# These helpers will get mixed into Luca.Collection, Luca.View, and Luca.Model.
#
# They allow for syntactic sugar like:
#
# view.defer("someMethodOnTheView").until("collection","fetch")
#
# or
#
# view.defer( myCallback ).until("triggered:event")
class DeferredBindingProxy
  constructor: (@object, operation, wrapWithUnderscore=true)->
    if _.isFunction(operation)
      fn = operation

    else if _.isString(operation) and _.isFunction(@object[operation])
      fn = @object[operation]

    unless _.isFunction(fn)
      throw "Must pass a function or a string representing one"

    if wrapWithUnderscore is true
      @fn = ()=>
        _.defer(fn)
    else
      @fn = fn

    @

  # until accepts an object to bind to, and a trigger to bind with
  # if you just pass a trigger, the object getting bound to
  # will implicitly be @object
  until: (watch, trigger)->
    if watch? and not trigger?
      trigger = watch
      watch = @object

    watch.once(trigger, @fn)

    @object

Luca.Events =
  defer: (operation, wrapWithUnderscore=true)->
    new DeferredBindingProxy(@, operation, wrapWithUnderscore)

  once: (trigger, callback, context)->
    context ||= @

    onceFn = ()->
      callback.apply(context, arguments)
      @unbind(trigger, onceFn)

    @bind trigger, onceFn

class Luca.ScriptLoader
  @loaded: {}

  constructor: (options={})->
    _.extend(@, Backbone.Events, Luca.Events)
    @autoStart = options.autoStart is true
    @scripts = options.scripts

    ready = ()-> @trigger("ready")

    @ready = _.after( @scripts.length, ready)

    _.bindAll @, "load", "ready"

    @defer("load").until(@, "start")

    if @autoStart is true
      @trigger("start")

    @bind "ready", @onReady

  applyPrefix: (script)->
    script

  onReady: ()->
    console.log "All dependencies loaded"

  start: ()->
    @trigger("start")

  load: ()->
    Luca.util.loadScript( @applyPrefix(script), @ready ) for script in @scripts

