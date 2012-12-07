tableView = Luca.register     "Luca.components.TableView"
tableView.extends             "Luca.components.CollectionView"

tableView.publicConfiguration
  widths: []
  columns:[]
  emptyText: "There are no results to display"

tableView.privateConfiguration
  additionalClassNames: "table"
  tagName: "table"
  bodyTemplate: "table_view"
  bodyTagName: "tbody"
  bodyClassName: "table-body"
  stateful: true
  itemTagName: "tr"
  observeChanges: true

tableView.privateMethods
  eachColumn: (fn, scope=@)->
    index = 0
    for col in @columns  
      fn.call(scope, col, index++, @)

  itemRenderer: (item, model)->
    Luca.components.TableView.rowRenderer.call(@, item, model)

  initialize: (@options={})->
    Luca.components.CollectionView::initialize.apply(@, arguments)

    index = 0
    @columns = for column in @columns
      if width = @widths[ index ]
        column.width = width

      if _.isString(column)
        column = reader: column

      if !column.header?
        column.header = _.str.titleize(_.str.humanize(column.reader))

      index++
      column

    @defer ()=> 
      Luca.components.TableView.renderHeader.call(@, @columns, @$('thead') )
    .until("after:render")

tableView.classMethods
  renderHeader : (columns, targetElement)->
    index = 0

    @$( targetElement ).append("<tr></tr>")

    for column in columns
      attrs = "data-col-index": index++

      if column.sortable
        attrs.class = "sortable-toggle"
        attrs["data-sortable-sort-by"] = column.sortBy || column.sortable
        attrs["data-sortable-order"] = column.order

      content = column.header 
      content = "<a class='link'>#{ column.header }</a>" if column.sortable

      @$(targetElement).append( Backbone.View::make "th", attrs, content )


    index = 0

    for column in columns when column.width?
      th = @$("th[data-col-index='#{ index++ }']",targetElement)
      th.css('width', column.width)


  rowRenderer: (item, model, index)->
    colIndex = 0
    for columnConfig in @columns
      Luca.components.TableView.renderColumn.call(@, columnConfig, item, model, colIndex++) 

  renderColumn : (column, item, model, index)->
    cellValue = model.read( column.reader )

    if _.isFunction( column.renderer )
      cellValue = column.renderer.call @, cellValue, model, column 

    Backbone.View::make("td", {"data-col-index":index}, cellValue)

tableView.register()