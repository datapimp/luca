Luca.modules.Deferrable = 
  configure_collection: (setAsDeferrable=true)->
    return unless @collection

    # if there is already an instantiated backbone collection don't do anything
    unless @collection and _.isFunction( @collection.fetch ) and _.isFunction( @collection.reset )
      @collection = new Luca.components.FilterableCollection( @collection.initial_set, @collection )
    
    if @collection?.deferrable_trigger
      @deferrable_trigger = @collection.deferrable_trigger

    if setAsDeferrable
      @deferrable = @collection

