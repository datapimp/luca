Luca.components.Toolbar = Luca.core.Container.extend
  className: 'luca-ui-toolbar'
  
  position: 'bottom'

  component_type: 'toolbar'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    Luca.core.Container.prototype.afterInitialize?.apply @, arguments
    @container = "#{ @id }-wrapper"

  prepare_components: ()->
    _( @components ).each (component)=> 
      component.container = component.renderTo = @el

  prepare_layout: ()-> 
    true

  render: ()->
    $(@container).append(@el)

  position_action: ()->
    if @position is "top" then "prepend" else "append" 


Luca.register "toolbar", "Luca.components.Toolbar"
