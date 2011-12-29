Luca.containers.Viewport = Luca.core.Container.extend
  className: 'luca-ui-viewport'

  fullscreen: true

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply(@, arguments)

    $('html,body').addClass('luca-ui-fullscreen') if @fullscreen

  prepare_layout: ()->
    _( @components ).each (component) =>
      component.renderTo = @el 

  prepare_components: ()-> true

  render: ()->
    console.log "Rendering Viewport"
    $(@el).addClass('luca-ui-viewport')

