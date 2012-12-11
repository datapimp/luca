toolbar = Luca.register "Luca.components.Toolbar"

toolbar.extends         "Luca.core.Container"

toolbar.defines
  className: 'luca-ui-toolbar toolbar'

  position: 'bottom'

  prepareComponents: ()->
    _( @components ).each (component)=>
      component.container = @$el

  render: ()->
    $(@container).append(@el)
    @
