Luca.containers.PanelView = Luca.core.Container.extend
  className: 'luca-ui-panel'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments
  
  afterLayout: ()->
    if @template
      contents = ( Luca.templates || JST )[ @template ]( @ )
      @$el.html(contents) 

  render: ()->
    $(@container).append @$el
    

