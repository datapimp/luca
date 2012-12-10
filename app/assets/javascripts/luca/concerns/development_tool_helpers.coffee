Luca.concerns.DevelopmentToolHelpers = 
  refreshCode: ()->
    view = @

    _( @eventHandlerProperties() ).each (prop)->
      view[ prop ] = view.definitionClass()[prop]

    if @autoBindEventHandlers is true
      @bindAllEventHandlers()

    @delegateEvents()

  eventHandlerProperties: ()->
    handlerIds = _( @events ).values()
    _( handlerIds ).select (v)->
      _.isString(v)

  eventHandlerFunctions: ()->
    handlerIds = _( @events ).values()
    _( handlerIds ).map (handlerId)=>
      if _.isFunction(handlerId) then handlerId else @[handlerId]  