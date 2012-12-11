_.extend(Backbone.Router.prototype, Backbone.Events, {
  route : function(route, name, callback) {
    Backbone.history || (Backbone.history = new Backbone.History);
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    Backbone.history.route(route, _.bind(function(fragment) {
      var args = this._extractParameters(route, fragment);

      if( _.isFunction( this.before ) ){
        this.before.apply(this, args)
      }

      callback.apply(this, args);

      if( _.isFunction( this.after ) ){
        this.after.apply(this, args)
      }

      this.trigger.apply(this, ['route:' + name].concat(args));
    }, this));
  }
});
