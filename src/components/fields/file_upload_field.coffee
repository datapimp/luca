fileUpload = Luca.register              "Luca.fields.FileUploadField"
fileUpload.extends                      "Luca.core.Field"

fileUpload.defines
  version: 1

  template: 'fields/file_upload_field'

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @helperText ||= ""
