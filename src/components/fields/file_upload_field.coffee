_.component('Luca.fields.FileUploadField').extends('Luca.core.Field').with

  template: 'fields/file_upload_field'

  initialize: (@options={})->
    Luca.core.Field::initialize.apply @, arguments

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @helperText ||= ""
