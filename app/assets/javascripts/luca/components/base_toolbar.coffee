_.def('Luca.components.Toolbar').extends('Luca.Container').with

toolbar = Luca.register     "Luca.components.Toolbar"
toolbar.extends             "Luca.Container"

toolbar.defines
  className: 'luca-ui-toolbar toolbar'

  position: 'bottom'

  prepareComponents: ()->
    _( @components ).each (component)=>
      component.container = @$el

  render: ()->
    $(@container).append(@el)
    @