_.def("Luca.components.NavBar").extends("Luca.View").with
  fixed: true

  position: 'top'

  className: 'navbar'

  initialize: (@options={})->
    Luca.View::initialize.apply(@, arguments)

  brand: "Luca.js"

  bodyTemplate: 'nav_bar'
  bodyClassName: 'luca-ui-navbar-body'

  beforeRender: ()->
    @$el.addClass "navbar-fixed-#{ @position }" if @fixed

    if @brand?
      @content().append("<a class='brand' href='#'>#{ @brand }</a>")

  render: ()->
    @

  content: ()->
    @$('.container').eq(0)
