Luca.concerns.CollectionEventBindings = 
  __initializer: ()->

    @defer ()=>
      Luca.concerns.CollectionEventBindings.__setup.call(@)
    .until("after:initialize")

    unless @collectionEventBindingsSetup is true
      if Luca.isBackboneCollection(@collection)
        @collection.on "reset",         relayAs("collection:reset"), @
        @collection.on "add",           relayAs("collection:add"), @
        @collection.on "remove",        relayAs("collection:remove"), @
        @collection.on "change",        relayAs("collection:change"), @
        @collection.on "before:fetch",  relayAs("collection:fetch"), @
        
      @collectionEventBindingsSetup = true

  __setup: ()->
    return if _.isEmpty( @collectionEvents )

    manager = @collectionManager || Luca.CollectionManager.get()

    for signature, handler of @collectionEvents
      [key,eventTrigger] = signature.split(" ")

      collection = manager.getOrCreate( key )

      if !collection
        throw "Could not find collection specified by #{ key }"

      if _.isString(handler)
        handler = @[handler]

      unless _.isFunction(handler)
        throw "invalid collectionEvents configuration"

      try
        collection.on(eventTrigger, handler, @)
      catch e
        console.log "Error Binding To Collection in registerCollectionEvents", @
        throw e


relayAs = (eventName)->
  (args...)->
    args.unshift(eventName)
    @trigger.apply(@, args)