hiddenField = Luca.register       "Luca.fields.HiddenField"
hiddenField.extends               "Luca.core.Field"

hiddenField.defines
  template: 'fields/hidden_field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_value ||= @value
    @label ||= @name