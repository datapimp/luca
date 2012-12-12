textField = Luca.register     'Luca.fields.TextField'
textField.extends             'Luca.core.Field'

textField.defines
  events:
    "blur input" : "blur_handler"
    "focus input" : "focus_handler"
    "change input" : "change_handler"

  template: 'fields/text_field'

  autoBindEventHandlers: true

  send_blanks: true

  keyEventThrottle: 300

  initialize: (@options={})->
    if @enableKeyEvents
      if @keyEventThrottle
        @keyup_handler = _.debounce(@keyup_handler, @keyEventThrottle)
        
      @registerEvent("keyup input","keyup_handler")     

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @input_class ||= @class
    @input_value ||= @value || "" 
    
    if @prepend
      @$el.addClass('input-prepend')
      @addOn = @prepend

    if @append
      @$el.addClass('input-append')
      @addOn = @append

    @placeHolder ||= ""

    Luca.core.Field::initialize.apply @, arguments

  keyup_handler: (e)->
    @trigger "on:change", @, e
    @trigger "on:keyup", @, e

  blur_handler: (e)->
    @trigger "on:blur", @, e

  focus_handler: (e)->
    @trigger "on:focus", @, e

  change_handler: (e)-> 
    @trigger "on:change", @, e
