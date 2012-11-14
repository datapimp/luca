collectionView = Luca.define      "Luca.components.CollectionView"
# The CollectionView facilitates the rendering of a Collection
# of models into a group of many rendered templates
# 
# Example:
#
#   new Luca.components.CollectionView 
#     itemTemplate: "template_name"
#     collection:   "collection_class_name"
#     pagination:
#       page: 1
#       limit: 15
#     filterable:
#       query:
#         default: 'value'     
#
collectionView.extends            "Luca.components.Panel"

collectionView.behavesAs          "LoadMaskable", 
                                  "Filterable", 
                                  "Paginatable"

collectionView.triggers           "before:refresh",
                                  "after:refresh",
                                  "refresh",
                                  "empty:results"

collectionView.defaults

  tagName: "ol"

  className: "luca-ui-collection-view"

  bodyClassName: "collection-ui-panel"

  # A collection view can pass a model through to a template
  itemTemplate: undefined

  # A collection view can pass a model through a function which should return a string
  itemRenderer: undefined

  itemTagName: 'li'

  itemClassName: 'collection-item'

  initialize: (@options={})->
    _.extend(@, @options)

    _.bindAll @, "refresh"

    unless @collection? or @options.collection
      throw "Collection Views must specify a collection"

    unless @itemTemplate? || @itemRenderer? || @itemProperty?
      throw "Collection Views must specify an item template or item renderer function"

    Luca.components.Panel::initialize.apply(@, arguments)

    if _.isString(@collection) and Luca.CollectionManager.get()
      @collection = Luca.CollectionManager.get().getOrCreate(@collection)

    unless Luca.isBackboneCollection(@collection)
      throw "Collection Views must have a valid backbone collection"

      @collection.on "before:fetch", ()=>
        @trigger "enable:loadmask"
        
      @collection.bind "reset", ()=>
        @refresh()
        @trigger "disable:loadmask"

      @collection.bind "remove", ()=>
        @refresh()

      @collection.bind "add", ()=>
        @refresh()

      if @observeChanges is true
        @collection.on "change", @refreshModel, @

    unless @autoRefreshOnModelsPresent is false
      @defer ()=> 
        @refresh() if @collection.length > 0
      .until("after:render")

    @on "collection:change", @refresh, @

  attributesForItem: (item, model)->
    _.extend {}, class: @itemClassName, "data-index": item.index, "data-model-id": item.model.get('id')

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

  getCollection: ()->
    @collection

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQuery: ()-> 
    @query ||= {}

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQueryOptions: ()-> 
    @queryOptions ||= {}

  # Private: returns the models to be rendered.  If the underlying collection
  # responds to @query() then it will use that interface. 
  getModels: (query,options)->
    if @collection?.query
      query ||= @getQuery()
      options ||= @getQueryOptions()
      
      @collection.query(query, options)
    else
      @collection.models

  locateItemElement: (id)->
    @$(".#{ @itemClassName }[data-model-id='#{ id }']")

  refreshModel: (model)->
    index = @collection.indexOf( model )
    @locateItemElement(model.get('id')).empty().append( @contentForItem({model,index}, model) )
    @trigger("model:refreshed", index, model)

  refresh: (query,options)->
    query ||= @getQuery()
    options ||= @getQueryOptions()

    @$bodyEl().empty()
    models = @getModels(query, options)

    @trigger("before:refresh", models, query, options)

    if models.length is 0
      @trigger("empty:results")

    index = 0

    for model in models
      @$append @makeItem(model, index++)

    @trigger("after:refresh", models, query, options)

    @

  registerEvent: (domEvent, selector, handler)->
    if !handler? and _.isFunction(selector)
      handler = selector
      selector = undefined

    eventTrigger = _([domEvent,"#{ @itemTagName }.#{ @itemClassName }", selector]).compact().join(" ")
    Luca.View::registerEvent(eventTrigger,handler)

  render: ()->
    @refresh()
    @$attach() if @$el.parent().length > 0 and @container?
    @

# Private Helpers


make = Luca.View::make
