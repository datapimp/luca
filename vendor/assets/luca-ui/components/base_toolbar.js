(function() {

  Luca.components.Toolbar = Luca.core.Container.extend({
    className: 'luca-ui-toolbar',
    position: 'bottom',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        return component.container = _this.el;
      });
    },
    render: function() {
      return $(this.container).append(this.el);
    }
  });

  Luca.register("toolbar", "Luca.components.Toolbar");

}).call(this);
