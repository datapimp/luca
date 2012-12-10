Luca.concerns.Filterable = 
  classMethods:
    prepare: ()->
      filter = _.clone( @getQuery() )
      options = _.clone( @getQueryOptions() )

      prepared = @prepareRemoteFilter(filter, options)

      @debug "Preparing filterable call", prepared, @isRemote()

      if @isRemote()  
        @collection.applyFilter(prepared, remote: true)
      else
        @trigger "data:refresh" 
  
  __included: (component, module)->
    _.extend(Luca.Collection::, __filters:{})

  __initializer: (component, module)->
    if @filterable is false
      return

    @filterable = {} if @filterable is true

    # TEMP HACK
    unless Luca.isBackboneCollection(@collection)
      @collection = Luca.CollectionManager.get?()?.getOrCreate(@collection)
       
    unless Luca.isBackboneCollection(@collection)
      @debug "Skipping Filterable due to no collection being present on #{ @name || @cid }"
      @debug "Collection", @collection
      return

    @getCollection ||= ()-> @collection

    filter = @getFilterState()

    @querySources ||= []
    @optionsSources ||= []
    @query ||= {}
    @queryOptions ||= {}

    @querySources.push ((options={})=> @getFilterState().toQuery())
    @optionsSources.push ((options={})=> @getFilterState().toOptions())

    filter.on "change", ()=> @trigger "filter:change"

    @on "filter:change", Luca.concerns.Filterable.classMethods.prepare, @

    module

  prepareRemoteFilter: (filter={}, options={})->
    filter[ Luca.config.apiLimitParameter ] = options.limit if options.limit?
    filter[ Luca.config.apiPageParameter ] = options.page if options.page?
    filter[ Luca.config.apiSortByParameter ] = options.sortBy if options.sortBy?
    
    filter

  isRemote: ()->
    return true if @getQueryOptions().remote is true
    return true if @remoteFilterFallback is true and @getCollection()?.length is 0

  getFilterState: ()->
    {options,query} = config = @filterable || {}

    if !_.isEmpty(config) and (_.isEmpty(query) and _.isEmpty(options))
      _.extend(options, _( config ).pluck('sortBy','page','limit') )

    @collection.__filters[ @cid ] ||= new FilterModel
      query: query || {}
      options: options || {}

  setSortBy: (sortBy, options={})->
    @getFilterState().setOption('sortBy', sortBy, options)

  applyFilter: (query={}, options={})->
    options = _.defaults(options, @getQueryOptions())
    query = _.defaults(query, @getQuery())
    @getFilterState().clear(silent:false)
    @getFilterState().set({query,options}, options)

class FilterModel extends Backbone.Model
  defaults:
    options: {}
    query: {}
    
  setOption: (option, value, options)->
    payload = {}
    payload[option] = value
    @set 'options', _.extend(@toOptions(), payload), options

  setQueryOption: (option, value, options)->
    payload = {}
    payload[option] = value
    @set 'query', _.extend(@toQuery(), payload), options

  toOptions: ()->
    _.clone(@toJSON().options)

  toQuery: ()->
    _.clone(@toJSON().query)

  toRemote: ()->
    Luca.concerns.Filterable.prepareRemoteFilter.call(@, @toQuery(), @toOptions())
