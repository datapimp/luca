(function() {
  window.Luca = {
    util: {},
    components: {}
  };
}).call(this);
(function() {

}).call(this);
(function() {

}).call(this);
(function() {

}).call(this);
(function() {
  Framework.components.Field = (function() {
    Field.static = function() {
      return console.log("Static Method");
    };
    Field.prototype.instance = function() {
      return console.log("Instance Method");
    };
    function Field() {}
    return Field;
  })();
}).call(this);
(function() {
  Framework.components.Form = Backbone.View.extend;
}).call(this);
(function() {

}).call(this);
(function() {
  Luca.components.Layout = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
      return console.log("Creating a Layout", this.options);
    }
  });
}).call(this);
(function() {
  Luca.components.CardLayout = Luca.components.Layout.extend({
    activeItem: 0,
    items: [],
    setActiveItem: function(item) {
      return console.log("Setting Active Item");
    },
    initialize: function(options) {
      this.options = options;
      return console.log("Creating a Card Layout", this.options);
    }
  });
}).call(this);



