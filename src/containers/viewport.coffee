Luca.containers.Viewport = Luca.core.Container.extend
  className: 'luca-ui-viewport'

  renderTo: 'body'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply(@)
