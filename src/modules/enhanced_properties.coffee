Luca.modules.EnhancedProperties = 
  __initializer: ()->
    return unless Luca.config.enhancedViewProperties is true 

    # The @collection property.
    #
    # If the @collection property is a string, then upon initialization
    # of the view, that @collection property will be swapped out
    # with the instance of the collection of that name in the main
    # Luca.CollectionManager
    if _.isString(@collection) and Luca.CollectionManager.get()
      @collection = Luca.CollectionManager.get().getOrCreate(@collection)      

    # The @template property.
    #
    # For simple views which only need a template, you can specify the
    # template by its name, and we will render it for you.
    if @template?
      @$template(@template, @)

    # The @collectionManager property is also configurable by string
    if _.isString( @collectionManager )
      @collectionManager = Luca.CollectionManager.get( @collectionManager )
