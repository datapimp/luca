
stateModel = Luca.register("Luca.ViewState").extends("Luca.Model")

Luca.concerns.StateModel =
  __onModelChange: (args...)->
    statefulView = @
    state = statefulView.state

    @trigger.call(statefulView, "state:change", args... )

    for changed, value of state.changedAttributes()
      @trigger.call statefulView, "state:change:#{ changed }", state, value, state.previous(changed)

  __initializer: ()->
    @stateful = @stateAttributes if @stateAttributes?

    return unless @stateful?
    
    statefulView = @

    if _.isObject(@stateful) and not @defaultState?
      @defaultState = @stateful 

    @state ||= new Luca.ViewState(@defaultState || {})

    view = @

    @get = ()->
      view.state.get.apply(view.state, arguments)

    @set = ()->
      view.state.set.apply(view.state, arguments)

    for key, value of @state.toJSON()
      hook = "on" + _.str.capitalize(key) + "Change"
      getter = "get" + _.str.capitalize(key) 
      unless _.isFunction(@[getter])
        1
      if _.isFunction(@[hook])
        1

    Luca.concerns.StateModel.__setupModelBindings.call(@, "on")

  __setupModelBindings: (direction="on")->
    statefulView = @
    for attribute, handler of @stateChangeEvents
      fn = if _.isString(handler) then statefulView[handler] else handler 
      
      if attribute is "*"
        statefulView[direction]("state:change", fn, statefulView)
      else
        statefulView[direction]("state:change:#{ attribute }", fn, statefulView)

    # Any time there is a model change event on the internal state machine
    # we will trigger a general state:change event on the component as well
    # as individual state:change:attribute events
    state = statefulView.state 
    statefulView.state[direction]("change", Luca.concerns.StateModel.__onModelChange, statefulView)
