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

  render: ()->
    @$el.addClass('luca-ui-viewport')
    @renderTopNavigation() if @topNav?
    @renderBottomNavigation() if @bottomNav?

  renderTopNavigation: ()->
    console.log "Rendering Top Navigation"

    if _.isString( @topNav )
      @topNav = new Luca.registry.lookup(@topNav)

    if _.isObject( @topNav )
      unless Luca.util.isBackboneView(@topNav)
        @topNav = Luca.util.lazyComponent( @topNav )

    @topNav.app = @

    console.log "Top Nav", @topNav
    @$el.before( @topNav.render().el )


  renderBottomNavigation: ()->



