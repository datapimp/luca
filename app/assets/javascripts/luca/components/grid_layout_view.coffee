gridView = Luca.register    "Luca.components.GridLayoutView"
gridView.extends            "Luca.CollectionView"

gridView.publicConfiguration
  # how many items do you wish to render per row?
  # assuming a 12 column grid, each item will receive
  # an equal amount of grid span/columns.
  itemsPerRow: 3

gridView.privateConfiguration
  className: "grid-layout-view"
  tagName: "div"
  itemTagName: "div"

gridView.privateMethods
  # adds the bootstrap span class to each collection-item,
  # where span class is equal to the 12 column grid / @itemsPerRow.
  # for example, each item would receive a span4 class when @itemsPerRow = 3
  attributesForItem: ()->
    base = Luca.CollectionView::attributesForItem.apply(@, arguments)
    @itemsPerRow = 3 unless _.isNumber(@itemsPerRow) and @itemsPerRow > 1
    columns = parseInt(12 / @itemsPerRow)
    base.class += " span#{ columns }"

    base

  # wraps every N number of rows, where N = @itemsPerRow
  # in a row-fluid wrapper, and appends it to the view
  renderModels: (models)->
    index = 0
    rowIndex = 0

    rows = for model in models
      row = @make("div", class:"row-fluid") if rowIndex++ is 0
      $(row).append @makeItem(model,index++)
      rowIndex = 0 if index > 0 and index % @itemsPerRow is 0
      row

    console.log "Appending rows", rows
    for row in rows
      @$append(row) 

gridView.register()
