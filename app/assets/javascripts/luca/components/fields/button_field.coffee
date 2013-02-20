# The `Luca.fields.ButtonField` provides an easy way to generate
# a button element, with an optional icon.  Supports all of the
# available bootstrap icons, and color states.  
#
# The `Luca.fields.ButtonField` component will typically be used as 
# part of a `Luca.components.FormView` or a `Luca.components.PanelToolbar`.
buttonField = Luca.register         "Luca.fields.ButtonField"

buttonField.extends                 "Luca.core.Field"

buttonField.triggers                "button:click"

buttonField.publicConfiguration
  # Which size should this button be? Valid options are:
  # - none ( default )
  # - large
  # - mini
  # - small
  buttonSize: undefined

  # Which bootstrap color class should we apply to this button?
  # Valid options are any css button class, or the defaults which
  # ship with bootstrap: 
  #
  # - btn-primary
  # - btn-info
  # - btn-success
  # - btn-warning
  # - btn-danger
  # - btn-inverse
  # - btn-link
  class: undefined 

  # specifies the bootstrap icon class you want to use for this button 
  # you can use 'icon-ok-sign' or just 'ok-sign'
  icon_class: undefined

  # specifies the text value of the button
  label: undefined    

  # an alias for label, or input_value.  controls which text 
  # displays inside of the button
  text: undefined

  # should we render the white icon? 
  white: false

buttonField.privateConfiguration
  readOnly:       true
  input_value:    undefined 
  input_type:     "button" 
  icon_class:     undefined
  input_name:     undefined
  buttonClasses:  "" 

buttonField.privateConfiguration
  isButton: true
  autoBindEventHandlers: true
  template: "fields/button_field"
  events:
    "click input" : "clickHandler"

buttonField.privateMethods
  clickHandler: (e)->
    me = my = $( e.currentTarget )
    @trigger "button:click"

  initialize: (@options={})->
    _.extend @, @options

    Luca.core.Field::initialize.apply @, arguments

    @template = "fields/button_field_link" if @icon_class?.length

  afterInitialize: ()->
    @input_id ||= _.uniqueId('button')
    @input_name ||= @name ||= @input_id
    @input_value ||= @label ||= @text
    @input_class ||= @class ||= @buttonClasses

    if @buttonSize?.length > 0
      @input_class += " #{ buttonSize.replace(/btn-/,'') }"

    @icon_class ||= ""
    @icon_class = "icon-#{ @icon_class }" if @icon_class.length and !@icon_class.match(/^icon-/)
    @icon_class += " icon-white" if @white

  setValue: ()-> 
    true

buttonField.register()
