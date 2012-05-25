_.component('Luca.fields.HiddenField').extends('Luca.core.Field').with

  template: 'fields/hidden_field'

  initialize: (@options={})->
    Luca.core.Field::initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @input_value ||= @value
    @label ||= @name