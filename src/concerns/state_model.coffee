Luca.concerns.StateModel =
  __initializer: ()->
    return unless @stateful is true
    return if @state? and not Luca.isBackboneModel(@state)
    
    @state = new Backbone.Model(@defaultState || {})

    @set ||= ()=> @state.set.apply(@state, arguments)
    @get ||= ()=> @state.get.apply(@state, arguments)  

    unless _.isEmpty(@stateChangeEvents)
      for attribute, handler of @stateChangeEvents
        fn = if _.isString(handler) then @[handler] else handler 
        
        if attribute is "*"
          @on "state:change", fn, @
        else
          @on "state:change:#{ attribute }", fn, @

    @state.on "change", (state)=>
      @trigger "state:change", state

      for changed, value of state.changedAttributes()
        @trigger "state:change:#{ changed }", value, state.previous(changed)

