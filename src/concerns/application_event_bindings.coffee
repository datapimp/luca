Luca.concerns.ApplicationEventBindings = 
  __initializer: ()->
    return if _.isEmpty(@applicationEvents)

    app = @app

    if _.isString( app ) or _.isUndefined( app )
      app = Luca.Application?.get?(app)

    unless Luca.supportsEvents( app )
      throw "Error binding to the application object on #{ @name || @cid }"

    for eventTrigger, handler in @applicationEvents
      handler = @[handler] if _.isString(handler) 

      unless _.isFunction(handler)
        throw "Error registering application event #{ eventTrigger } on #{ @name || @cid }"

      app.on(eventTrigger, handler)