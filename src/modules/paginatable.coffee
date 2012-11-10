Luca.modules.Paginatable = 
  paginatorViewClass: 'Luca.components.PaginationControl'

  _initializer:()->
    return if @paginatable is false
    
    _.bindAll @, "paginationControl"

    @getCollection ||= ()-> @collection

    if old = @getQueryOptions 
      @getQueryOptions = ()=>
        p = @paginationControl()
        filtered = _.extend(old.call(@), limit: p.limit(), page: p.page())
        filtered

    if @paginationContainer().length is 0
      @$bodyEl().after @make("div",class:"toolbar bottom")

  paginationContainer: ()->
    @$('.toolbar.bottom')

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

    @paginator = new Luca.util.resolve(@paginatorViewClass)
      collection: @getCollection() 
      parent: @

    @paginator.setPage( @paginatable.page )
    @paginator.setLimit( @paginatable.limit )

    @paginator.state.on "change", ()-> 
      @trigger "collection:change"
    , @

    # FIXME
    #
    # This couples the pagination system too closely to the collectionview
    # should write a more abstract interface for this
    @on("after:refresh", @updatePagination, @)

    @paginationContainer().append( @paginator.render().$el )

    @paginator
