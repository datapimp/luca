(function() {

  Luca.fields.CheckboxField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "change input": "change_handler"
    },
    change_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("on:change", this, e);
      if (me.checked === true) {
        return this.trigger("checked");
      } else {
        return this.trigger("unchecked");
      }
    },
    className: 'luca-ui-checkbox-field luca-ui-field',
    template: 'fields/checkbox_field',
    hooks: ["checked", "unchecked"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "change_handler");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = 1);
      return this.label || (this.label = this.name);
    },
    setValue: function(checked) {
      return this.input.attr('checked', checked);
    },
    getValue: function() {
      return this.input.attr('checked') === true;
    }
  });

  Luca.register("checkbox_field", "Luca.fields.CheckboxField");

}).call(this);
