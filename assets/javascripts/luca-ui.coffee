#= require ./luca-ui-base
#= require ./luca-ui/components/template
#= require_tree ./luca-ui/components

Luca.Events =
  once: (trigger, callback, context)->
    context ||= @
    @bind trigger, ()->
      callback.apply(context, arguments)

_.extend Luca.View, Luca.Events
_.extend Luca.Collection, Luca.Events
_.extend Luca.Model, Luca.Events
