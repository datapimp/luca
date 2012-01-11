Luca.modules.Deferrable = 
  configure_collection: ()->
    collection = @collection || @store || @filterable_collection || @deferrable
    collection.url ||= collection.base_url 

    @deferrable = @collection = new Luca.components.FilterableCollection( collection.initial_set, collection )
