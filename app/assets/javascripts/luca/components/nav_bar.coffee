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
    @$el.addClass "navbar-inverse" if @inverse is true

    if @brand?
      @$('.brand').attr('href', @homeLink || '#')
      @$('.brand').html(@brand)

    if @template
      @content().append Luca.template(@template, @)

    if !!(@fluid || Luca.getApplication()?.fluid)
      @content().addClass( Luca.config.fluidWrapperClass )
    else
      @content().addClass( Luca.config.wrapperClass )

  render: ()->
    @

  content: ()->
    @$('.luca-ui-navbar-body').eq(0)
