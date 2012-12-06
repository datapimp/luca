Luca.concerns.Paginatable = 
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

    _.bindAll @, "paginationControl", "pager"

    @getCollection ||= ()-> 
      @collection

    collection = @getCollection()

    paginationState = @getPaginationState()

    @optionsSources ||= []
    @queryOptions ||= {}

    @optionsSources.push ()=> 
      options = _( paginationState.toJSON() ).pick('limit','page','sortBy')
      _.extend(options, pager: @pager)

    paginationState.on "change:page", (state)=> 
      filter = _.clone( @getQuery() )
      options = _.clone( @getQueryOptions() )

      prepared = @prepareRemoteFilter(filter, options)

      if @isRemote()  
        @collection.applyFilter(prepared, remote: true)
      else
        @trigger "refresh" 

    @on "before:render", @renderPaginationControl, @

  pager: (numberOfPages, models)->
    @getPaginationState().set(numberOfPages: numberOfPages, itemCount: models.length)
    @paginationControl().updateWithPageCount( numberOfPages, models )

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

  paginationControl: ()->
    return @paginator if @paginator?

    _.defaults(@paginatable ||= {}, page: 1, limit: 20)

    @paginator = Luca.util.lazyComponent
      type: "pagination_control" 
      collection: @getCollection()
      defaultState: @paginatable 
      parent: (@name || @cid)
      debugMode: @debugMode

    @paginator

  renderPaginationControl: ()->
    control = @paginationControl()
    @paginationContainer().append( control.render().$el )
    control


