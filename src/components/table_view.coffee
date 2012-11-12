# Public: TableView renders collection data into an HTML table.
_.def("Luca.components.TableView").extends("Luca.components.CollectionView").with
  additionalClassNames: "table"
  tagName: "table"
  bodyTemplate: "table_view"
  bodyTagName: "tbody"
  bodyClassName: "table-body"
  itemTagName: "tr"
  stateful: true
  observeChanges: true

  columns:[]

  emptyText: "There are no results to display"

  itemRenderer: (item, model)->
    Luca.components.TableView.rowRenderer.call(@, item, model)

  initialize: (@options={})->
    Luca.components.CollectionView::initialize.apply(@, arguments)

    @columns = for column in @columns
      if _.isString(column)
        column = reader: column

      if !column.header?
        column.header = _.str.titleize(_.str.humanize(column.reader))

      column

    @defer ()=> 
      Luca.components.TableView.renderHeader.call(@, @columns, @$('thead') )
    .until("after:render")

make = Backbone.View::make

Luca.components.TableView.renderHeader = (columns, targetElement)->
  index = 0

  content = for column in columns
    "<th data-col-index='#{ index++ }'>#{ column.header }</th>"

  @$( targetElement ).append("<tr>#{ content.join('') }</tr>")

  index = 0

  for column in columns when column.width?
    @$("th[data-col-index='#{ index++ }']",targetElement).css('width', column.width)


Luca.components.TableView.rowRenderer = (item, model, index)->
  colIndex = 0
  for columnConfig in @columns
    Luca.components.TableView.renderColumn.call(@, columnConfig, item, model, colIndex++) 

Luca.components.TableView.renderColumn = (column, item, model, index)->
  cellValue = model.read( column.reader )

  if _.isFunction( column.renderer )
    cellValue = column.renderer.call @, cellValue, model, column 

  make("td", {"data-col-index":index}, cellValue)
