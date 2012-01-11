Luca.components.Toolbar = Luca.core.Container.extend
  className: 'luca-ui-toolbar'
  component_type: 'toolbar'
  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments

Luca.register "toolbar", "Luca.components.Toolbar"
