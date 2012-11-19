_.def('Luca.core.Field').extends('Luca.View').with

  className: 'luca-ui-text-field luca-ui-field'

  isField: true

  template: 'fields/text_field'

  labelAlign: 'top'

  hooks:[
    "before:validation",
    "after:validation",
    "on:change"
  ]

  # see: http://twitter.github.com/bootstrap/base-css.html
  statuses: [
    "warning"
    "error"
    "success"
  ]

  initialize: (@options={})->
    _.extend @, @options

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_class ||= ""
    @input_type ||= ""
    @helperText ||= ""
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

  getInputElement: ()->
    @input ||= @$('input').eq(0)

  updateState: (state)->
    _( @statuses ).each (cls)=>
      @$el.removeClass(cls)
      @$el.addClass(state)
