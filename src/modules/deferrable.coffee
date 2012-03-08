# TODO THis module is going to be deprecated as it has been gradually gut over time
Luca.modules.Deferrable = 
  configure_collection: (setAsDeferrable=true)->
    return unless @collection

    if _.isString( @collection ) and collectionManager = Luca.CollectionManager?.get()
      @collection = collectionManager.getOrCreate(@collection)

    # if there is already an instantiated backbone collection don't do anything
    unless @collection and _.isFunction( @collection.fetch ) and _.isFunction( @collection.reset )
      @collection = new Luca.Collection( @collection.initial_set, @collection )
    
    if @collection?.deferrable_trigger
      @deferrable_trigger = @collection.deferrable_trigger

    if setAsDeferrable
      @deferrable = @collection

