Luca.fields.TextField = Luca.core.Field.extend
  form_field: true

  events:
    "keydown input" : "keydown_handler"
    "blur input" : "blur_handler"
    "focus input" : "focus_handler"
    "change input" : "change_handler"

  template: 'fields/text_field'

  initialize: (@options={})->
    _.bindAll @, "keydown_handler", "blur_handler", "focus_handler"
    Luca.core.Field.prototype.initialize.apply @, arguments

    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name

    if @prepend
      @$el.addClass('input-prepend')  
      @addOn = @prepend
    
    if @append
      @$el.addClass('input-append')
      @addOn = @append

  keydown_handler: _.throttle ((e)-> @change_handler.apply @, arguments), 300

  blur_handler: (e)->
    me = my = $( e.currentTarget )

  focus_handler: (e)->
    me = my = $( e.currentTarget )
  
  change_handler: (e)->
    @trigger "on:change", @, e


Luca.register "text_field", "Luca.fields.TextField"


