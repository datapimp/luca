(function() {

  Luca.components.Template = Luca.View.extend({
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.View.prototype.initialize.apply(this, arguments);
      if (!(this.template || this.markup)) {
        throw "Templates must specify which template / markup to use";
      }
      if (_.isString(this.templateContainer)) {
        return this.templateContainer = eval("(window || global)." + this.templateContainer);
      }
    },
    templateContainer: "Luca.templates",
    beforeRender: function() {
      if (_.isUndefined(this.templateContainer)) this.templateContainer = JST;
      return this.$el.html(this.markup || this.templateContainer[this.template](this.options));
    },
    render: function() {
      return $(this.container).append(this.$el);
    }
  });

  Luca.register("template", "Luca.components.Template");

}).call(this);
