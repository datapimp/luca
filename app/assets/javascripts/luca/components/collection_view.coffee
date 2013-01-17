# The CollectionView handles rendering a set of models from a 
# collection
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
  tagName: "ol"
  bodyClassName: "collection-ui-panel"
  itemTagName: 'li'
  itemClassName: 'collection-item'
  itemTemplate: undefined
  itemRenderer: undefined
  itemProperty: undefined

  # should we automatically re-render
  # our collection items every time their
  # model changes?
  observeChanges: false

collectionView.publicMethods
  initialize: (@options={})->
    _.extend(@, @options)
    _.bindAll @, "refresh"

    # IDEA:
    #
    # This type of code could be moved into a re-usable concern
    # which higher order components can mixin to make it easier
    # to extend them, instantiate them, etc.
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

  # Refresh applies the current query settings to the collection
  # to arrive at a set of models.  It then renders each model
  # into the view according to the settings.
  refresh: ()->
    query   = @getQuery()
    options = @getQueryOptions()
    models  = @getModels(query, options)

    @$bodyEl().empty()

    @trigger("before:refresh", models, query, options)

    if models.length is 0
      @trigger("empty:results", query, options)

    @renderModels( models )

    @trigger("after:refresh", models, query, options)

    @

collectionView.privateMethods
  renderModels: (models)->
    index = 0
    for model in models
      @$append @makeItem(model, index++)    

  attributesForItem: (item, model)->
    attributes = 
      class: @itemClassName
      "data-index": item.index 
      "data-model-id": item.model.get('id')

  contentForItem: (item={})->
    if @itemTemplate? and templateFn = Luca.template(@itemTemplate)
      return content = templateFn.call(@, item)

    if @itemRenderer? and _.isFunction( @itemRenderer )
      return content = @itemRenderer.call(@, item, item.model, item.index)

    if @itemProperty and item.model?
      return content = item.model.read( @itemProperty )

    ""

  makeItem: (model, index)->
    item = if @prepareItem? then @prepareItem.call(@, model, index) else (model:model, index: index)
    attributes = @attributesForItem(item, model) 
    content = @contentForItem(item)
    # TEMP
    # Figure out why calls to make are failing with an unexpected string error
    try
      make(@itemTagName, attributes, content)
    catch e
      console.log "Error generating DOM element for CollectionView", @, model, index
      #no op

  locateItemElement: (id)->
    @$(".#{ @itemClassName }[data-model-id='#{ id }']")

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

# Private Helpers

collectionView.register()

make = Luca.View::make
