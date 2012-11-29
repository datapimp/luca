# TODO
# 
# This is horrendous code.  I need to replace it ASAP
Luca.concerns.Deferrable = 
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

