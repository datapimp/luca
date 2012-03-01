(function() {

  Luca.modules.Deferrable = {
    configure_collection: function(setAsDeferrable) {
      var _ref;
      if (setAsDeferrable == null) setAsDeferrable = true;
      if (!this.collection) return;
      if (!(this.collection && _.isFunction(this.collection.fetch) && _.isFunction(this.collection.reset))) {
        this.collection = new Luca.components.FilterableCollection(this.collection.initial_set, this.collection);
      }
      if ((_ref = this.collection) != null ? _ref.deferrable_trigger : void 0) {
        this.deferrable_trigger = this.collection.deferrable_trigger;
      }
      if (setAsDeferrable) return this.deferrable = this.collection;
    }
  };

}).call(this);
