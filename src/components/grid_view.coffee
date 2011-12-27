Luca.components.GridView = Luca.View.extend
  className: 'luca-ui-grid-view'

  scrollable: true

  initialize: (@options={})->
    _.extend @, @options

    Luca.View.prototype.initialize.apply @, arguments

    @configure_store()

  configure_store: ()->
    store = @store
    _.extend @store,
      url: ()->
        store.base_url
        
    @deferrable = @collection = new Luca.components.FilterableCollection( @store.initial_set, @store )
  
  beforeRender: _.once ()->
    $(@el).addClass 'scrollable-grid-view' if @scrollable

    $(@el).html Luca.templates["components/grid_view"]()

    @table  = $('table.luca-ui-grid-view', @el)
    @header = $("thead", @table) 
    @body   = $("tbody", @table) 
    @footer = $("tfoot", @table) 

    @render_header()

    $(@container).append $(@el)
  
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
