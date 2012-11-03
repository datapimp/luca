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
    else
      throw "Collection Views must have a valid backbone collection"

    if @collection.length > 0
      @refresh()

  attributesForItem: (item)->
    _.extend {}, class: @itemClassName, "data-index": item.index

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
    make(@itemTagName, @attributesForItem(item), @contentForItem(item))

  getModels: ()->
    if @collection?.query and (@filter || @filterOptions)
      @collection.query(@filter, @filterOptions)
    else
      @collection.models

  refresh: ()->
    @$bodyEl().empty()

    if @getModels().length is 0
      @trigger("empty:results")

    _( @getModels() ).each (model, index)=>
      @$append( @makeItem(model, index) )

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
