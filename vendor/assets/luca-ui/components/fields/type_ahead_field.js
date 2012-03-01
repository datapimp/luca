(function() {

  Luca.fields.TypeAheadField = Luca.fields.TextField.extend({
    form_field: true,
    className: 'luca-ui-field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      return this.label || (this.label = this.name);
    }
  });

}).call(this);
