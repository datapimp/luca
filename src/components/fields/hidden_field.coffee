Luca.fields.HiddenField = Luca.core.Field.extend
  form_field: true

  template: 'fields/hidden_field'

  initialize: (@options={})->
    Luca.core.Field.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @input_value ||= @value
    @label ||= @name

Luca.register "hidden_field", "Luca.fields.HiddenField"



