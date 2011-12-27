Luca.fields.CheckboxField = Luca.core.Field.extend
  className: 'luca-ui-checkbox-field luca-ui-field'
  
  template: 'fields/checkbox_field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @input_value ||= 1

Luca.register "checkbox_field", "Luca.fields.CheckboxField"
