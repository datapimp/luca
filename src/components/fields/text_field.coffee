Luca.fields.TextField = Luca.core.Field.extend
  form_field: true

  events:
    "keydown input" : "keydown_handler"
    "blur input" : "blur_handler"
    "focus input" : "focus_handler"

  template: 'fields/text_field'

  initialize: (@options={})->
    _.bindAll @, "keydown_handler"
    Luca.core.Field.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name

  keydown_handler: (e)->
    me = my = $( e.currentTarget )

  blur_handler: (e)->
    me = my = $( e.currentTarget )

  focus_handler: (e)->
    me = my = $( e.currentTarget )

Luca.register "text_field", "Luca.fields.TextField"


