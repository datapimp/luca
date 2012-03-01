(function() {

  Luca.fields.FileUploadField = Luca.core.Field.extend({
    form_field: true,
    template: 'fields/file_upload_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      return this.helperText || (this.helperText = "");
    }
  });

  Luca.register("file_upload_field", "Luca.fields.FileUploadField");

}).call(this);
