Luca.modules.StateModel =

  __initializer: ()->
    return unless @stateful is true
    return if @state? and not Luca.isBackboneModel(@state)
    
    @state = new Backbone.Model(@defaultState || {})

    @set ||= ()=> @state.set.apply(@state, arguments)
    @get ||= ()=> @state.get.apply(@state, arguments)  

    @state.on "change", (state)=>
      @trigger "state:change", state
      previousValues = state.previousAttributes()
      for changed, value in state.changedAttributes
        @trigger "state:change:#{ changed }", value, state.previous(changed)

