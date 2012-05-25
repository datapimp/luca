_.component('Luca.components.FormButtonToolbar')
.extends('Luca.components.Toolbar').with

  className: 'luca-ui-form-toolbar form-actions'

  position: 'bottom'

  includeReset: false

  render: ()->
    $(@container).append(@el)

  initialize: (@options={})->
    Luca.components.Toolbar.prototype.initialize.apply @, arguments

    @components = [
      ctype: 'button_field'
      label: 'Submit'
      class: 'btn submit-button'
    ]

    if @includeReset
      @components.push
        ctype: 'button_field'
        label: 'Reset'
        class: 'btn reset-button'
