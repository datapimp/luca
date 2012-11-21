Luca.modules.Paginatable = 
  paginatorViewClass: 'Luca.components.PaginationControl'
  paginationSelector: ".toolbar.bottom"

  __included: ()->
    _.extend(Luca.Collection::, __paginators: {})

  __initializer:()->
    if @paginatable is false
      return

    # TEMP HACK
    unless Luca.isBackboneCollection(@collection)
      @collection = Luca.CollectionManager.get?()?.getOrCreate(@collection)

    unless Luca.isBackboneCollection(@collection)
      @debug "Skipping Paginatable due to no collection being present on #{ @name || @cid }"
      @debug "collection", @collection
      return

    _.bindAll @, "paginationControl"

    @getCollection ||= ()-> 
      @collection

    collection = @getCollection()

    paginationState = @getPaginationState()

    @optionsSources ||= []
    @queryOptions ||= {}

    @optionsSources.push ()=> paginationState.toJSON()

    paginationState.on "change", (state)=> 
      @trigger "collection:change:pagination", state, @getCollection()

    @on "collection:change:pagination", ()=>
      if @isRemote() 
        filter = _.extend(@toQuery(), @toQueryOptions()) 
        @collection.applyFilter(filter, remote: true)
      else
        @trigger "refresh" 

    @on "after:render", @renderPaginationControl, @

    @on "after:refresh", (models, query, options)=>
      @debug "after:refresh on paginatable"
      _.defer ()=> @updatePagination.call(@, models, query, options)


  isRemote: ()->
    @getQueryOptions().remote is true    

  getPaginationState: ()->
    @collection.__paginators[ @cid ] ||= @paginationControl().state

  paginationContainer: ()->
    @$(">#{ @paginationSelector }")

  setCurrentPage: (page=1, options={})->
    @getPaginationState().set('page', page, options)

  setPage: (page=1, options={})->
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

    paginator.state.set({page: options.page, limit: options.limit}, silent: true)
    paginator.refresh()

  paginationControl: ()->
    return @paginator if @paginator?

    _.defaults(@paginatable ||= {}, page: 1, limit: 20)

    @paginator = Luca.util.lazyComponent
      type: "pagination_control" 
      collection: @getCollection()
      defaultState: @paginatable 

    @paginator

  renderPaginationControl: ()->
    control = @paginationControl()
    @paginationContainer().append( control.render().$el )
    control


