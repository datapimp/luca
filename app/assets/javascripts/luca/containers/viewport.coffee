viewport = Luca.register    "Luca.containers.Viewport"
viewport.extends            "Luca.Container"

viewport.defines
  fullscreen: true
  fluid: false

  applyWrapper: true

  initialize: (@options={})->
    _.extend @, @options

    if Luca.config.enableBoostrap is true and @applyWrapper is true
      @wrapperClass = if @fluid is true 
        Luca.config.fluidWrapperClass || Luca.containers.Viewport.fluidWrapperClass 
      else 
        Luca.containers.Viewport.defaultWrapperClass 

    Luca.Container::initialize.apply(@, arguments)

    if @fullscreen is true
      @enableFullscreen() 

  enableFluid: ()-> @enableWrapper()

  disableFluid: ()-> @disableWrapper()
   
  enableWrapper: ()->
    if @wrapperClass?
      @$el.parent().addClass( @wrapperClass ) 

  disableWrapper: ()->
    if @wrapperClass?
      @$el.parent().removeClass( @wrapperClass ) 

  enableFullscreen: ()->
    $('html,body').addClass('luca-ui-fullscreen')
    @$el.addClass('fullscreen-enabled')

  disableFullscreen: ()->
    $('html,body').removeClass('luca-ui-fullscreen')
    @$el.removeClass('fullscreen-enabled')

  beforeRender: ()->
    Luca.containers.CardView::beforeRender?.apply(@, arguments)

    #if Luca.config.enableBoostrap and @topNav and @fullscreen
    #  $('body').css('padding','40px')

    @renderTopNavigation() if @topNav?
    @renderBottomNavigation() if @bottomNav?

  height: ()->
    @$el.height()

  width: ()->
    @$el.width()

  afterRender: ()->
    Luca.containers.CardView::after?.apply(@, arguments)

    if Luca.config.enableBoostrap is true and @containerClassName
      @$el.children().wrap('<div class="#{ containerClassName }" />')

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
    # IMPLEMENT


Luca.containers.Viewport.defaultWrapperClass  = 'container'
Luca.containers.Viewport.fluidWrapperClass    = 'container-fluid'
