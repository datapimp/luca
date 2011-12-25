Luca.components.FilterableCollection = (config, initial_set=[])->
  base = 
    model: config.model
    url: ()-> config.base_url

  Collection = Backbone.Collection.extend(base)

  new Collection(config, initial_set)

Luca.components.GridView = Luca.View.extend
  initialize: (@options={})->
    _.extend @, @options

    Luca.View.prototype.initialize.apply @, arguments

    @configure_store()

  configure_store: ()->
    @deferrable = @collection = Luca.components.FilterableCollection( @store, @store.initial_set )
  
  beforeRender: _.once ()->
    $(@el).html Luca.templates["components/grid_view"]()

    @table  = $('table.luca-ui-grid-view', @el)
    @header = $("thead", @table) 
    @body   = $("tbody", @table) 
    @footer = $("tfoot", @table) 

    @render_header()

  render: ()-> 
    @collection.each (model,index)=> 
      @render_row.apply(@, [model,index])

  refresh: ()-> 
    @render()
  
  render_header: ()->
    headers = _(@columns).map (column,column_index) => 
      "<th class='column-#{ column_index }'>#{ column.header}</th>"
    
    @header.append("<tr>#{ headers }</tr>")

  render_row: (row,row_index)->
    cells = _( @columns ).map (column,col_index) => 
      value = @cell_renderer(row, column, col_index)
      "<td class='column-#{ col_index }'>#{ value }</td>"

    @body.append("<tr data-row-index='#{ row_index }' class='grid-view-row' id='row-#{ row_index }'>#{ cells }</tr>")
  
  cell_renderer: (row, column, columnIndex )->
    if _.isFunction column.renderer
      col.renderer.apply @, [row,column,columnIndex]
    else
      return row.get?( column.data ) || row[ column.data ]

Luca.register "grid_view","Luca.components.GridView"
