Luca.components.FormButtonToolbar = Luca.components.Toolbar.extend
  className: 'luca-ui-form-toolbar'

  position: 'bottom'

  includeReset: false

  initialize: (@options={})->
    Luca.components.Toolbar.prototype.initialize.apply @, arguments

    @components = [
      ctype: 'button_field'
      label: 'Submit'
      class: 'submit-button'
    ]

    if @includeReset
      @components.push
        ctype: 'button_field'
        label: 'Reset'
        class: 'reset-button'

  afterInitialize: ()->
    Luca.components.Toolbar.prototype.afterInitialize?.apply @, arguments
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

Luca.register "form_button_toolbar", "Luca.components.FormButtonToolbar"
