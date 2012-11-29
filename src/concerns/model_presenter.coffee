Luca.concerns.ModelPresenter = 
  classMethods:
    registerPresenter: ()->
      console.log "registering presenter", @

  presentAs: (format)->
    try
      presenterConfig = @componentMetaData().componentDefinition().presenters ||= {}

      attributeList = presenterConfig[ format ]

      return @toJSON() unless attributeList?

      _( attributeList ).reduce (memo, attribute)=>
        memo[ attribute ] = @read(attribute)
        memo 

    catch e
      return @toJSON()
