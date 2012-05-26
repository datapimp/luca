_.component('Luca.components.Toolbar').extends('Luca.core.Container').with

  className: 'luca-ui-toolbar'

  position: 'bottom'

  initialize: (@options={})->
    Luca.core.Container::initialize.apply @, arguments

  prepareComponents: ()->
    _( @components ).each (component)=>
      component.container = @$el

  render: ()->
    $(@container).append(@el)