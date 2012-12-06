Luca.concerns.Filterable = 

  __included: (component, module)->
    _.extend(Luca.Collection::, __filters:{})

  __initializer: (component, module)->
    if @filterable is false
      return

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

    filter.on "change", ()=> 
      filter = _.clone( @getQuery() )
      options = _.clone( @getQueryOptions() )

      prepared = @prepareRemoteFilter(filter, options)

      if @isRemote()  
        @collection.applyFilter(prepared, remote: true)
      else
        @trigger "refresh" 

    module

  prepareRemoteFilter: (filter={}, options={})->
    filter.limit = options.limit if options.limit?
    filter.page = options.page if options.page?
    filter.sortBy = options.sortBy if options.sortBy?
    
    filter

  isRemote: ()->
    @getQueryOptions().remote is true    

  getFilterState: ()->
    @collection.__filters[ @cid ] ||= new FilterModel(@filterable)

  setSortBy: (sortBy, options={})->
   @getFilterState().setOption('sortBy', sortBy, options)

  applyFilter: (query={}, options={})->
    options = _.defaults(options, @getQueryOptions())
    query = _.defaults(query, @getQuery())

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
    @toJSON().options

  toQuery: ()->
    @toJSON().query

  toRemote: ()->
    options = @toOptions() 
    _.extend( @toQuery(), limit: options.limit, page: options.page, sortBy: options.sortBy )
