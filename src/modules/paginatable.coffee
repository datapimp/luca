Luca.modules.Paginatable = 
  paginatorViewClass: 'Luca.components.PaginationControl'
  paginationSelector: ".toolbar.bottom"

  __included: ()->
    _.extend(Luca.Collection::, __paginators: {})

  __initializer:()->
    return if @paginatable is false or not Luca.isBackboneCollection(@collection)
    
    _.bindAll @, "paginationControl"

    @getCollection ||= ()-> @collection

    collection = @getCollection()

    paginationState = @getPaginationState()

    paginationState.on "change", (state)=>
      @trigger "collection:change:pagination", state, collection
      @trigger "refresh"

    @on "after:refresh", (models, query, options)=>
      _.defer ()=>
        @updatePagination.call(@, models, query, options)

    @on "after:render", ()=> 
      @paginationControl().refresh()
          
    if old = @getQueryOptions
      @getQueryOptions = ()->
        _.extend( old(), paginationState.toJSON() ) 
    else
      @getQueryOptions = ()-> paginationState.toJSON()

  getPaginationState: ()->
    @collection.__paginators[ @cid ] ||= @paginationControl().state

  paginationContainer: ()->
    @$(">#{ @paginationSelector }")

  setCurrentPage: (page=1, options={})->
    @getPaginationState().set('page', page, options)

  setLimit: (limit=0,options={})->
    @getPaginationState().set('limit', limit, options)

  updatePagination: (models=[], query={}, options={})->
    _.defaults(options, @getQueryOptions(), limit: 0 )

    paginator = @paginationControl()

    itemCount = models?.length || 0
    totalCount = @getCollection()?.length

    if itemCount is 0 or totalCount <= options.limit 
      paginator.$el.hide()
    else
      paginator.$el.show()

    paginator.state.set(page: options.page, limit: options.limit)

  paginationControl: ()->
    return @paginator if @paginator?

    _.defaults(@paginatable ||= {}, page: 1, limit: 20)

    @paginator = Luca.util.lazyComponent
      type: "pagination_control" 
      collection: @getCollection()
      defaultState: @paginatable 

    @paginator

  renderPaginationControl: ()->
    @paginationControl()
    @paginationContainer().append @paginationControl().render().$el


