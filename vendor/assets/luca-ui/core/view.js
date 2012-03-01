(function() {

  Luca.View = Backbone.View.extend({
    base: 'Luca.View'
  });

  Luca.View.originalExtend = Backbone.View.extend;

  Luca.View.extend = function(definition) {
    var _base;
    _base = definition.render;
    _base || (_base = function() {
      var container;
      container = _.isFunction(this.container) ? this.container() : this.container;
      if (!($(container) && this.$el)) return this;
      $(container).append(this.$el);
      return this;
    });
    definition.render = function() {
      var _this = this;
      if (this.deferrable) {
        this.trigger("before:render", this);
        this.deferrable.bind(this.deferrable_event, _.once(function() {
          _base.apply(_this, arguments);
          return _this.trigger("after:render", _this);
        }));
        if (!this.deferrable_trigger) this.immediate_trigger = true;
        if (this.immediate_trigger === true) {
          return this.deferrable.fetch();
        } else {
          return this.bind(this.deferrable_trigger, _.once(function() {
            return _this.deferrable.fetch();
          }));
        }
      } else {
        this.trigger("before:render", this);
        _base.apply(this, arguments);
        return this.trigger("after:render", this);
      }
    };
    return Luca.View.originalExtend.apply(this, [definition]);
  };

  _.extend(Luca.View.prototype, {
    debug: function() {
      var message, _i, _len, _results;
      if (!(this.debugMode || (window.LucaDebugMode != null))) return;
      _results = [];
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        message = arguments[_i];
        _results.push(console.log([this.name || this.cid, message]));
      }
      return _results;
    },
    trigger: function() {
      if (Luca.enableGlobalObserver) {
        Luca.ViewObserver || (Luca.ViewObserver = new Luca.Observer({
          type: "view"
        }));
        Luca.ViewObserver.relay(this, arguments);
      }
      return Backbone.View.prototype.trigger.apply(this, arguments);
    },
    hooks: ["after:initialize", "before:render", "after:render", "first:activation", "activation", "deactivation"],
    deferrable_event: "reset",
    initialize: function(options) {
      var unique;
      this.options = options != null ? options : {};
      if (this.name != null) this.cid = _.uniqueId(this.name);
      _.extend(this, this.options);
      Luca.cache(this.cid, this);
      unique = _(Luca.View.prototype.hooks.concat(this.hooks)).uniq();
      this.setupHooks(unique);
      return this.trigger("after:initialize", this);
    },
    setupHooks: function(set) {
      var _this = this;
      set || (set = this.hooks);
      return _(set).each(function(event) {
        var fn, parts, prefix;
        parts = event.split(':');
        prefix = parts.shift();
        parts = _(parts).map(function(p) {
          return _.capitalize(p);
        });
        fn = prefix + parts.join('');
        return _this.bind(event, function() {
          if (_this[fn]) return _this[fn].apply(_this, arguments);
        });
      });
    },
    getCollectionManager: function() {
      var _ref;
      return (_ref = Luca.CollectionManager.get) != null ? _ref.call() : void 0;
    },
    registerCollectionEvents: function() {
      var manager,
        _this = this;
      manager = this.getCollectionManager();
      return _(this.collectionEvents).each(function(handler, signature) {
        var collection, event, key, _ref;
        _ref = signature.split(" "), key = _ref[0], event = _ref[1];
        collection = _this["" + key + "Collection"] = manager.getOrCreate(key);
        if (!collection) throw "Could not find collection specified by " + key;
        if (_.isFunction(handler)) {
          handler = function() {
            return handler.apply(_this, arguments);
          };
        } else {
          handler = _this[handler];
        }
        if (!_.isFunction(handler)) throw "invalid collectionEvents configuration";
        try {
          return collection.bind(event, handler);
        } catch (e) {
          console.log("Error Binding To Collection in registerCollectionEvents", _this);
          throw e;
        }
      });
    }
  });

}).call(this);
