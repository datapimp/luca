Luca.modules.FilterableView = 
  _initializer: ()->
    @filterState = new FilterModel(@filterableOptions) 

    @onFilterChange ||= @refresh
    
    @filterState.on "change", (model)=>
      @trigger("change:filter", model.toQuery(), model.toOptions() )
      @onFilterChange?.call(@, model.toQuery(), model.toOptions() )

  getModels: ()->
    @collection.query( @filterState.toQuery(), @filterState.toOptions() )
    
  applyFilter: (query={}, options={})->
    silent = _( options ).delete('silent') is true
    @filterState.set({query,options}, silent: silent)

class FilterModel extends Backbone.Model
  toQuery: ()->
    @get("query")

  toOptions: ()->
    @get("options")
