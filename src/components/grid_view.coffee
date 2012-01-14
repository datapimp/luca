Luca.components.GridView = Luca.View.extend
  events:
    "dblclick .grid-view-row" : "double_click_handler"
    "click .grid-view-row": "click_handler"

  className: 'luca-ui-grid-view'

  scrollable: true
  
  emptyText: 'No Results To display'

  hooks:[
    "before:grid:render",
    "before:render:header",
    "before:render:row",
    "after:grid:render",
    "row:double:click",
    "row:click",
    "after:collection:load"
  ]

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable

    Luca.View.prototype.initialize.apply( @, arguments )

    _.bindAll @, "rowDoubleClick", "rowClick"
    
    @configure_collection()

    @collection.bind "reset", (collection) =>
      console.log "Collection Reset", @
      @refresh()
      @trigger "after:collection:load", collection

  ifLoaded: (fn, scope)->
    scope ||= @
    fn ||= ()-> true

    @collection.ifLoaded(fn,scope)

  applyFilter: (values, options={auto:true,refresh:true})->
    console.log "Gridview Applying Filter", values
    @collection.applyFilter(values, options)
   
  beforeRender: ()->
    @trigger "before:grid:render", @

    $(@el).addClass 'scrollable-grid-view' if @scrollable

    $(@el).html Luca.templates["components/grid_view"]()

    @table  = $('table.luca-ui-grid-view', @el)
    @header = $("thead", @table) 
    @body   = $("tbody", @table) 
    @footer = $("tfoot", @table) 

    @setDimensions() if @scrollable

    @render_header()

    @emptyMessage()

    @prepare_toolbars() if @toolbars?.length > 0
    $(@container).append $(@el)
    @render_toolbars() if @toolbars?.length > 0
 
  setDimensions: ()->
    @height ||= 285

    $('.grid-view-body', @el).height( @height )
    $('tbody.scrollable', @el).height( @height - 23 )
    
    @container_width = do => $(@container).width()
    @width ||= if @container_width > 0 then @container_width else 756
    
    $('.grid-view-body', @el).width( @width )
    $('.grid-view-body table', @el).width( @width )
    
    @set_default_column_widths()

  resize: (newWidth)->
    difference = newWidth - @width
    @width = newWidth
    
    $('.grid-view-body', @el).width( @width )
    $('.grid-view-body table', @el).width( @width )

    if @columns.length > 0
      distribution = difference / @columns.length 

      _(@columns).each (col,index)=>
        column = $(".column-#{ index }", @el )
        column.width( col.width = col.width + distribution )

  pad_last_column: ()->
    configured_column_widths = _(@columns).inject (sum, column)->
      sum = (column.width) + sum
    , 0

    unused_width = @width - configured_column_widths

    if unused_width > 0
      @last_column().width += unused_width 
  
  set_default_column_widths: ()->
    default_column_width = if @columns.length > 0 then @width / @columns.length else 200
    _( @columns ).each (column)-> column.width ||= default_column_width
    @pad_last_column()

  last_column: ()->
    @columns[ @columns.length - 1 ]

  afterRender: ()-> 
    @refresh()   
    @trigger "after:grid:render", @

  prepare_toolbars: ()->
    @toolbars = _( @toolbars ).map (toolbar)=>
      toolbar = Luca.util.LazyObject( toolbar )
      $(@el)[ toolbar.position_action() ] Luca.templates["containers/toolbar_wrapper"](id:@name+'-toolbar-wrapper')
      toolbar.container = toolbar.renderTo = $("##{@name}-toolbar-wrapper")
      toolbar

  render_toolbars: ()->
    _(@toolbars).each (toolbar)=>
      toolbar.render()

  emptyMessage: (text="")->
    text ||= @emptyText
    @body.html('')
    @body.append Luca.templates["components/grid_view_empty_text"](colspan:@columns.length,text:text)

  refresh: ()-> 
    @body.html('')
    @collection.each (model,index)=> 
      @render_row.apply(@, [model,index])

    if @collection.models.length == 0
      @emptyMessage()
  
  render_header: ()->
    @trigger "before:render:header"

    headers = _(@columns).map (column,column_index) => 
      # temporary hack for scrollable grid dimensions.
      style = if column.width then "width:#{ column.width }px;" else ""

      "<th style='#{ style }' class='column-#{ column_index }'>#{ column.header}</th>"
    
    @header.append("<tr>#{ headers }</tr>")

  render_row: (row,row_index)->
    @trigger "before:render:row", row, row_index
    
    cells = _( @columns ).map (column,col_index) => 
      value = @cell_renderer(row, column, col_index)
      style = if column.width then "width:#{ column.width }px;" else ""
      
      display = if _.isUndefined(value) then "" else value

      "<td style='#{ style }' class='column-#{ col_index }'>#{ display }</td>"
    
    alt_class = if row_index % 2 is 0 then "even" else "odd"

    @body?.append("<tr data-row-index='#{ row_index }' class='grid-view-row #{ alt_class }' id='row-#{ row_index }'>#{ cells }</tr>")

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
