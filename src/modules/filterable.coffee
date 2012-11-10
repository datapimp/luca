Luca.modules.Filterable = 
  _initializer: (component, module)->
    return if @filterable is false
    
    @filterState = @getFilterModel() 

    if oldQuery = @getQuery 
      @getQuery = ()=> 
        _.extend(oldQuery.call(@), @filterState.toQuery())

    if oldOptions = @getQueryOptions 
      @getQueryOptions = ()=> 
        _.extend(oldOptions.call(@), @filterState.toOptions())

    if sortBy = @filterable?.options?.sortBy 
      @setSortBy(sortBy)

  setSortBy: (sortBy, options={})->
    @filterState.setOption('sortBy', sortBy, options)

  getFilterModel: ()->
    return @filterState if @filterState?

    @filterState = new FilterModel(@filterable ||= {})     

    @filterState.on "change", ()->
      @trigger "collection:change"
    , @

    @filterState

  applyFilter: (query={}, options={})->
    if _.isEmpty( options )
      options = _.defaults(options, @getQueryOptions())

    if _.isEmpty( query )
      query = _.defaults(query, @getQuery())

    silent = _( options ).delete('silent') is true

    @filterState.set({query,options}, silent: silent)

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
    @get("options")

  toQuery: ()->
    @get("query")
