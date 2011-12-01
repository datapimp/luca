(function() {
  var ExampleApplication;
  window.LucaApp = {};
  window.LucaApp.Container = Luca.components.Container.extend({
    el: '#container',
    layout: 'card',
    items: [
      {
        component_type: 'grid',
        css_id: 'grid_container'
      }
    ],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this.options, {
        el: this.el
      });
      Luca.components.Container.prototype.initialize(this.options);
      return console.log("Initializing Container");
    }
  });
  ExampleApplication = (function() {
    ExampleApplication.prototype.views = {};
    function ExampleApplication(options) {
      this.options = options;
      this.views.card_layout = new LucaApp.Container;
    }
    return ExampleApplication;
  })();
  $(function() {
    return window.app = new ExampleApplication;
  });
}).call(this);
