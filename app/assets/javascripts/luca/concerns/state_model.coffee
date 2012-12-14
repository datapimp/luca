Luca.concerns.StateModel =
  __initializer: ()->
    @stateful = @stateAttributes if @stateAttributes?

    return unless @stateful?
    return if @state? 
    
    statefulView = @

    if _.isObject(@stateful) and not @defaultState?
      @defaultState = @stateful 

    @state = new Backbone.Model(@defaultState || {})
    @set = _.bind(@state.set, @state) 
    @get = _.bind(@state.get, @state) 

    for key, value of @state.toJSON()
      hook = "on" + _.str.capitalize(key) + "Change"
      getter = "get" + _.str.capitalize(key) 
      unless _.isFunction(@[getter])
        1
        #console.log("State Change Getter", getter)
        # @[getter] = ()=> @state.get(key)
        # WE COULD CREATE AUTO GETTERS HERE

      if _.isFunction(@[hook])
        1
        #console.log("State Change Hook", hook)
        # @stateChangeEvents[ key ] = hook
        # WE COULD AUTO BIND TO STATE CHANGE EVENTS HERE

    unless _.isEmpty(@stateChangeEvents)
      for attribute, handler of @stateChangeEvents
        fn = if _.isString(handler) then statefulView[handler] else handler 
        
        if attribute is "*"
          statefulView.on "state:change", fn, statefulView 
        else
          statefulView.on "state:change:#{ attribute }", fn, statefulView 

    # Any time there is a model change event on the internal state machine
    # we will trigger a general state:change event on the component as well
    # as individual state:change:attribute events

    state = statefulView.state 
    
    statefulView.state.on "change", (args...)=>
      @trigger.call(statefulView, "state:change", args... )

      for changed, value of state.changedAttributes()
        @trigger.call statefulView, "state:change:#{ changed }", state, value, state.previous(changed)

