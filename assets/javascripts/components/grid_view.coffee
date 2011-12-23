Luca.components.FilterableCollection = (config, initial_set=[])->
  base = 
    model: config.model
    url: ()-> config.base_url

  Collection = Backbone.Collection.extend(base)

  new Collection(config, initial_set)
  
Luca.components.GridRow = (@columns=[])->
  defaultRenderer = (column)->

  return
    render: (model)=>
      _( @columns ).each (column, index)=>

Luca.components.GridView = Backbone.View.extend
  initialize: (@options={})->
    _.extend @, @options

    @configure_store()
    @render_columns()

  configure_store: ()->
    @collection = Luca.components.FilterableCollection( @store, @store.initial_set )
    @collection.bind "reset", ()=> @refresh_grid()

  render: ()->
    if @collection.models > 0 then @refresh_grid() else @collection.fetch()
  
  refresh_grid: ()->
    @collection.each (model)->
      @column_renderer.render(model)
  
  render_columns: ()->
    @column_renderer = Luca.components.GridRow(@columns) 


Luca.register "grid_view","Luca.components.GridView"

