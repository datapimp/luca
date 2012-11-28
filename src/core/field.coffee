field = Luca.register         "Luca.core.Field"

field.extends                 "Luca.View"

field.triggers                "before:validation",
                              "after:validation",
                              "on:change"

field.publicConfiguration   
  labelAlign: 'top'
  className: 'luca-ui-text-field luca-ui-field'
  statuses: [
    "warning"
    "error"
    "success"
  ]

field.publicInterface
  disable: ()->
    @getInputElement().attr('disabled', true)

  enable: ()->
    @getInputElement().attr('disabled', false)

  getValue: ()->
    raw = @getInputElement()?.attr('value')

    return raw if _.str.isBlank( raw )

    switch @valueType
      when "integer" then parseInt(raw)
      when "string" then "#{ raw }"
      when "float" then parseFloat(raw)
      else raw

  setValue: (value)->
    @getInputElement()?.attr('value', value)

  updateState: (state)->
    _( @statuses ).each (cls)=>
      @$el.removeClass(cls)
      @$el.addClass(state)

field.privateConfiguration
  isField: true
  template: 'fields/text_field'

field.defines
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
    if Luca.enableBootstrap
      @$el.addClass('control-group')

    @$el.addClass('required') if @required

  change_handler: (e)->
    @trigger "on:change", @, e

  getInputElement: ()->
    @input ||= @$('input').eq(0)
