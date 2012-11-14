Luca.modules.Paginatable = 
  paginatorViewClass: 'Luca.components.PaginationControl'
  paginationSelector: ".toolbar.bottom"

  __included: ()->
    _.extend(Luca.Collection::, __paginators: {})

  __initializer:()->
    return if @paginatable is false or not Luca.isBackboneCollection(@collection)
    
    _.bindAll @, "paginationControl"

    @getCollection ||= ()-> @collection

    pagination = @getPaginationState()
    collection = @getCollection()

    pagination.on "change", (state)=>
      @trigger "collection:change:pagination", state, collection
      @trigger "refresh"

    @on "after:refresh", (models, query, options)=>
      _.defer ()=>
        @updatePagination.call(@, models, query, options)

    if old = @getQueryOptions
      @getQueryOptions = ()->
        _.extend( old(), pagination.toJSON() ) 
    else
      @getQueryOptions = ()-> pagination.toJSON()

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

    @paginationContainer().append( @paginator.render().$el )

    @paginator
