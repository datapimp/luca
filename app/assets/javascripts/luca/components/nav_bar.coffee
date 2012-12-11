navBar = Luca.register "Luca.components.NavBar"

navBar.extends         "Luca.View"

navBar.defines
  fixed: true
  position: 'top'
  className: 'navbar'
  brand: "Luca.js"
  bodyTemplate: 'nav_bar'
  bodyClassName: 'luca-ui-navbar-body'

  beforeRender: ()->
    @$el.addClass "navbar-fixed-#{ @position }" if @fixed

    if @brand?
      @content().append("<a class='brand' href='#'>#{ @brand }</a>")

    if @template
      @content().append Luca.template(@template, @)

  render: ()->
    @

  content: ()->
    @$('.container').eq(0)
