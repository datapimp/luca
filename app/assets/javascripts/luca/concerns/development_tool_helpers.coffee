Luca.concerns.DevelopmentToolHelpers = 
  refreshEventBindings: ()->
    view = @

    console.log "Refreshing Event Bindings ON ", view.name || view.cid

    view.undelegateEvents()

    domEvents = view.definitionClass?()?.events || view.events

    for eventSignature, eventName of domEvents when _.isString(eventName) is true
      defaultEventHandler = view.definitionClass?()?[ eventName ]
      console.log "Rebinding dom event", eventSignature, eventName, defaultEventHandler
      view.events[ eventSignature ] = defaultEventHandler

    if view.state? and view.stateful?
      Luca.concerns.StateModel.__setupModelBindings.call(view, "off")
      Luca.concerns.StateModel.__setupModelBindings.call(view, "on")

    if view.isContainer is true and not _.isEmpty(view.componentEvents)
      Luca.Container::registerComponentEvents.call(@,undefined,"off")
      newBindings = view.definitionClass?()?.componentEvents

      Luca.Container::registerComponentEvents.call(@,newBindings,"on")


    #if @autoBindEventHandlers is true
    #  @bindAllEventHandlers()

    view.delegateEvents()
