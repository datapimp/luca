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

  emptyResults: ()->
    @$('tbody').append("<tr><td colspan=#{ @columns.length }>#{ @emptyText }</td></tr>")

  initialize: (@options={})->
    Luca.components.CollectionView::initialize.apply(@, arguments)
    @defer ()=> 
      Luca.components.TableView.renderHeader.call(@, @columns, @$('thead') )
      # TEMP
      # This is a result of the @additionalClassNames inheritance bug
      @$el.removeClass('row-fluid')
    .until("before:render")


make = Backbone.View::make

Luca.components.TableView.renderHeader = (columns, targetElement)->
  index = 0

  content = for column in columns
    "<th data-col-index='#{ index }'>#{ column.header }</th>"

  $( targetElement ).append(make "tr",{}, content)

  index = 0

  for column in columns when column.width?
    @$("th[data-col-index='#{ index }']",targetElement).css('width', column.width)


Luca.components.TableView.rowRenderer = (item, model, index)->
  for columnConfig in @columns
    Luca.components.TableView.renderColumn.call(@, columnConfig, item, model, index) 

Luca.components.TableView.renderColumn = (column, item, model, index)->
  cellValue = model.read( column.reader )

  if _.isFunction( column.renderer )
    cellValue = column.renderer.call @, cellValue, model, column 

  make("td", {}, cellValue)
