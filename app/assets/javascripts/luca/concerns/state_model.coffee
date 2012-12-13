Luca.concerns.StateModel =
  __initializer: ()->
    @stateful = @stateAttributes if @stateAttributes?

    statefulView = @

    return unless @stateful?
    return if @state? 
    
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
        fn = if _.isString(handler) then @[handler] else handler 
        
        if attribute is "*"
          @on "state:change", fn, @
        else
          @on "state:change:#{ attribute }", _.debounce(fn,10), @

    @state.on "change", _.debounce (state)=>
      @trigger "state:change", state, @

      console.log "State Change", state.changedAttributes()
      for changed, value of state.changedAttributes()
        @trigger "state:change:#{ changed }", state, value, state.previous(changed), statefulView
    , 10

