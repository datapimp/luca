_.def("Luca.components.NavBar").extends("Luca.View").with
  fixed: true

  position: 'top'

  className: 'navbar'

  initialize: (@options={})->
    Luca.View::initialize.apply(@, arguments)

  brand: "Luca.js"

  beforeRender: ()->
    @$el.addClass "navbar-fixed-#{ @position }" if @fixed

    @$el.append("<div class='navbar-inner'><div class='container'></div></div>")

    if @brand?
      @content().append("<a class='brand' href='#'>#{ @brand }</a>")

  render: ()->
    @

  content: ()->
    @$('.container').eq(0)
