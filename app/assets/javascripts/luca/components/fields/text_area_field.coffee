textArea = Luca.register          "Luca.fields.TextAreaField"
textArea.extends                  "Luca.core.Field"
textArea.defines
  autoBindEventHandlers: true

  events:
    "blur textarea" : "blur_handler"
    "focus textarea" : "focus_handler"

  template: 'fields/text_area_field'

  height: "200px"
  width: "90%"
  keyEventThrottle: 300

  initialize: (@options={})->

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @input_class ||= @class
    @input_value ||= ""
    @inputStyles ||= "height:#{ @height };width:#{ @width }"
    @placeHolder ||= ""

    Luca.core.Field::initialize.apply @, arguments

    if @enableKeyEvents is true
      @keyup_handler = _.debounce(@keyup_handler, @keyEventThrottle || 10)

      console.log "Registering Key Events"
      @registerEvent("keyup textarea","keyup_handler")     
      @registerEvent("keydown textarea","keyup_handler")     

  setValue: (value)->
    $( @field() ).val(value)

  getValue: ()->
    $( @field() ).val()

  field: ()->
    @input = @$("textarea")

  keyup_handler: (e)->
    # TODO: Should ignore certain keyup events
    # which would not indicate a change
    @trigger "on:change", @, e
    @trigger "on:keyup", @, e

  blur_handler: (e)->
    @trigger "on:blur", @, e

  focus_handler: (e)->
    @trigger "on:focus", @, e

  change_handler: (e)-> 
    @trigger "on:change", @, e