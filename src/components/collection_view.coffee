collectionView = Luca.register      "Luca.components.CollectionView"
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

collectionView.mixesIn            "LoadMaskable", 
                                  "Filterable", 
                                  "Paginatable"

collectionView.triggers           "before:refresh",
                                  "after:refresh",
                                  "refresh",
                                  "empty:results"

# IDEA:
# 
# For validation of component configuration,
# we could define a convention like:
#
# collectionView.validatesConfigurationWith
#   requiresValidCollectionAt: "collection"
#   requiresPresenceOf: 
#     either: ["itemTemplate", "itemRenderer", "itemProperty"]
#
#
collectionView.publicConfiguration
  tagName: "ol"
  bodyClassName: "collection-ui-panel"
  itemTagName: 'li'
  itemClassName: 'collection-item'
  itemTemplate: undefined
  itemRenderer: undefined
  itemProperty: undefined

collectionView.defines
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

    Luca.components.Panel::initialize.apply(@, arguments)

    @on "refresh", @refresh, @

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

  loadModels: (models=[], options={})->
    @getCollection()?.reset(models, options)

  applyQuery: (query={},queryOptions={})->
    @query = query
    @queryOptions = queryOptions
    @refresh()
    @

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQuery: (options={})-> 
    query = @query ||= {}
    for querySource in _( @querySources || [] ).compact()
      query = _.extend(query, (querySource(options)||{}) ) 
    query

  # Private: returns the query that is applied to the underlying collection.
  # accepts the same options as Luca.Collection.query's initial query option.
  getQueryOptions: ()-> 
    options = @queryOptions ||= {}

    for optionSource in _( @optionsSources || [] ).compact()
      options = _.extend(options, (optionSource()||{}) ) 

    options

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

  refresh: (query,options,models)->
    query   ||= @getQuery()
    options ||= @getQueryOptions()
    models  ||= @getModels(query, options)

    @$bodyEl().empty()

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
