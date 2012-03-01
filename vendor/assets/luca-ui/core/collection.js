(function() {

  Luca.Collection = (Backbone.QueryCollection || Backbone.Collection).extend({
    initialize: function(models, options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (this.cached) {
        this.bootstrap_cache_key = _.isFunction(this.cached) ? this.cached() : this.cached;
      }
      if (this.registerWith) {
        this.registerAs || (this.registerAs = this.cached);
        this.registerAs = _.isFunction(this.registerAs) ? this.registerAs() : this.registerAs;
        this.bind("after:initialize", function() {
          return _this.register(_this.registerWith, _this.registerAs, _this);
        });
      }
      if (_.isArray(this.data) && this.data.length > 0) {
        this.memoryCollection = true;
      }
      if (this.useNormalUrl !== true) this.__wrapUrl();
      Backbone.Collection.prototype.initialize.apply(this, [models, this.options]);
      return this.trigger("after:initialize");
    },
    __wrapUrl: function() {
      var params, url,
        _this = this;
      if (_.isFunction(this.url)) {
        return this.url = _.wrap(this.url, function(fn) {
          var existing_params, new_val, parts, queryString, val;
          val = fn.apply(_this);
          parts = val.split('?');
          if (parts.length > 1) existing_params = _.last(parts);
          queryString = _this.queryString();
          if (existing_params && val.match(existing_params)) {
            queryString = queryString.replace(existing_params, '');
          }
          new_val = "" + val + "?" + queryString;
          if (new_val.match(/\?$/)) new_val = new_val.replace(/\?$/, '');
          return new_val;
        });
      } else {
        url = this.url;
        params = this.queryString();
        return this.url = _([url, params]).compact().join("?");
      }
    },
    queryString: function() {
      var parts,
        _this = this;
      parts = _(this.base_params || (this.base_params = Luca.Collection.baseParams())).inject(function(memo, value, key) {
        var str;
        str = "" + key + "=" + value;
        memo.push(str);
        return memo;
      }, []);
      return _.uniq(parts).join("&");
    },
    resetFilter: function() {
      this.base_params = Luca.Collection.baseParams();
      return this;
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      this.applyParams(filter);
      return this.fetch(_.extend(options, {
        refresh: true
      }));
    },
    applyParams: function(params) {
      this.base_params || (this.base_params = Luca.Collection.baseParams());
      return _.extend(this.base_params, params);
    },
    register: function(collectionManager, key, collection) {
      if (collectionManager == null) collectionManager = "";
      if (key == null) key = "";
      if (!(key.length > 1)) {
        throw "Can not register with a collection manager without a key";
      }
      if (!(collectionManager.length > 1)) {
        throw "Can not register with a collection manager without a valid collection manager";
      }
      if (_.isString(collectionManager)) {
        collectionManager = Luca.util.nestedValue(collectionManager, window || global);
      }
      if (!collectionManager) throw "Could not register with collection manager";
      if (_.isFunction(collectionManager.add)) {
        return collectionManager.add(key, collection);
      }
      if (_.isObject(collect)) return collectionManager[key] = collection;
    },
    loadFromBootstrap: function() {
      if (!this.bootstrap_cache_key) return;
      return this.reset(this.cached_models());
    },
    bootstrap: function() {
      return this.loadFromBootstrap();
    },
    cached_models: function() {
      return Luca.Collection.cache(this.bootstrap_cache_key);
    },
    fetch: function(options) {
      var url;
      if (options == null) options = {};
      this.trigger("before:fetch", this);
      if (this.memoryCollection === true) return this.reset(this.data);
      if (this.cached_models().length && !options.refresh) return this.bootstrap();
      url = _.isFunction(this.url) ? this.url() : this.url;
      if (!((url && url.length > 1) || this.localStorage)) return true;
      this.fetching = true;
      try {
        return Backbone.Collection.prototype.fetch.apply(this, arguments);
      } catch (e) {
        console.log("Error in Collection.fetch", e);
        throw e;
      }
    },
    onceLoaded: function(fn) {
      var wrapped,
        _this = this;
      if (this.length > 0 && !this.fetching) {
        fn.apply(this, [this]);
        return;
      }
      wrapped = function() {
        return fn.apply(_this, [_this]);
      };
      return this.bind("reset", function() {
        wrapped();
        return _this.unbind("reset", wrapped);
      });
    },
    ifLoaded: function(fn, scope) {
      var _this = this;
      if (scope == null) scope = this;
      if (this.models.length > 0 && !this.fetching) {
        fn.apply(scope, [this]);
        return;
      }
      this.bind("reset", function(collection) {
        return fn.apply(scope, [collection]);
      });
      if (!this.fetching) return this.fetch();
    },
    parse: function(response) {
      var models;
      this.fetching = false;
      this.trigger("after:response");
      models = this.root != null ? response[this.root] : response;
      if (this.bootstrap_cache_key) {
        Luca.Collection.cache(this.bootstrap_cache_keys, models);
      }
      return models;
    }
  });

  _.extend(Luca.Collection.prototype, {
    trigger: function() {
      if (Luca.enableGlobalObserver) {
        Luca.CollectionObserver || (Luca.CollectionObserver = new Luca.Observer({
          type: "collection"
        }));
        Luca.CollectionObserver.relay(this, arguments);
      }
      return Backbone.View.prototype.trigger.apply(this, arguments);
    }
  });

  Luca.Collection.baseParams = function(obj) {
    if (obj) return Luca.Collection._baseParams = obj;
    if (_.isFunction(Luca.Collection._baseParams)) {
      return Luca.Collection._baseParams.call();
    }
    if (_.isObject(Luca.Collection._baseParams)) {
      return Luca.Collection._baseParams;
    }
  };

  Luca.Collection._bootstrapped_models = {};

  Luca.Collection.bootstrap = function(obj) {
    return _.extend(Luca.Collection._bootstrapped_models, obj);
  };

  Luca.Collection.cache = function(key, models) {
    if (models) return Luca.Collection._bootstrapped_models[key] = models;
    return Luca.Collection._bootstrapped_models[key] || [];
  };

}).call(this);
