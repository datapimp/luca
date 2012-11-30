_.def('Luca.fields.TextAreaField').extends('Luca.core.Field').with

  events:
    "keydown input" : "keydown_handler"
    "blur input" : "blur_handler"
    "focus input" : "focus_handler"

  template: 'fields/text_area_field'

  height: "200px"
  width: "90%"

  initialize: (@options={})->
    _.bindAll @, "keydown_handler"

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @input_class ||= @class
    @input_value ||= ""
    @inputStyles ||= "height:#{ @height };width:#{ @width }"
    @placeHolder ||= ""

    Luca.core.Field::initialize.apply @, arguments

  setValue: (value)->
    $( @field() ).val(value)

  getValue: ()->
    $( @field() ).val()

  field: ()->
    @input = $("textarea##{ @input_id }", @el)

  keydown_handler: (e)->
    me = my = $( e.currentTarget )

  blur_handler: (e)->
    me = my = $( e.currentTarget )

  focus_handler: (e)->
    me = my = $( e.currentTarget )