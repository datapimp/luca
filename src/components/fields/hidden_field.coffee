_.def('Luca.fields.HiddenField').extends('Luca.core.Field').with

  template: 'fields/hidden_field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_value ||= @value
    @label ||= @name