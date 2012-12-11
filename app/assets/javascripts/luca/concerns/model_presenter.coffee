Luca.concerns.ModelPresenter = 
  classMethods:
    getPresenter: (format)->
      @presenters?[format]

    registerPresenter: (format, config)->
      @presenters ||= {} 
      @presenters[ format ] = config

  presentAs: (format)->
    try
      attributeList = @componentMetaData().componentDefinition().getPresenter(format) 

      return @toJSON() unless attributeList?

      _( attributeList ).reduce (memo, attribute)=>
        memo[ attribute ] = @read(attribute)
        memo 
      , {}

    catch e
      console.log "Error presentAs", e.stack, e.message
      return @toJSON()
