Luca.fields.TypeAheadField = Luca.fields.TextField.extend
  className: 'luca-ui-field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name
  
