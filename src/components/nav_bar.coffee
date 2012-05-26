_.def("Luca.components.NavBar").extends("Luca.View").with
  fixed: true

  position: 'top'

  className: 'navbar'

  initialize: (@options={})->
    Luca.View::initialize.apply(@, arguments)
    if @fixed
      @className += "navbar-fixed-#{ @position }"

  brand: "Luca.js"

  beforeRender: ()->
    @$el.append("<div class='navbar-inner'><div class='container'></div></div>")

    if @brand?
      @container().append("<a class='brand' href='#'>#{ @brand }</a>")

  container: ()->
    @$('.container').eq(0)
