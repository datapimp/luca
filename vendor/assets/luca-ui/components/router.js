(function() {

  Luca.Router = Backbone.Router.extend({
    routes: {
      "": "default"
    },
    initialize: function(options) {
      var _this = this;
      this.options = options;
      _.extend(this, this.options);
      this.routeHandlers = _(this.routes).values();
      return _(this.routeHandlers).each(function(route_id) {
        return _this.bind("route:" + route_id, function() {
          return _this.trigger.apply(_this, ["change:navigation", route_id].concat(_(arguments).flatten()));
        });
      });
    },
    navigate: function(route, triggerRoute) {
      if (triggerRoute == null) triggerRoute = false;
      Backbone.Router.prototype.navigate.apply(this, arguments);
      return this.buildPathFrom(Backbone.history.getFragment());
    },
    buildPathFrom: function(matchedRoute) {
      var _this = this;
      return _(this.routes).each(function(route_id, route) {
        var args, regex;
        regex = _this._routeToRegExp(route);
        if (regex.test(matchedRoute)) {
          args = _this._extractParameters(regex, matchedRoute);
          return _this.trigger.apply(_this, ["change:navigation", route_id].concat(args));
        }
      });
    }
  });

}).call(this);
