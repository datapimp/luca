gridView = Luca.register    "Luca.components.GridLayoutView"
gridView.extends            "Luca.CollectionView"

gridView.publicConfiguration
  # how many items do you wish to render per row?
  # assuming a 12 column grid, each item will receive
  # an equal amount of columns.
  itemsPerRow: 3

gridView.privateConfiguration
  className: "grid-layout-view"
  tagName: "div"
  itemTagName: "div"

gridView.privateMethods
  attributesForItem: ()->
    base = Luca.CollectionView::attributesForItem.apply(@, arguments)
    @itemsPerRow = 3 unless _.isNumber(@itemsPerRow) and @itemsPerRow > 1
    columns = parseInt(12 / @itemsPerRow)
    base.class += " span#{ columns }"

    base

  renderModels: (models)->
    index = 0
    rowIndex = 0

    rows = for model in models
      row = @make("div", class:"row-fluid") if rowIndex++ is 0
      $(row).append @makeItem(model,index++)
      rowIndex = 0 if index > 0 and index % @itemsPerRow is 0
      row

    @$append(row) for row in rows

gridView.register()
