Luca.modules.Paginatable = 
  paginatorViewClass: 'Luca.components.PaginationControl'
  paginationSelector: ".toolbar.bottom"

  __included: ()->
    _.extend(Luca.Collection::, __paginators: {})

  __initializer:()->
    return if @paginatable is false or not Luca.isBackboneCollection(@collection)
    
    _.bindAll @, "paginationControl"

    pagination = @getPaginationState()
    collection = @getCollection()

    pagination.on "change", (state)=>
      @trigger "collection:change", state, collection
      @trigger "collection:change:pagination", state, collection

    if @getQueryOptions?
      @getQueryOptions = _.compose @getQueryOptions, (options={})-> 
        obj = _.clone( options )
        _.extend obj, pagination.toJSON()

  getPaginationState: ()->
    @collection.__paginators[ @cid ] ||= new Backbone.Model(@paginatable)

  paginationContainer: ()->
    @$(">#{ @paginationSelector }")

  setCurrentPage: (page=1, options={})->
    @paginationControl().state.set('page', page, options)

  setLimit: (limit=0,options={})->
    @paginationControl().state.set('limit', limit, options)

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
      state: @getPaginationState()

    @paginationContainer().append( @paginator.render().$el )

    @paginator
