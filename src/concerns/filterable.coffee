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

    @querySources.push (()=> filter.toQuery())
    @optionsSources.push (()=> filter.toOptions())

    if @debugMode is true
      console.log "Filterable"
      console.log @querySources
      console.log @optionsSources 

    filter.on "change", ()=> 
      if @isRemote()  
        merged = _.extend(@getQuery(), @getQueryOptions())
        @collection.applyFilter(merged, @getQueryOptions())
      else
        @trigger "refresh" 

    module

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
