Luca.fields.TextAreaField = Luca.core.Field.extend
  form_field: true

  events:
    "keydown input" : "keydown_handler"
    "blur input" : "blur_handler"
    "focus input" : "focus_handler"

  template: 'fields/text_area_field'

  height: "200px"
  width: "90%"

  initialize: (@options={})->
    _.bindAll @, "keydown_handler"

    Luca.core.Field::initialize.apply @, arguments

    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name
    @input_class ||= @class
    @inputStyles ||= "height:#{ @height };width:#{ @width }"

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

Luca.register "text_area_field", "Luca.fields.TextAreaField"
