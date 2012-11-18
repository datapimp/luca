# The Enhanced Properties module allows for certain conventions
# in the definition of properties on Luca components.  For example,
# any view which has a collection property with a string value
# will automatically convert to an instance of the collection manager's
# instance of whose name matches the value of @collection
Luca.modules.EnhancedProperties = 
  __initializer: ()->
    return unless Luca.config.enhancedViewProperties is true 
    return if @isField is true

    if _.isString(@collection) and Luca.CollectionManager.get()
      @collection = Luca.CollectionManager.get().getOrCreate(@collection)      