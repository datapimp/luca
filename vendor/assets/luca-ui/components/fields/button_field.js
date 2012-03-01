(function() {

  Luca.fields.ButtonField = Luca.core.Field.extend({
    form_field: true,
    readOnly: true,
    events: {
      "click input": "click_handler"
    },
    hooks: ["button:click"],
    className: 'luca-ui-field luca-ui-button-field',
    template: 'fields/button_field',
    click_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      return this.trigger("button:click");
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this.options);
      _.bindAll(this, "click_handler");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('button'));
      this.input_name || (this.input_name = this.name || (this.name = this.input_id));
      this.input_value || (this.input_value = this.label || (this.label = this.text));
      this.input_type || (this.input_type = "button");
      return this.input_class || (this.input_class = this["class"] || "luca-button");
    },
    setValue: function() {
      return true;
    }
  });

  Luca.register("button_field", "Luca.fields.ButtonField");

}).call(this);
