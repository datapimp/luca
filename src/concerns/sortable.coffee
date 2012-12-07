Luca.concerns.Sortable = 
  __included: (component, module)->
    _.extend(Luca.Collection::, __sortables:{})

  __initializer:()->
    if @sortable is false
      return

    if _.isString(@sortable)
      @sortable = sortBy: @sortable

    unless Luca.isBackboneCollection(@collection)
      @debug "Skipping Sortable due to no collection being present on #{ @name || @cid }"
      @debug "collection", @collection
      return

    collection = (@getCollection ||= ()-> @collection)()

    sortableState = @getSortableState()

    @optionsSources ||= []
    @queryOptions ||= {}

    @optionsSources.push -> 
      _(sortableState.toJSON()).pick('sortBy','order')

    sortableState.on "change", ()=> @trigger "sortable:change"

    @on "sortable:change", Luca.concerns.Filterable.classMethods.prepare, @

  isRemote: ()->
    @getQueryOptions().remote is true    

  getSortableState: ()->
    options = _( @sortable || {} ).pick 'sortBy', 'order'
    @collection.__sortables[ @cid ] ||= new SortableState(options)

  sortBy: (field,order)->
    @setSortBy(field) if field?
    @setOrder(order) if order?
    @

  setSortBy: (field, options={})->
    @getSortableState().set('sortBy', field, options)
    @

  setOrder: (order, options={})->
    @getSortableState().set('order', order, options)
    @

SortableState = Backbone.Model.extend()
