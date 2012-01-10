Luca.fields.CheckboxField = Luca.core.Field.extend
  form_field: true

  events:
    "change input" : "change_handler"

  change_handler: (e)->
    me = my = $(e.currentTarget)

    if me.checked is true
      @trigger "checked"
    else
      @trigger "unchecked"

  className: 'luca-ui-checkbox-field luca-ui-field'
  
  template: 'fields/checkbox_field'

  initialize: (@options={})->
    _.extend @, @options
    _.bindAll @, "change_handler"

    Luca.core.Field.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @input_value ||= 1
    @label ||= @name

  setValue: (checked)->
    @input.attr('checked', checked)

  getValue:()->
    @input.attr('checked') is true

Luca.register "checkbox_field", "Luca.fields.CheckboxField"
