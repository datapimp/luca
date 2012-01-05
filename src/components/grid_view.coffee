Luca.components.GridView = Luca.View.extend
  events:
    "dblclick .grid-view-row" : "double_click_handler"
    "click .grid-view-row": "click_handler"

  className: 'luca-ui-grid-view'

  scrollable: true
  
  hooks:[
    "before:grid:render",
    "before:render:header",
    "before:render:row",
    "after:grid:render",
    "row:double:click",
    "row:click"
  ]

  initialize: (@options={})->
    _.extend @, @options

    Luca.View.prototype.initialize.apply @, arguments

    _.bindAll @, "rowDoubleClick", "rowClick"

    @configure_store()

  configure_store: ()->
    store = @store
    _.extend @store,
      url: ()->
        store.base_url
        
    @deferrable = @collection = new Luca.components.FilterableCollection( @store.initial_set, @store )
  
  beforeRender: _.once ()->
    @trigger "before:grid:render", @

    $(@el).addClass 'scrollable-grid-view' if @scrollable

    $(@el).html Luca.templates["components/grid_view"]()

    @table  = $('table.luca-ui-grid-view', @el)
    @header = $("thead", @table) 
    @body   = $("tbody", @table) 
    @footer = $("tfoot", @table) 

    @render_header()

    $(@container).append $(@el)
  
  afterRender: ()-> 
    @collection.each (model,index)=> 
      @render_row.apply(@, [model,index])
    
    @trigger "after:grid:render", @

  refresh: ()-> 
    @render()
  
  render_header: ()->
    @trigger "before:render:header"

    headers = _(@columns).map (column,column_index) => 
      "<th class='column-#{ column_index }'>#{ column.header}</th>"
    
    @header.append("<tr>#{ headers }</tr>")

  render_row: (row,row_index)->
    @trigger "before:render:row", row, row_index
    
    cells = _( @columns ).map (column,col_index) => 
      value = @cell_renderer(row, column, col_index)
      "<td class='column-#{ col_index }'>#{ value }</td>"
    
    alt_class = if row_index % 2 is 0 then "even" else "odd"

    @body.append("<tr data-row-index='#{ row_index }' class='grid-view-row #{ alt_class }' id='row-#{ row_index }'>#{ cells }</tr>")

  cell_renderer: (row, column, columnIndex )->
    if _.isFunction column.renderer
      return column.renderer.apply @, [row,column,columnIndex]
    else if column.data.match(/\w+\.\w+/)
      source = row.attributes || row
      return Luca.util.nestedValue( column.data, source )
    else
      return row.get?( column.data ) || row[ column.data ]

  double_click_handler: (e)->
    me = my = $( e.currentTarget )
    rowIndex = my.data('row-index')
    record = @collection.at( rowIndex ) 
    @trigger "row:double:click", @, record, rowIndex

  click_handler: (e)->
    me = my = $( e.currentTarget )
    rowIndex = my.data('row-index')
    record = @collection.at( rowIndex ) 
    @trigger "row:click", @, record, rowIndex

    $('.grid-view-row', @body ).removeClass('selected-row')
    me.addClass('selected-row')


Luca.register "grid_view","Luca.components.GridView"
