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
