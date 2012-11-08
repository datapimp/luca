Luca.modules.FilterableView = 
  _initializer: ()->
    @filterableOptions ||= {}

    @filterState = new FilterModel(@filterableOptions) 

    @onFilterChange ||= @refresh
    
    unless @onFilterChange?    
      console.log "Trying to use FilterableView without an onFilterChange method", @, @name

    @filterState.on "change", (model)=>
      @trigger("change:filter", model.toQuery(), model.toOptions() )
      @onFilterChange?.call(@, model.toQuery(), model.toOptions() )

  getModels: ()->
    @collection.query( @filterState.toQuery(), @filterState.toOptions() )
    
  applyFilter: (query={}, options={})->

    if _.isEmpty( options )
      options = _.defaults(options, @filterableOptions.options)

    if _.isEmpty( query )
      query = _.defaults(query, @filterableOptions.query)

    silent = _( options ).delete('silent') is true

    @filterState.set({query,options}, silent: silent)

class FilterModel extends Backbone.Model
  toQuery: ()->
    @get("query")

  toOptions: ()->
    @get("options")
