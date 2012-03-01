(function() {

  Luca.components.Controller = Luca.containers.CardView.extend({
    initialize: function(options) {
      var _ref;
      this.options = options;
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      this.defaultCard || (this.defaultCard = (_ref = this.components[0]) != null ? _ref.name : void 0);
      if (!this.defaultCard) {
        throw "Controllers must specify a defaultCard property and/or the first component must have a name";
      }
      return this.state = new Backbone.Model({
        active_section: this.defaultCard
      });
    },
    each: function(fn) {
      var _this = this;
      return _(this.components).each(function(component) {
        return fn.apply(_this, [component]);
      });
    },
    "default": function(callback) {
      return this.navigate_to(this.defaultCard, callback);
    },
    navigate_to: function(section, callback) {
      var _this = this;
      section || (section = this.defaultCard);
      this.activate(section, false, function(activator, previous, current) {
        _this.state.set({
          active_section: current.name
        });
        if (_.isFunction(callback)) return callback.apply(current);
      });
      return this.find(section);
    }
  });

}).call(this);
