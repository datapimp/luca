Luca.components.Toolbar = Luca.core.Container.extend
  className: 'luca-ui-toolbar'
  
  position: 'bottom'

  componentType: 'toolbar'

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    Luca.core.Container.prototype.afterInitialize?.apply @, arguments
    @container = "#{ @id }-wrapper"

  prepareComponents: ()->
    _( @components ).each (component)=> 
      component.container = @el

  prepareLayout: ()-> 
    true

  render: ()->
    $(@container).append(@el)

  position_action: ()->
    if @position is "top" then "prepend" else "append" 


Luca.register "toolbar", "Luca.components.Toolbar"
