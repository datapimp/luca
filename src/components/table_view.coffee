tableView = Luca.register "Luca.components.TableView"
tableView.extends         "Luca.components.CollectionView"

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

    content = for column in columns
      "<th data-col-index='#{ index++ }'>#{ column.header }</th>"

    @$( targetElement ).append("<tr>#{ content.join('') }</tr>")

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
