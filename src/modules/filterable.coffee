Luca.modules.Filterable = 
  __included: (component, module)->
    _.extend(Luca.Collection::, __filters:{})

  __initializer: (component, module)->
    return if @filterable is false or not Luca.isBackboneCollection(@collection) 

    @getCollection ||= ()-> @collection

    filter = @getFilterState()

    filter.on "change", (state)=>
      @trigger "collection:change:filter", state, @getCollection()
      @trigger "refresh" 

    if @getQuery?
      @getQuery = _.compose @getQuery, (query={})->
        obj = _.clone(query)
        _.extend(obj, filter.toQuery() )
    else
      @getQuery = ()=>
        filter.toQuery()

    if @getQueryOptions?
      @getQueryOptions = _.compose @getQueryOptions, (options={})->
        obj = _.clone(options)
        _.extend(obj, filter.toOptions() )
    else
      @getQueryOptions = ()-> filter.toOptions()

  getFilterState: ()->
    @collection.__filters[ @cid ] ||= new FilterModel(@filterable)

  setSortBy: (sortBy, options={})->
   @getFilterState().setOption('sortBy', sortBy, options)

  applyFilter: (query={}, options={})->
    options = _.defaults(options, @getQueryOptions())
    query = _.defaults(query, @getQuery())

    silent = _( options ).delete('silent') is true

    @getFilterState().set({query,options}, silent: silent)

class FilterModel extends Backbone.Model
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
