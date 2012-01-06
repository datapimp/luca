Luca.modules.Deferrable = 
  configure_collection: ()->
    collection = @collection || @store || @filterable_collection
    
    if collection and collection.base_url
      _.extend collection,
        url: ()->
          collection.base_url
          
      @deferrable = @collection = new Luca.components.FilterableCollection( collection.initial_set, collection )
