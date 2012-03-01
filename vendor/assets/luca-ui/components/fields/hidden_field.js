(function() {

  Luca.fields.HiddenField = Luca.core.Field.extend({
    form_field: true,
    template: 'fields/hidden_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = this.value);
      return this.label || (this.label = this.name);
    }
  });

  Luca.register("hidden_field", "Luca.fields.HiddenField");

}).call(this);
