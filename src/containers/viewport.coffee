Luca.containers.Viewport = Luca.containers.CardView.extend
  activeItem: 0

  className: 'luca-ui-viewport'

  fullscreen: true

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply(@, arguments)

    $('html,body').addClass('luca-ui-fullscreen') if @fullscreen

  render: ()->
    console.log "Rendering Viewport"
    @$el.addClass('luca-ui-viewport')

