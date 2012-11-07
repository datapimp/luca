Luca.modules.FilterableView = 
  _initializer: ()->
    @filterState = new FilterModel(@filterableOptions) 

    @filterState.on "change", (model)=>
      @trigger("change:filter", model.toQuery(), model.toOptions() )

    @on "change:filter", (query, options)->

  applyFilter: (query={}, options={})->
    silent = _( options ).delete('silent') is true
    @filterState.set({query,options}, silent: silent)


class FilterModel extends Backbone.Model
  toQuery: ()->
    @get("query")

  toOptions: ()->
    @get("options")
