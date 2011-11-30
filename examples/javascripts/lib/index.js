(function() {
  var BaseView, DerivedView;

  BaseView = Backbone.View.extend({
    name: "BaseView",
    whoami: function() {
      return console.log(this.name);
    }
  });

  DerivedView = BaseView.extend({
    name: "MY NAME"
  });

  $(function() {
    var base, derived;
    base = new BaseView;
    window.derived = new DerivedView;
    window.derived.whoami()
  });

}).call(this);
