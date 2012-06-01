_.def('Luca.components.Controller').extends('Luca.containers.CardView').with
  initialize: (@options)->
    Luca.containers.CardView::initialize.apply @, arguments

    @defaultCard ||= @components[0]?.name

    throw "Controllers must specify a defaultCard property and/or the first component must have a name" unless @defaultCard

    @state = new Backbone.Model
      active_section: @defaultCard

  each: (fn)->
    _( @components ).each (component)=>
      fn.apply @, [component]

  default: (callback)->
    @navigate_to(@defaultCard, callback)

  # switch the active card of this controller
  # optionally passing an onActivation callback
  # will fire this callback in the context of
  # the currently active card
  navigate_to: (section, callback)->
    section ||= @defaultCard

    # activate is a method on Luca.containers.CardView which
    # selects a component and makes it visible, hiding any
    # other component which may be monopolizing the view at that time.

    # after activation it triggers a after:card:switch event
    # and if it is the first time that view is being activated,
    # it triggers a first:activation event which gets relayed to all
    # child components in that view
    @activate section, false, (activator, previous,current)=>
      @state.set(active_section: current.name )
      if _.isFunction( callback )
        callback.apply(current)

    # return the section we are navigating to
    @find(section)
