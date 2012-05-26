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
    Luca.View::initialize.apply(@, arguments)

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @helperText ||= ""
    @label ||= "*#{ @label }" if @required and not @label?.match(/^\*/)
    @inputStyles ||= ""

    @disable() if @disabled

    @updateState( @state )
    @placeHolder ||= ""

  beforeRender: ()->
    if Luca.enableBootstrap
      @$el.addClass('control-group')

    @$el.addClass('required') if @required

    @$el.html Luca.templates[ @template ]( @ )
    @input = $('input', @el)

  change_handler: (e)->
    @trigger "on:change", @, e

  disable: ()->
    $("input",@el).attr('disabled', true)

  enable: ()->
    $("input", @el).attr('disabled', false)

  getValue: ()->
    @input.attr('value')

  render: ()->
    $( @container ).append( @$el )

  setValue: (value)->
    @input.attr('value', value)

  updateState: (state)->
    _( @statuses ).each (cls)=>
      @$el.removeClass(cls)
      @$el.addClass(state)