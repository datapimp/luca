# TODO
# 
# This is horrendous code.  I need to replace it ASAP
Luca.concerns.Deferrable = 
  configure_collection: (setAsDeferrable=true)->
    return unless @collection

    if _.isString( @collection ) and collectionManager = Luca.CollectionManager?.get()
      @collection = collectionManager.getOrCreate(@collection)

    if _.isObject(@collection) and not Luca.isBackboneCollection(@collection) 
      @collection = new Luca.Collection( @collection.initial_set, @collection )
    
    if @collection?.deferrable_trigger
      @deferrable_trigger = @collection.deferrable_trigger

    if setAsDeferrable
      @deferrable = @collection

