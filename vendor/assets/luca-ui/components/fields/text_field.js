(function() {

  Luca.fields.TextField = Luca.core.Field.extend({
    form_field: true,
    events: {
      "keydown input": "keydown_handler",
      "blur input": "blur_handler",
      "focus input": "focus_handler",
      "change input": "change_handler"
    },
    template: 'fields/text_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.bindAll(this, "keydown_handler", "blur_handler", "focus_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (this.prepend) {
        this.$el.addClass('input-prepend');
        this.addOn = this.prepend;
      }
      if (this.append) {
        this.$el.addClass('input-append');
        return this.addOn = this.append;
      }
    },
    keydown_handler: _.throttle((function(e) {
      return this.change_handler.apply(this, arguments);
    }), 300),
    blur_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    focus_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    }
  });

  Luca.register("text_field", "Luca.fields.TextField");

}).call(this);
