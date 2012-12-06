Luca.concerns.GridLayout = 
  _initializer: ()->
    if @gridSpan
      @$el.addClass "span#{ @gridSpan }"

    if @gridOffset
      @$el.addClass "offset#{ @gridOffset }"

    if @gridRowFluid
      @$el.addClass "row-fluid"

    if @gridRow
      @$el.addClass "row"

    # implement  