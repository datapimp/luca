_.def('Luca.containers.Viewport').extend('Luca.containers.CardView').with

  activeItem: 0

  className: 'luca-ui-viewport'

  fullscreen: true

  fluid: false

  wrapperClass: 'row'

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)

    if Luca.enableBootstrap is true
      @wrapperClass = "row-fluid" if @fluid is true
      @$el.wrap("<div class='#{ @wrapperClass }' />").addClass('span12')

    $('html,body').addClass('luca-ui-fullscreen') if @fullscreen

  beforeRender: ()->
    Luca.containers.CardView::beforeRender?.apply(@, arguments)

    if Luca.enableBootstrap and @topNav and @fullscreen
      $('body').css('padding','40px')

    @renderTopNavigation() if @topNav?
    @renderBottomNavigation() if @bottomNav?

  renderTopNavigation: ()->
    return unless @topNav?

    if _.isString( @topNav )
      @topNav = Luca.util.lazyComponent(@topNav)

    if _.isObject( @topNav )
      @topNav.ctype ||= @topNav.type || "nav_bar"
      unless Luca.isBackboneView(@topNav)
        @topNav = Luca.util.lazyComponent( @topNav )

    @topNav.app = @

    $('body').prepend( @topNav.render().el )


  renderBottomNavigation: ()->



