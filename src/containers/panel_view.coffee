Luca.containers.PanelView = Luca.core.Container.extend
  className: 'luca-ui-panel'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments
  
  afterLayout: ()->
    if @template
      $(@el).html ( Luca.templates || JST )[ @template ]( @ )

  render: ()->
    $(@container).append $(@el)
    

