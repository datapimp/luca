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
class Luca.DeferredBindingProxy
  constructor: (@object, operation, wrapWithUnderscore=true)->
    if _.isFunction(operation)
      fn = operation

    else if _.isString(operation) and _.isFunction(@object[operation])
      fn = @object[operation]

    unless _.isFunction(fn)
      throw "Must pass a function or a string representing one"

    if wrapWithUnderscore is true
      @fn = _.bind ()->
        _.defer(fn)
      , @object
    else
      @fn = _.bind(fn,@object)

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

class Luca.EventRelayer
  constructor: (options={})->
    {@target,@events,@prefix,@source} = options

    if @events.length > 0 and @target and @source
      @setup()
    @

  prefixedBy: (@prefix="")->
    @

  from:(@source)->
    @

  to: (@target)->
    @

  setup: (@target)->
    prefix = @prefix
    target = @target

    for eventId in @events
      console.log "Binding to ", eventId, prefix, @target.name, @source.name
      @source.on eventId, (args...)->
        trigger = _( [prefix,eventId] ).compact().join(':')
        args.unshift(trigger)
        @trigger.apply(@, args)
      , target


Luca.Events =
  relays: (events...)->
    new Luca.EventRelayer(relayer: @, events: events)

  defer: (operation, wrapWithUnderscore=true)->
    new Luca.DeferredBindingProxy(@, operation, wrapWithUnderscore)

  once: (trigger, callback, context)->
    context ||= @

    onceFn = ()->
      callback.apply(context, arguments)
      @unbind(trigger, onceFn)

    @bind trigger, onceFn


Luca.EventsExt =
  waitUntil:(trigger, context)->
    @waitFor.call(@, trigger, context )

  waitFor: (trigger, context)->
    self = @
    proxy =
      on:(target)->
        target.waitFor.call(target,trigger,context)
      and:(runList...)->
        for fn in runList
          fn = if _.isFunction(fn) then fn else self[fn]
          self.once(trigger, fn, context)
      andThen: ()->
        self.and.apply(self, arguments)

  relayEvent: (trigger)->
    on: (components...)=>
      to: (targets...)=>
        for target in targets
          for component in components
            component.on trigger, (args...)=>
              args.unshift(trigger)
              target.trigger.apply(target,args)
