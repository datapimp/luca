Luca.fields.FileUploadField = Luca.core.Field.extend
  form_field: true

  template: 'fields/file_upload_field'

  initialize: (@options={})->
    Luca.core.Field.prototype.initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name
    @helperText ||= ""

Luca.register "file_upload_field", "Luca.fields.FileUploadField"
