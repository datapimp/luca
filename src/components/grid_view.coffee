Luca.components.GridView = Luca.View.extend
  autoBindEventHandlers: true

  events:
    "dblclick table tbody tr" : "double_click_handler"
    "click table tbody tr": "click_handler"

  className: 'luca-ui-g-view'

  rowClass: "luca-ui-g-row"

  wrapperClass: "luca-ui-g-view-wrapper"

  # add whatever additional container classes you want
  # to be applied to the wrapper here
  additionalWrapperClasses: []

  # add additional style declarations to the wrapper if you like
  # these will be added by jquery.css and accept the same syntax
  wrapperStyles: {}

  scrollable: true

  emptyText: 'No Results To display.'

  # available options are striped, condensed, bordered
  # or any combination of these, split up by space
  tableStyle: 'striped'

  # we have to specify height to make the scrollable table portion work
  defaultHeight: 285

  # unless we specify the width ourselves
  # the width of the grid will automatically be set to the width of the container
  # and if it can't be determined, then it will be set to the default
  defaultWidth: 756

  # the grid should never outgrow its container
  maxWidth: undefined

  # hooks is configuration sugar
  # the before:grid:render trigger
  # will automatically fire the
  # beforeGridRender function
  hooks:[
    "before:grid:render"
    "before:render:header"
    "before:render:row"
    "after:grid:render"
    "row:double:click"
    "row:click"
    "after:collection:load"
  ]

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable

    Luca.View::initialize.apply( @, arguments )

    @configure_collection()

    @collection.bind "reset", (collection) =>
      @refresh()
      @trigger "after:collection:load", collection

    # if a model changes, then we will update the row's contents
    # by rerendering that row's cells
    @collection.bind "change", (model)=>
      rowEl = @getRowEl( model.id || model.get('id') || model.cid )
      cells = @render_row(model, @indexOf(model), cellsOnly: true )
      $( rowEl ).html( cells )

  beforeRender: ()->
    @trigger "before:grid:render", @

    @$el.html Luca.templates["components/grid_view"]()

    @table      = @$ 'table.luca-ui-g-view'
    @header     = @$ "thead"
    @body       = @$ "tbody"
    @footer     = @$ "tfoot"
    @wrapper    = @$ ".#{ @wrapperClass }"

    @applyCssClasses()

    @setDimensions() if @scrollable

    @renderHeader()

    @emptyMessage()

    @renderToolbars()

    $(@container).append @$el

  applyCssClasses: ()->
    @$el.addClass 'scrollable-g-view' if @scrollable

    _( @additionalWrapperClasses ).each (containerClass)=>
      @wrapper?.addClass( containerClass )

    if Luca.enableBootstrap
      @table.addClass('table')

    _( @tableStyle?.split(" ") ).each (style)=>
      @table.addClass("table-#{ style }")

  toolbarContainers:(position="bottom")->
    $(".toolbar-container.#{ position }", @el)

  renderToolbars: ()->
    _( @toolbars ).each (toolbar)=>
      toolbar = Luca.util.lazyComponent(toolbar)
      toolbar.container = @toolbarContainers( toolbar.position )
      toolbar.render()

  setDimensions: (offset)->
    @height ||= @defaultHeight

    @$('.luca-ui-g-view-body').height( @height )
    @$('tbody.scrollable').height( @height - 23 )

    @container_width = do => $(@container).width()

    @width ||= if @container_width > 0 then @container_width else @defaultWidth

    # don't let the grid outgrow its maxWidth
    @width = _([@width, (@maxWidth || @width)]).max()

    @$('.luca-ui-g-view-body').width @width
    @$('.luca-ui-g-view-body table').width @width

    @setDefaultColumnWidths()

  resize: (newWidth)->
    difference = newWidth - @width
    @width = newWidth

    @$('.luca-ui-g-view-body').width( @width )
    @$('.luca-ui-g-view-body table').width( @width )

    if @columns.length > 0
      distribution = difference / @columns.length

      _(@columns).each (col,index)=>
        column = $(".column-#{ index }", @el )
        column.width( col.width = col.width + distribution )

  padLastColumn: ()->
    configured_column_widths = _(@columns).inject (sum, column)->
      sum = (column.width) + sum
    , 0

    unused_width = @width - configured_column_widths

    if unused_width > 0
      @lastColumn().width += unused_width

  setDefaultColumnWidths: ()->
    default_column_width = if @columns.length > 0 then @width / @columns.length else 200

    _( @columns ).each (column)->
      parseInt(column.width ||= default_column_width)

    @padLastColumn()

  lastColumn: ()->
    @columns[ @columns.length - 1 ]

  afterRender: ()->
    @refresh()
    @trigger "after:grid:render", @

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

  ifLoaded: (fn, scope)->
    scope ||= @
    fn ||= ()-> true

    @collection.ifLoaded(fn,scope)

  applyFilter: (values, options={auto:true,refresh:true})->
    @collection.applyFilter(values, options)

  renderHeader: ()->
    @trigger "before:render:header"

    headers = _(@columns).map (column,column_index) =>
      # temporary hack for scrollable grid dimensions.
      style = if column.width then "width:#{ column.width }px;" else ""

      "<th style='#{ style }' class='column-#{ column_index }'>#{ column.header}</th>"

    @header.append("<tr>#{ headers }</tr>")

  getRowEl: (id)->
    @$ "[data-record-id=#{ id }]", 'table'

  render_row: (row,row_index, options={})->
    rowClass = @rowClass

    model_id = if row?.get and row?.attributes then row.get('id') else ''

    @trigger "before:render:row", row, row_index

    cells = _( @columns ).map (column,col_index) =>
      value = @cell_renderer(row, column, col_index)
      style = if column.width then "width:#{ column.width }px;" else ""

      display = if _.isUndefined(value) then "" else value

      "<td style='#{ style }' class='column-#{ col_index }'>#{ display }</td>"

    return cells if options.cellsOnly

    altClass = ''
    if @alternateRowClasses
      altClass = if row_index % 2 is 0 then "even" else "odd"

    content = "<tr data-record-id='#{ model_id }' data-row-index='#{ row_index }' class='#{ rowClass } #{ altClass }' id='row-#{ row_index }'>#{ cells }</tr>"

    return content if options.contentOnly is true

    @body?.append(content)

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

    $(".#{ @rowClass }", @body ).removeClass('selected-row')
    me.addClass('selected-row')

Luca.register "grid_view","Luca.components.GridView"
