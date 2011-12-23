Luca.components.FilterableCollection = (config, initial_set=[])->
  base = 
    model: config.model
    url: ()-> config.base_url

  Collection = Backbone.Collection.extend(base)

  new Collection(config, initial_set)

Luca.components.GridRow = (@columns=[])->
  defaultRenderer = (model, column, index)-> "Value"

  public = 
    render: (model, index, grid)=>
      _( @columns ).each (column, index)=>
        console.log(@columns)

Luca.components.GridView = Luca.View.extend
  initialize: (@options={})->
    _.extend @, @options

    @configure_store()
    @render_columns()

  configure_store: ()->
    @deferrable = @collection = Luca.components.FilterableCollection( @store, @store.initial_set )

  render: ()-> 
    grid = @
    @collection.each (model,index)->
      @column_renderer.render.apply @column_renderer, [model,index,grid]

  refresh: ()-> 
    @render()

  render_columns: ()->
    @column_renderer = Luca.components.GridRow(@columns) 


Luca.register "grid_view","Luca.components.GridView"

