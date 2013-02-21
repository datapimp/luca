# The `Luca.core.Field` is an abstract base class for field components
# which are used in the `Luca.components.FormView`.  They provide common
# functionality like getValue, setValue, change and validation event bindings. 
#
# Additionally, the field component provides common Twitter Bootstrap styling
# hooks, such as error, warning, and success status flagging.
field = Luca.register         "Luca.core.Field"

field.extends                 "Luca.View"

field.triggers                "before:validation",
                              "after:validation",
                              "on:change"

field.publicConfiguration
  className: 'luca-ui-field'

  # Controls whether or not this field is rendered in a disabled state
  disabled: undefined

  # Controls the bootstrap helperText value for this field control
  helperText: undefined

  # Text value for the label element that goes along with this field control
  label: undefined

  # Controls the positioning of the label element.  Valid options are
  # 'top', 'left'.  For any other custom display you can control this
  # on your own by specifying a template
  labelAlign: 'top'

  # Controls the value displayed in this field when it is in an untouched state
  # by the user.  Uses the html5 placeholder attribute
  placeHolder: undefined

  # Controls whether or not we want to display visual indicator
  # that this field is required. 
  required: undefined

  # Which statuses can be applied to this field? Valid options are taken
  # from bootstrap state styling.
  statuses: [
    "warning"
    "error"
    "success"
  ]

  # What is the type of value that this field
  # should have? You can use this to coerce the `getValue()` type
  # into an integer, string, or float.
  valueType: "string"



field.publicMethods
  # Disable this field
  disable: ()->
    @getInputElement().attr('disabled', true)

  # Enable this field
  enable: ()->
    @getInputElement().attr('disabled', false)

  # Gets the value from the input element in this field control
  getValue: ()->
    raw = @getInputElement()?.val()
    @getParsedValue(raw)

  # Sets the value on the input element inside this field control
  setValue: (value)->
    @getInputElement()?.val(value)

  # Update the state of this field.  Valid options are defined on
  # this fields `@statuses` property
  updateState: (state)->
    for cssClass in @statuses
      @$el.removeClass(cssClass)

    @$el.addClass(state)

  # Remove any visual error indications from this field control
  clearErrors: ()->
    @$el.removeClass('error')

  # Display a visual error state on this field
  displayErrors: (errors)->
    @updateState('error')

field.privateMethods
  # Runs the value from the underlying input element
  # through a type conversion process configured by
  # the `@valueType` field
  getParsedValue: (raw)->
    return raw if _.str.isBlank( raw )

    switch @valueType
      when "integer" then parseInt(raw)
      when "string" then "#{ raw }"
      when "float" then parseFloat(raw)
      else raw

field.privateConfiguration
  # A convenience method for identifying field components
  isField: true
  template: 'fields/text_field'

field.privateMethods
  initialize: (@options={})->
    _.extend @, @options

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_class ||= ""
    @input_type ||= ""
    @helperText ||= ""
    @label = @name if not @label? or @label.length is 0
    @label ||= "*#{ @label }" if @required and not @label?.match(/^\*/)
    @inputStyles ||= ""
    @input_value ||= @value || ""

    @disable() if @disabled

    @updateState( @state )
    @placeHolder ||= ""

    # In order to support using Luca.View template properties everywhere.

    # Will need to work around how the field classes
    # apply templates to themselves.
    Luca.View::initialize.apply(@, arguments)

  beforeRender: ()->
    if Luca.config.enableBoostrap
      @$el.addClass('control-group')

    @$el.addClass('required') if @required

  change_handler: (e)->
    @trigger "on:change", @, e

  getInputElement: ()->
    @input ||= @$('input').eq(0)

field.register()
