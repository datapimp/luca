# The `Luca.CollectionView` renders models from a `Luca.Collection` into multiple
# elements, and provides methods for filtering, paginating, sorting the underlying
# collection and re-rendering the contents of its `@el` accordingly.
#
# #### Basic Example
#     collectionView = Luca.register  "App.views.Books"
#     collectionView.extends          "Luca.CollectionView"
#
#     collectionView.defines
#       itemProperty: "author"
#       collection: new Luca.Collection([
#         author: "George Orwell"
#         title:  "Animal Farm"
#       ,
#         author: "Noam Chomsky"
#         title: "Manufacturing Consent"
#       ])
#
#     view = new App.views.Books()
# #### Extending it to make it Filterable and Paginatable
#     filterable = Luca.register    "App.views.FilterableBooks"
#     filterable.extends            "App.views.Books"
#     filterable.defines
#       collection: "books" 
#       paginatable: 12
#       filterable:
#         query:
#           author: "George Orwell"
#    
#      view = new App.views.FilterableBooks()
# #### Filterable Collections
#
# The `Luca.CollectionView` will attempt to perform a local query against its
# collection which behaves like a `Backbone.QueryCollection`.  It will do this
# by default without making a remote request to the API.  
# 
# If you do not want this behavior, you can configure the `Luca.CollectionView` to 
# behave as if the filtering was happen remotely in your REST API.  
#
#       filterable:
#         options:
#           remote: true
collectionView = Luca.register      "Luca.CollectionView"

collectionView.extends            "Luca.Panel"

collectionView.replaces           "Luca.components.CollectionView"

collectionView.mixesIn            "QueryCollectionBindings", 
                                  "LoadMaskable", 
                                  "Filterable", 
                                  "Paginatable",
                                  "Sortable"

collectionView.triggers           "before:refresh",
                                  "after:refresh",
                                  "refresh",
                                  "empty:results"

collectionView.publicConfiguration
  # Specify which collection will be used to supply the models to be rendered.
  # Accepts either a string alias for the Collection class, or an instance of
  # any class which inherits from Backbone.Collection
  collection: undefined

  # By default the CollectionView will be rendered inside of an OL tag.
  tagName: "ol"

  # The CollectionView behaves as a Luca.Panel which means it has an area for
  # top and bottom toolbars.  The actual content that gets rendered from the 
  # collection will be rendered inside an element with the specified class.
  bodyClassName: "collection-ui-panel"

  # Each item from the collection will be rendered inside of an element specified by @itemTagName
  itemTagName: 'li'

  # Each item element will be assigned a CSS class specified by @itemClassName 
  itemClassName: 'collection-item'

  # Specify which template should be used to render each item in the collection.  
  # Accepts a string which will be passed to Luca.template(@itemTemplate).  Your template
  # can expect to be passed an object with the `model` and `index` properties on it.
  itemTemplate: undefined

  # Accepts a reference to a function, which will be called with an object with the `model` and `index`
  # properties on it.  This function should return a String which will be injected into the item DOM element.
  itemRenderer: undefined

  # Plucks the specified property from the model and inserts it into the item DOM element.
  itemProperty: undefined

  # If @observeChanges is set to true, any change in an underlying model will automatically be re-rendered.
  observeChanges: false

collectionView.publicMethods
  initialize: (@options={})->
    _.extend(@, @options)
    _.bindAll @, "refresh"

    unless @collection? or @options.collection
      console.log "Error on initialize of collection view", @
      throw "Collection Views must specify a collection"

    unless @itemTemplate? || @itemRenderer? || @itemProperty?
      throw "Collection Views must specify an item template or item renderer function"

    if _.isString(@collection) 
      if Luca.CollectionManager.get()
        @collection = Luca.CollectionManager.get().getOrCreate(@collection)
      else
        console.log "String Collection but no collection manager"

    unless Luca.isBackboneCollection(@collection)
      console.log "Missing Collection on #{ @name || @cid }", @, @collection
      throw "Collection Views must have a valid backbone collection"

    # INVESTIGATE THIS BEING DOUBLE WORK
    @on "data:refresh", @refresh, @
    @on "collection:reset", @refresh, @

    @on "collection:remove", @refresh, @
    @on "collection:add", @refresh, @
    @on "collection:change", @refreshModel, @ if @observeChanges is true

    Luca.Panel::initialize.apply(@, arguments)

    view = @
    if @getCollection()?.length > 0
      @on "after:render", ()->
        view.refresh()
        view.unbind "after:render", @

  # Given the id of a model, find the underlying DOM element which was rendered by this collection.
  # Assumes that the data-model-id attribute is set, which it is by default by @attributesForItem.
  locateItemElement: (id)->
    @$(".#{ @itemClassName }[data-model-id='#{ id }']")

  # Refresh is responsible for applying any filtering, pagination, or sorting options that may be set
  # from the various Luca.concerns mixed in by `Luca.CollectionView` and making a query to the underlying
  # collection.  It will then take the set of models returned by `@getModels` and pass them through the
  # item rendering pipeline.
  refresh: ()->
    query = @getLocalQuery()
    options = @getQueryOptions()
    models  = @getModels(query, options)

    @$bodyEl().empty()

    @trigger("before:refresh", models, query, options)

    if models.length is 0
      @trigger("empty:results", query, options)

    index = 0
    for model in models
      @$append @makeItem(model, index++)

    @trigger("after:refresh", models, query, options)

    @

collectionView.privateMethods
  # Determines which attributes should be set on the item DOM element. 
  attributesForItem: (item, model)->
    _.extend {}, class: @itemClassName, "data-index": item.index, "data-model-id": item.model.get('id')

  # Determines the content for the item DOM element.  Will use the appropriate options
  # specified by `@itemTemplate`, `@itemRenderer`, or `@itemProperty`
  contentForItem: (item={})->
    if @itemTemplate? and templateFn = Luca.template(@itemTemplate)
      return content = templateFn.call(@, item)

    if @itemRenderer? and _.isFunction( @itemRenderer )
      return content = @itemRenderer.call(@, item, item.model, item.index)

    if @itemProperty and item.model?
      return content = item.model.read( @itemProperty )

    ""

  # Uses the various options passed to the `CollectionView` to assemble a call to `Luca.View::make`.
  makeItem: (model, index)->
    item = if @prepareItem? then @prepareItem.call(@, model, index) else (model:model, index: index)
    attributes = @attributesForItem(item, model) 
    content = @contentForItem(item)

    try
      Luca.View::make(@itemTagName, attributes, content)
    catch e
      console.log "Error generating DOM element for CollectionView", @, model, index

  # Given a model, attempt to re-render the contents of its item in this view's DOM contents.
  refreshModel: (model)->
    index = @collection.indexOf( model )
    @locateItemElement(model.get('id')).empty().append( @contentForItem({model,index}, model) )
    @trigger("model:refreshed", index, model)


  registerEvent: (domEvent, selector, handler)->
    if !handler? and _.isFunction(selector)
      handler = selector
      selector = undefined

    eventTrigger = _([domEvent,"#{ @itemTagName }.#{ @itemClassName }", selector]).compact().join(" ")
    Luca.View::registerEvent(eventTrigger,handler)

collectionView.register()
