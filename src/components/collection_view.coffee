# Public: The CollectionView renders a collection of models into a list of items.
# 
# Examples
#
#   _.def('App.ListView').extends('Luca.components.CollectionView').with
#     collection: new App.SampleCollection()
#     itemTemplate: "list_view_item"
#     loadMask: true
#

_.def("Luca.components.CollectionView").extends("Luca.components.Panel").with
  mixins: ["LoadMaskable","FilterableView"]

  tagName: "div"

  className: "luca-ui-collection-view"

  bodyClassName: "collection-ui-panel"

  # A collection view can pass a model through to a template
  itemTemplate: undefined

  # A collection view can pass a model through a function which should return a string
  itemRenderer: undefined

  itemTagName: 'li'

  itemClassName: 'collection-item'

  hooks:[
    "empty:results"
  ]
  
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

    if Luca.isBackboneCollection(@collection)
      @collection.on "before:fetch", ()=>
        @trigger "enable:loadmask" if @loadMask is true
        
      @collection.bind "reset", ()=>
        @trigger "disable:loadmask" if @loadMask is true
        @refresh()

      @collection.bind "add", @refresh
      @collection.bind "remove", @refresh

      if @observeChanges is true
        setupChangeObserver.call(@)

    else
      throw "Collection Views must have a valid backbone collection"

    if @collection.length > 0
      @refresh()

  attributesForItem: (item, model)->
    _.extend {}, class: @itemClassName, "data-index": item.index, "data-model-id": item.model.get('id')

  contentForItem: (item={})->
    if @itemTemplate? and templateFn = Luca.template(@itemTemplate)
      # this is the model
      content = templateFn.call(@, item)

    if @itemRenderer? and _.isFunction( @itemRenderer )
      content = @itemRenderer.call(@, item, item.model, item.index)

    if @itemProperty
      content = item.model.get(@itemProperty) || item.model[ @itemProperty ]
      content = content() if _.isFunction(content)

    content

  makeItem: (model, index)->
    item = if @prepareItem? then @prepareItem.call(@, model, index) else (model:model, index: index)
    attributes = @attributesForItem(item, model) 
    content = @contentForItem(item)
    # TEMP
    # Figure out why calls to make are failing with an unexpected string error
    try
      make(@itemTagName, attributes, content)
    catch e
      console.log "Error generating DOM element for CollectionView", e.message, item, content, attributes
      #no op

  getModels: (query=@filter, options=@filterOptions)->
    if @collection?.query
      @collection.query(query || {}, options || {})
    else
      @collection.models

  locateItemElement: (id)->
    @$(".#{ @itemClassName }[data-model-id='#{ id }']")

  refreshModel: (model)->
    index = @collection.indexOf( model )
    @locateItemElement(model.get('id')).empty().append( @contentForItem({model,index}, model) )

  refresh: (query,options)->
    @trigger "before:refresh"
    
    @$bodyEl().empty()
    models = @getModels(query, options)

    if models.length is 0
      @trigger("empty:results")

    index = 0
    for model in models
      @$append @makeItem(model, index++)

    @trigger "after:refresh"

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

setupChangeObserver = ()->
  @collection.on "change", (model)=> 
    @refreshModel(model)
