Luca.concerns.FormModelBindings = 
  __initializer: ()->
    return unless @trackModelChanges is true

    @on "state:change:currentModel", (state, current, previous)=>
      @unbindFromModel(previous) if Luca.isBackboneModel(previous)
      @bindToModel(current) if Luca.isBackboneModel(current)

  unbindFromModel: (model)->
    (model || @currentModel())?.unbind("change", @onModelChange)  

  onModelChange: (model)->
    @setValues(model, modelChange: true)

  bindToModel: (model)->
    (model || @currentModel())?.bind("change", @onModelChange, @)  
