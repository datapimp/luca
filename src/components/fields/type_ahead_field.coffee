_.def('Luca.fields.TypeAheadField').extends('Luca.fields.TextField').with
  className: 'luca-ui-field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name

