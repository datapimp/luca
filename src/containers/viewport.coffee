_.component('Luca.containers.Viewport').extend('Luca.containers.CardView').with

  activeItem: 0

  className: 'luca-ui-viewport'

  fullscreen: true

  initialize: (@options={})->
    Luca.core.Container::initialize.apply(@, arguments)
    $('html,body').addClass('luca-ui-fullscreen') if @fullscreen

  render: ()->
    @$el.addClass('luca-ui-viewport')

