(function() {

  _.mixin(_.string);

  window.Luca = {
    VERSION: "0.7.92",
    core: {},
    containers: {},
    components: {},
    modules: {},
    fields: {},
    util: {},
    registry: {
      classes: {},
      namespaces: ["Luca.containers", "Luca.components"]
    },
    component_cache: {
      cid_index: {},
      name_index: {}
    }
  };

  Luca.enableBootstrap = true;

  Luca.isBackboneModel = function(obj) {
    return _.isFunction(obj != null ? obj.set : void 0) && _.isFunction(obj != null ? obj.get : void 0) && _.isObject(obj != null ? obj.attributes : void 0);
  };

  Luca.isBackboneView = function(obj) {
    return _.isFunction(obj != null ? obj.render : void 0) && !_.isUndefined(obj != null ? obj.el : void 0);
  };

  Luca.isBackboneCollection = function(obj) {
    return _.isFunction(obj != null ? obj.fetch : void 0) && _.isFunction(obj != null ? obj.reset : void 0);
  };

  Luca.registry.addNamespace = function(identifier) {
    Luca.registry.namespaces.push(identifier);
    return Luca.registry.namespaces = _(Luca.registry.namespaces).uniq();
  };

  Luca.cache = function(needle, component) {
    var lookup_id;
    if (component != null) Luca.component_cache.cid_index[needle] = component;
    component = Luca.component_cache.cid_index[needle];
    if ((component != null ? component.component_name : void 0) != null) {
      Luca.component_cache.name_index[component.component_name] = component.cid;
    } else if ((component != null ? component.name : void 0) != null) {
      Luca.component_cache.name_index[component.name] = component.cid;
    }
    if (component != null) return component;
    lookup_id = Luca.component_cache.name_index[needle];
    return Luca.component_cache.cid_index[lookup_id];
  };

  Luca.util.nestedValue = function(accessor, source_object) {
    return _(accessor.split(/\./)).inject(function(obj, key) {
      return obj = obj != null ? obj[key] : void 0;
    }, source_object);
  };

  Luca.registry.lookup = function(ctype) {
    var c, className, parents;
    c = Luca.registry.classes[ctype];
    if (c != null) return c;
    className = _.camelize(_.capitalize(ctype));
    parents = _(Luca.registry.namespaces).map(function(namespace) {
      return Luca.util.nestedValue(namespace, window || global);
    });
    return _.first(_.compact(_(parents).map(function(parent) {
      return parent[className];
    })));
  };

  Luca.util.lazyComponent = function(config) {
    var componentClass, constructor, ctype;
    ctype = config.ctype;
    componentClass = Luca.registry.lookup(ctype);
    if (!componentClass) {
      throw "Invalid Component Type: " + ctype + ".  Did you forget to register it?";
    }
    constructor = eval(componentClass);
    return new constructor(config);
  };

  Luca.register = function(component, constructor_class) {
    var exists;
    exists = Luca.registry.classes[component];
    if (exists != null) {
      throw "Can not register component with the signature " + component + ". Already exists";
    } else {
      return Luca.registry.classes[component] = constructor_class;
    }
  };

  Luca.available_templates = function(filter) {
    var available;
    if (filter == null) filter = "";
    available = _(Luca.templates).keys();
    if (filter.length > 0) {
      return _(available).select(function(tmpl) {
        return tmpl.match(filter);
      });
    } else {
      return available;
    }
  };

  Luca.util.isIE = function() {
    try {
      Object.defineProperty({}, '', {});
      return false;
    } catch (e) {
      return true;
    }
  };

  $((function() {
    return $('body').addClass('luca-ui-enabled');
  })());

}).call(this);
(function() {

  Luca.modules.Deferrable = {
    configure_collection: function(setAsDeferrable) {
      var collectionManager, _ref, _ref2;
      if (setAsDeferrable == null) setAsDeferrable = true;
      if (!this.collection) return;
      if (_.isString(this.collection) && (collectionManager = (_ref = Luca.CollectionManager) != null ? _ref.get() : void 0)) {
        this.collection = collectionManager.getOrCreate(this.collection);
      }
      if (!(this.collection && _.isFunction(this.collection.fetch) && _.isFunction(this.collection.reset))) {
        this.collection = new Luca.Collection(this.collection.initial_set, this.collection);
      }
      if ((_ref2 = this.collection) != null ? _ref2.deferrable_trigger : void 0) {
        this.deferrable_trigger = this.collection.deferrable_trigger;
      }
      if (setAsDeferrable) return this.deferrable = this.collection;
    }
  };

}).call(this);
(function() {

  Luca.LocalStore = (function() {

    function LocalStore(name) {
      var store;
      this.name = name;
      store = localStorage.getItem(this.name);
      this.data = (store && JSON.parse(store)) || {};
    }

    LocalStore.prototype.guid = function() {
      var S4;
      S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };

    LocalStore.prototype.save = function() {
      return localStorage.setItem(this.name, JSON.stringify(this.data));
    };

    LocalStore.prototype.create = function(model) {
      if (!model.id) model.id = model.attribtues.id = this.guid();
      this.data[model.id] = model;
      this.save();
      return model;
    };

    LocalStore.prototype.update = function(model) {
      this.data[model.id] = model;
      this.save();
      return model;
    };

    LocalStore.prototype.find = function(model) {
      return this.data[model.id];
    };

    LocalStore.prototype.findAll = function() {
      return _.values(this.data);
    };

    LocalStore.prototype.destroy = function(model) {
      delete this.data[model.id];
      this.save();
      return model;
    };

    return LocalStore;

  })();

  Backbone.LocalSync = function(method, model, options) {
    var resp, store;
    store = model.localStorage || model.collection.localStorage;
    resp = (function() {
      switch (method) {
        case "read":
          if (model.id) {
            return store.find(model);
          } else {
            return store.findAll();
          }
        case "create":
          return store.create(model);
        case "update":
          return store.update(model);
        case "delete":
          return store.destroy(model);
      }
    })();
    if (resp) {
      return options.success(resp);
    } else {
      return options.error("Record not found");
    }
  };

}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/bootstrap_form_controls"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'form-actions\'>\n  <a class=\'btn btn-primary submit-button\'>\n    <i class=\'icon-ok icon-white\'></i>\n    Save Changes\n  </a>\n  <a class=\'btn reset-button cancel-button\'>\n    <i class=\'icon-remove\'></i>\n    Cancel\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/collection_loader_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'modal\' id=\'progress-model\' stype=\'display: none;\'>\n  <div class=\'progress progress-info progress-striped active\'>\n    <div class=\'bar\' style=\'width: 0%;\'></div>\n  </div>\n  <div class=\'message\'>\n    Initializing...\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/form_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-form-view-wrapper\' id=\'', cid ,'-wrapper\'>\n  <div class=\'form-view-header\'>\n    <div class=\'toolbar-container top\' id=\'', cid ,'-top-toolbar-container\'></div>\n  </div>\n  '); if(legend){ __p.push('\n  <fieldset>\n    <legend>\n      ', legend ,'\n    </legend>\n    <div class=\'form-view-flash-container\'></div>\n    <div class=\'form-view-body\'></div>\n  </fieldset>\n  '); } else { __p.push('\n  <ul class=\'form-view-flash-container\'></ul>\n  <div class=\'form-view-body\'></div>\n  '); } __p.push('\n  <div class=\'form-view-footer\'>\n    <div class=\'toolbar-container bottom\' id=\'', cid ,'-bottom-toolbar-container\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-grid-view-wrapper\'>\n  <div class=\'grid-view-header\'>\n    <div class=\'toolbar-container top\'></div>\n  </div>\n  <div class=\'grid-view-body\'>\n    <table cellpadding=\'0\' cellspacing=\'0\' class=\'luca-ui-grid-view scrollable-table\' width=\'100%\'>\n      <thead class=\'fixed\'></thead>\n      <tbody class=\'scrollable\'></tbody>\n    </table>\n  </div>\n  <div class=\'grid-view-footer\'>\n    <div class=\'toolbar-container bottom\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'empty-text-wrapper\'>\n  <p>\n    ', text ,'\n  </p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/basic"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'', classes ,'\' id=\'', id ,'\' style=\'', style ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'tab-selector-container\' id=\'', cid ,'-tab-selector\'>\n  <ul class=\'nav nav-tabs\' id=\'', cid ,'-tabs-nav\'>\n    '); for(var i = 0; i < components.length; i++ ) { __p.push('\n    '); var component = components[i];__p.push('\n    <li class=\'tab-selector\' data-target=\'', i ,'\'>\n      <a data-target=\'', i ,'\'>\n        ', component.title ,'\n      </a>\n    </li>\n    '); } __p.push('\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/tab_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'tab-content\' id=\'', cid ,'-tab-view-content\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["containers/toolbar_wrapper"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-toolbar-wrapper\' id=\'', id ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/button_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label>&nbsp</label>\n<input class=\'btn ', input_class ,'\' id=\'', input_id ,'\' style=\'', inputStyles ,'\' type=\'', input_type ,'\' value=\'', input_value ,'\' />\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/button_field_link"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a class=\'btn ', input_class ,'\'>\n  '); if(icon_class.length) { __p.push('\n  <i class=\'', icon_class ,'\'></i>\n  '); } __p.push('\n  ', input_value ,'\n</a>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/checkbox_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n  <input name=\'', input_name ,'\' style=\'', inputStyles ,'\' type=\'checkbox\' value=\'', input_value ,'\' />\n</label>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/file_upload_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<input id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\' type=\'file\' />\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/hidden_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<input id=\'', input_id ,'\' name=\'', input_name ,'\' type=\'hidden\' value=\'', input_value ,'\' />\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/select_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<select id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\'></select>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/text_area_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n<textarea class=\'', input_class ,'\' id=\'', input_id ,'\' name=\'', input_name ,'\' style=\'', inputStyles ,'\'></textarea>\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/text_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label class=\'control-label\' for=\'', input_id ,'\'>\n  ', label ,'\n</label>\n'); if( typeof(addOn) !== "undefined" ) { __p.push('\n<span class=\'add-on\'>\n  ', addOn ,'\n</span>\n'); } __p.push('\n<input class=\'', input_class ,'\' id=\'', input_id ,'\' name=\'', input_name ,'\' placeholder=\'', placeHolder ,'\' style=\'', inputStyles ,'\' type=\'text\' />\n'); if(helperText) { __p.push('\n<p class=\'helper-text help-block\'>\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sample/contents"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<p>Sample Contents</p>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sample/welcome"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('welcome.luca\n');}return __p.join('');};
}).call(this);
(function() {
  var __slice = Array.prototype.slice;

  Luca.Observer = (function() {

    function Observer(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, Backbone.Events);
      this.type = this.options.type;
      if (this.options.debugAll) {
        this.bind("event", function() {
          var args, t;
          t = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return console.log("Observed " + _this.type + " " + (t.name || t.id || t.cid), t, _(args).flatten());
        });
      }
    }

    Observer.prototype.relay = function() {
      var args, triggerer;
      triggerer = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.trigger("event", triggerer, args);
      return this.trigger("event:" + args[0], triggerer, args.slice(1));
    };

    return Observer;

  })();

  Luca.Observer.enableObservers = function(options) {
    if (options == null) options = {};
    Luca.enableGlobalObserver = true;
    Luca.ViewObserver = new Luca.Observer(_.extend(options, {
      type: "view"
    }));
    return Luca.CollectionObserver = new Luca.Observer(_.extend(options, {
      type: "collection"
    }));
  };

}).call(this);
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
      var unique,
        _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (this.name != null) this.cid = _.uniqueId(this.name);
      Luca.cache(this.cid, this);
      unique = _(Luca.View.prototype.hooks.concat(this.hooks)).uniq();
      this.setupHooks(unique);
      if (this.autoBindEventHandlers === true) {
        _(this.events).each(function(handler, event) {
          if (_.isString(handler)) return _.bindAll(_this, handler);
        });
      }
      this.trigger("after:initialize", this);
      this.registerCollectionEvents();
      return this.delegateEvents();
    },
    $container: function() {
      return $(this.container);
    },
    setupHooks: function(set) {
      var _this = this;
      set || (set = this.hooks);
      return _(set).each(function(eventId) {
        var fn, parts, prefix;
        parts = eventId.split(':');
        prefix = parts.shift();
        parts = _(parts).map(function(p) {
          return _.capitalize(p);
        });
        fn = prefix + parts.join('');
        return _this.bind(eventId, function() {
          if (_this[fn]) return _this[fn].apply(_this, arguments);
        });
      });
    },
    getCollectionManager: function() {
      var _ref;
      return this.collectionManager || ((_ref = Luca.CollectionManager.get) != null ? _ref.call() : void 0);
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
        if (_.isString(handler)) handler = _this[handler];
        if (!_.isFunction(handler)) throw "invalid collectionEvents configuration";
        try {
          return collection.bind(event, handler);
        } catch (e) {
          console.log("Error Binding To Collection in registerCollectionEvents", _this);
          throw e;
        }
      });
    },
    registerEvent: function(selector, handler) {
      this.events || (this.events = {});
      this.events[selector] = handler;
      return this.delegateEvents();
    }
  });

}).call(this);
(function() {

  Luca.Model = Backbone.Model.extend({
    initialize: function() {
      var attr, dependencies, _ref, _results,
        _this = this;
      Backbone.Model.prototype.initialize(this, arguments);
      if (_.isUndefined(this.computed)) return;
      this._computed = {};
      _ref = this.computed;
      _results = [];
      for (attr in _ref) {
        dependencies = _ref[attr];
        this.on("change:" + attr, function() {
          return _this._computed[attr] = _this[attr].call(_this);
        });
        _results.push(_(dependencies).each(function(dep) {
          _this.on("change:" + dep, function() {
            return _this.trigger("change:" + attr);
          });
          if (_this.has(dep)) return _this.trigger("change:" + attr);
        }));
      }
      return _results;
    },
    get: function(attr) {
      var _ref;
      if ((_ref = this.computed) != null ? _ref.hasOwnProperty(attr) : void 0) {
        return this._computed[attr];
      } else {
        return Backbone.Model.prototype.get.call(this, attr);
      }
    }
  });

}).call(this);
(function() {

  Luca.Collection = (Backbone.QueryCollection || Backbone.Collection).extend({
    initialize: function(models, options) {
      var table,
        _this = this;
      if (models == null) models = [];
      this.options = options;
      _.extend(this, this.options);
      this._reset();
      if (this.cached) {
        this.bootstrap_cache_key = _.isFunction(this.cached) ? this.cached() : this.cached;
      }
      if (this.registerAs || this.registerWith) {
        console.log("This configuration API is deprecated.  use @name and @manager properties instead");
      }
      this.name || (this.name = this.registerAs);
      this.manager || (this.manager = this.registerWith);
      if (this.name && !this.manager) this.manager = Luca.CollectionManager.get();
      if (this.manager) {
        this.name || (this.name = this.cached());
        this.name = _.isFunction(this.name) ? this.name() : this.name;
        if (!(this.private || this.anonymous)) {
          this.bind("after:initialize", function() {
            return _this.register(_this.manager, _this.name, _this);
          });
        }
      }
      if (this.useLocalStorage === true && (window.localStorage != null)) {
        table = this.bootstrap_cache_key || this.name;
        throw "Must specify either a cached or registerAs property to use localStorage";
        this.localStorage = new Luca.LocalStore(table);
      }
      if (_.isArray(this.data) && this.data.length > 0) {
        this.memoryCollection = true;
      }
      if (this.useNormalUrl !== true) this.__wrapUrl();
      Backbone.Collection.prototype.initialize.apply(this, [models, this.options]);
      if (models) {
        this.reset(models, {
          silent: true,
          parse: options != null ? options.parse : void 0
        });
      }
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
      this.base_params || (this.base_params = _(Luca.Collection.baseParams()).clone());
      return _.extend(this.base_params, params);
    },
    register: function(collectionManager, key, collection) {
      if (collectionManager == null) {
        collectionManager = Luca.CollectionManager.get();
      }
      if (key == null) key = "";
      if (!(key.length >= 1)) {
        throw "Can not register with a collection manager without a key";
      }
      if (collectionManager == null) {
        throw "Can not register with a collection manager without a valid collection manager";
      }
      if (_.isString(collectionManager)) {
        collectionManager = Luca.util.nestedValue(collectionManager, window || global);
      }
      if (!collectionManager) throw "Could not register with collection manager";
      if (_.isFunction(collectionManager.add)) {
        return collectionManager.add(key, collection);
      }
      if (_.isObject(collectionManager)) {
        return collectionManager[key] = collection;
      }
    },
    loadFromBootstrap: function() {
      if (!this.bootstrap_cache_key) return;
      this.reset(this.cached_models());
      return this.trigger("bootstrapped", this);
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
    onceLoaded: function(fn, options) {
      var wrapped,
        _this = this;
      if (options == null) {
        options = {
          autoFetch: true
        };
      }
      if (this.length > 0 && !this.fetching) {
        fn.apply(this, [this]);
        return;
      }
      wrapped = function() {
        return fn.apply(_this, [_this]);
      };
      this.bind("reset", function() {
        wrapped();
        return this.unbind("reset", this);
      });
      if (!(this.fetching || !options.autoFetch)) return this.fetch();
    },
    ifLoaded: function(fn, options) {
      var scope,
        _this = this;
      if (options == null) {
        options = {
          scope: this,
          autoFetch: true
        };
      }
      scope = options.scope || this;
      if (this.length > 0 && !this.fetching) fn.apply(scope, [this]);
      this.bind("reset", function(collection) {
        return fn.apply(scope, [collection]);
      });
      if (!(this.fetching === true || !options.autoFetch || this.length > 0)) {
        return this.fetch();
      }
    },
    parse: function(response) {
      var models;
      this.fetching = false;
      this.trigger("after:response", response);
      models = this.root != null ? response[this.root] : response;
      if (this.bootstrap_cache_key) {
        Luca.Collection.cache(this.bootstrap_cache_key, models);
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
(function() {

  Luca.core.Field = Luca.View.extend({
    className: 'luca-ui-text-field luca-ui-field',
    isField: true,
    template: 'fields/text_field',
    labelAlign: 'top',
    hooks: ["before:validation", "after:validation", "on:change"],
    statuses: ["warning", "error", "success"],
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      Luca.View.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.helperText || (this.helperText = "");
      if (this.required && !((_ref = this.label) != null ? _ref.match(/^\*/) : void 0)) {
        this.label || (this.label = "*" + this.label);
      }
      this.inputStyles || (this.inputStyles = "");
      if (this.disabled) this.disable();
      this.updateState(this.state);
      return this.placeHolder || (this.placeHolder = "");
    },
    beforeRender: function() {
      if (Luca.enableBootstrap) this.$el.addClass('control-group');
      if (this.required) this.$el.addClass('required');
      this.$el.html(Luca.templates[this.template](this));
      return this.input = $('input', this.el);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    disable: function() {
      return $("input", this.el).attr('disabled', true);
    },
    enable: function() {
      return $("input", this.el).attr('disabled', false);
    },
    getValue: function() {
      return this.input.attr('value');
    },
    render: function() {
      return $(this.container).append(this.$el);
    },
    setValue: function(value) {
      return this.input.attr('value', value);
    },
    updateState: function(state) {
      var _this = this;
      return _(this.statuses).each(function(cls) {
        _this.$el.removeClass(cls);
        return _this.$el.addClass(state);
      });
    }
  });

}).call(this);
(function() {

  Luca.core.Container = Luca.View.extend({
    className: 'luca-ui-container',
    componentClass: 'luca-ui-panel',
    isContainer: true,
    hooks: ["before:components", "before:render:components", "before:layout", "after:components", "after:layout", "first:activation"],
    rendered: false,
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.setupHooks(Luca.core.Container.prototype.hooks);
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      this.debug("container before render");
      this.doLayout();
      return this.doComponents();
    },
    doLayout: function() {
      this.debug("container do layout");
      this.trigger("before:layout", this);
      this.prepareLayout();
      return this.trigger("after:layout", this);
    },
    doComponents: function() {
      this.debug("container do components");
      this.trigger("before:components", this, this.components);
      this.prepareComponents();
      this.createComponents();
      this.trigger("before:render:components", this, this.components);
      this.renderComponents();
      return this.trigger("after:components", this, this.components);
    },
    applyPanelConfig: function(panel, panelIndex) {
      var config, style_declarations;
      style_declarations = [];
      if (panel.height) {
        style_declarations.push("height: " + (_.isNumber(panel.height) ? panel.height + 'px' : panel.height));
      }
      if (panel.width) {
        style_declarations.push("width: " + (_.isNumber(panel.width) ? panel.width + 'px' : panel.width));
      }
      if (panel.float) style_declarations.push("float: " + panel.float);
      return config = {
        classes: (panel != null ? panel.classes : void 0) || this.componentClass,
        id: "" + this.cid + "-" + panelIndex,
        style: style_declarations.join(';')
      };
    },
    prepareLayout: function() {
      var _this = this;
      this.debug("container prepare layout");
      this.componentContainers = _(this.components).map(function(component, index) {
        return _this.applyPanelConfig.apply(_this, [component, index]);
      });
      if (this.appendContainers) {
        return _(this.componentContainers).each(function(container) {
          if (container.appended == null) {
            _this.$el.append(Luca.templates["containers/basic"](container));
          }
          return container.appended = true;
        });
      }
    },
    prepareComponents: function() {
      var _this = this;
      this.debug("container prepare components");
      return this.components = _(this.components).map(function(object, index) {
        var panel;
        panel = _this.componentContainers[index];
        object.container = _this.appendContainers ? "#" + panel.id : _this.el;
        return object;
      });
    },
    createComponents: function() {
      var map,
        _this = this;
      if (this.componentsCreated === true) return;
      map = this.componentIndex = {
        name_index: {},
        cid_index: {}
      };
      this.components = _(this.components).map(function(object, index) {
        var component;
        component = _.isObject(object) && object.render && object.trigger ? object : (object.ctype || (object.ctype = Luca.defaultComponentType || "template"), Luca.util.lazyComponent(object));
        if (!component.container && component.options.container) {
          component.container = component.options.container;
        }
        if (map && (component.cid != null)) map.cid_index[component.cid] = index;
        if (map && (component.name != null)) {
          map.name_index[component.name] = index;
        }
        return component;
      });
      this.componentsCreated = true;
      return map;
    },
    renderComponents: function(debugMode) {
      var _this = this;
      this.debugMode = debugMode != null ? debugMode : "";
      this.debug("container render components");
      return _(this.components).each(function(component) {
        component.getParent = function() {
          return _this;
        };
        $(component.container).append($(component.el));
        try {
          return component.render();
        } catch (e) {
          console.log("Error Rendering Component " + (component.name || component.cid), component);
          console.log(e.message);
          return console.log(e.stack);
        }
      });
    },
    firstActivation: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        var activator, _ref;
        activator = _this;
        if ((component != null ? component.previously_activated : void 0) !== true) {
          if (component != null) {
            if ((_ref = component.trigger) != null) {
              _ref.apply(component, ["first:activation", [component, activator]]);
            }
          }
          return component.previously_activated = true;
        }
      });
    },
    select: function(attribute, value, deep) {
      var components;
      if (deep == null) deep = false;
      components = _(this.components).map(function(component) {
        var matches, test;
        matches = [];
        test = component[attribute];
        if (test === value) matches.push(component);
        if (deep === true && component.isContainer === true) {
          matches.push(component.select(attribute, value, true));
        }
        return _.compact(matches);
      });
      return _.flatten(components);
    },
    findComponentByName: function(name, deep) {
      if (deep == null) deep = false;
      return this.findComponent(name, "name_index", deep);
    },
    findComponentById: function(id, deep) {
      if (deep == null) deep = false;
      return this.findComponent(id, "cid_index", deep);
    },
    findComponent: function(needle, haystack, deep) {
      var component, position, sub_container, _ref, _ref2;
      if (haystack == null) haystack = "name";
      if (deep == null) deep = false;
      if (this.componentsCreated !== true) this.createComponents();
      position = (_ref = this.componentIndex) != null ? _ref[haystack][needle] : void 0;
      component = (_ref2 = this.components) != null ? _ref2[position] : void 0;
      if (component) return component;
      if (deep === true) {
        sub_container = _(this.components).detect(function(component) {
          return component != null ? typeof component.findComponent === "function" ? component.findComponent(needle, haystack, true) : void 0 : void 0;
        });
        return sub_container != null ? typeof sub_container.findComponent === "function" ? sub_container.findComponent(needle, haystack, true) : void 0 : void 0;
      }
    },
    eachComponent: function(fn, deep) {
      var _this = this;
      if (deep == null) deep = true;
      return _(this.components).each(function(component) {
        var _ref;
        fn.apply(component, [component]);
        if (deep) {
          return component != null ? (_ref = component.eachComponent) != null ? _ref.apply(component, [fn, deep]) : void 0 : void 0;
        }
      });
    },
    indexOf: function(name) {
      var names;
      names = _(this.components).pluck('name');
      return _(names).indexOf(name);
    },
    activeComponent: function() {
      if (!this.activeItem) return this;
      return this.components[this.activeItem];
    },
    componentElements: function() {
      return $("." + this.componentClass, this.el);
    },
    getComponent: function(needle) {
      return this.components[needle];
    },
    rootComponent: function() {
      return !(this.getParent != null);
    },
    getRootComponent: function() {
      if (this.rootComponent()) {
        return this;
      } else {
        return this.getParent().getRootComponent();
      }
    }
  });

  Luca.register("container", "Luca.core.Container");

}).call(this);
(function() {
  var instances;

  instances = [];

  Luca.CollectionManager = (function() {

    CollectionManager.prototype.__collections = {};

    function CollectionManager(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Backbone.Events);
      instances.push(this);
      this.state = new Backbone.Model;
      if (this.initialCollections) {
        this.state.set({
          loaded_collections_count: 0,
          collections_count: this.initialCollections.length
        });
        this.state.bind("change:loaded_collections_count", this.collectionCountDidChange);
        if (this.useProgressLoader) {
          this.loaderView || (this.loaderView = new Luca.components.CollectionLoaderView({
            manager: this,
            name: "collection_loader_view"
          }));
        }
        this.loadInitialCollections();
      }
      this;
    }

    CollectionManager.prototype.add = function(key, collection) {
      var _base;
      return (_base = this.currentScope())[key] || (_base[key] = collection);
    };

    CollectionManager.prototype.allCollections = function() {
      return _(this.currentScope()).values();
    };

    CollectionManager.prototype.create = function(key, collectionOptions, initialModels) {
      var CollectionClass, collection;
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      CollectionClass = collectionOptions.base;
      CollectionClass || (CollectionClass = this.guessCollectionClass(key));
      if (collectionOptions.private) collectionOptions.name = "";
      collection = new CollectionClass(initialModels, collectionOptions);
      this.add(key, collection);
      return collection;
    };

    CollectionManager.prototype.collectionNamespace = Luca.Collection.namespace;

    CollectionManager.prototype.currentScope = function() {
      var current_scope, _base;
      if (current_scope = this.getScope()) {
        return (_base = this.__collections)[current_scope] || (_base[current_scope] = {});
      } else {
        return this.__collections;
      }
    };

    CollectionManager.prototype.each = function(fn) {
      return _(this.all()).each(fn);
    };

    CollectionManager.prototype.get = function(key) {
      return this.currentScope()[key];
    };

    CollectionManager.prototype.getScope = function() {
      return;
    };

    CollectionManager.prototype.getOrCreate = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.get(key) || this.create(key, collectionOptions, initialModels, false);
    };

    CollectionManager.prototype.guessCollectionClass = function(key) {
      var classified, guess;
      classified = _(key).chain().capitalize().camelize().value();
      guess = (this.collectionNamespace || (window || global))[classified];
      guess || (guess = (this.collectionNamespace || (window || global))["" + classified + "Collection"]);
      return guess;
    };

    CollectionManager.prototype.loadInitialCollections = function() {
      var collectionDidLoad,
        _this = this;
      collectionDidLoad = function(collection) {
        collection.unbind("reset");
        return _this.trigger("collection_loaded", collection.name);
      };
      return _(this.initialCollections).each(function(name) {
        var collection;
        collection = _this.getOrCreate(name);
        collection.bind("reset", function() {
          return collectionDidLoad(collection);
        });
        return collection.fetch();
      });
    };

    CollectionManager.prototype.collectionCountDidChange = function() {
      if (this.totalCollectionsCount() === this.loadedCollectionsCount()) {
        return this.trigger("all_collections_loaded");
      }
    };

    CollectionManager.prototype.totalCollectionsCount = function() {
      return this.state.get("collections_count");
    };

    CollectionManager.prototype.loadedCollectionsCount = function() {
      return this.state.get("loaded_collections_count");
    };

    CollectionManager.prototype.private = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.create(key, collectionOptions, initialModels, true);
    };

    return CollectionManager;

  })();

  Luca.CollectionManager.destroyAll = function() {
    return instances = [];
  };

  Luca.CollectionManager.instances = function() {
    return instances;
  };

  Luca.CollectionManager.get = function() {
    return _(instances).last();
  };

}).call(this);
(function() {

  Luca.SocketManager = (function() {

    function SocketManager(options) {
      this.options = options != null ? options : {};
      _.extend(Backbone.Events);
      this.loadTransport();
    }

    SocketManager.prototype.connect = function() {
      switch (this.options.provider) {
        case "socket.io":
          return this.socket = io.connect(this.options.socket_host);
        case "faye.js":
          return this.socket = new Faye.Client(this.options.socket_host);
      }
    };

    SocketManager.prototype.transportLoaded = function() {
      return this.connect();
    };

    SocketManager.prototype.transport_script = function() {
      switch (this.options.provider) {
        case "socket.io":
          return "" + this.options.transport_host + "/socket.io/socket.io.js";
        case "faye.js":
          return "" + this.options.transport_host + "/faye.js";
      }
    };

    SocketManager.prototype.loadTransport = function() {
      var script,
        _this = this;
      script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", this.transport_script());
      script.onload = this.transportLoaded;
      if (Luca.util.isIE()) {
        script.onreadystatechange = function() {
          if (script.readyState === "loaded") return _this.transportLoaded();
        };
      }
      return document.getElementsByTagName('head')[0].appendChild(script);
    };

    return SocketManager;

  })();

}).call(this);
(function() {

  Luca.containers.SplitView = Luca.core.Container.extend({
    layout: '100',
    componentType: 'split_view',
    containerTemplate: 'containers/basic',
    className: 'luca-ui-split-view',
    componentClass: 'luca-ui-panel'
  });

  Luca.register('split_view', "Luca.containers.SplitView");

}).call(this);
(function() {

  Luca.containers.ColumnView = Luca.core.Container.extend({
    componentType: 'column_view',
    className: 'luca-ui-column-view',
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setColumnWidths();
    },
    componentClass: 'luca-ui-column',
    containerTemplate: "containers/basic",
    appendContainers: true,
    autoColumnWidths: function() {
      var widths,
        _this = this;
      widths = [];
      _(this.components.length).times(function() {
        return widths.push(parseInt(100 / _this.components.length));
      });
      return widths;
    },
    setColumnWidths: function() {
      this.columnWidths = this.layout != null ? _(this.layout.split('/')).map(function(v) {
        return parseInt(v);
      }) : this.autoColumnWidths();
      return this.columnWidths = _(this.columnWidths).map(function(val) {
        return "" + val + "%";
      });
    },
    beforeComponents: function() {
      this.debug("column_view before components");
      return _(this.components).each(function(component) {
        return component.ctype || (component.ctype = "panel_view");
      });
    },
    beforeLayout: function() {
      var _ref,
        _this = this;
      this.debug("column_view before layout");
      _(this.columnWidths).each(function(width, index) {
        _this.components[index].float = "left";
        return _this.components[index].width = width;
      });
      return (_ref = Luca.core.Container.prototype.beforeLayout) != null ? _ref.apply(this, arguments) : void 0;
    }
  });

  Luca.register('column_view', "Luca.containers.ColumnView");

}).call(this);
(function() {

  Luca.containers.CardView = Luca.core.Container.extend({
    componentType: 'card_view',
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    initialize: function(options) {
      this.options = options;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setupHooks(this.hooks);
    },
    componentClass: 'luca-ui-card',
    beforeLayout: function() {
      var _this = this;
      return this.cards = _(this.components).map(function(card, cardIndex) {
        return {
          classes: _this.componentClass,
          style: "display:" + (cardIndex === _this.activeCard ? 'block' : 'none'),
          id: "" + _this.cid + "-" + cardIndex
        };
      });
    },
    prepareLayout: function() {
      var _this = this;
      return this.card_containers = _(this.cards).map(function(card, index) {
        _this.$el.append(Luca.templates["containers/basic"](card));
        return $("#" + card.id);
      });
    },
    prepareComponents: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        var card;
        card = _this.cards[index];
        object.container = "#" + card.id;
        return object;
      });
    },
    activeComponent: function() {
      return this.getComponent(this.activeCard);
    },
    cycle: function() {
      var nextIndex;
      nextIndex = this.activeCard < this.components.length - 1 ? this.activeCard + 1 : 0;
      return this.activate(nextIndex);
    },
    find: function(name) {
      return this.findComponentByName(name, true);
    },
    firstActivation: function() {
      return this.activeComponent().trigger("first:activation", this, this.activeComponent());
    },
    activate: function(index, silent, callback) {
      var current, previous, _ref, _ref2, _ref3, _ref4;
      if (silent == null) silent = false;
      if (_.isFunction(silent)) {
        silent = false;
        callback = silent;
      }
      if (index === this.activeCard) return;
      previous = this.activeComponent();
      current = this.getComponent(index);
      if (!current) {
        index = this.indexOf(index);
        current = this.getComponent(index);
      }
      if (!current) return;
      if (!silent) {
        this.trigger("before:card:switch", previous, current);
        if (previous != null) {
          if ((_ref = previous.trigger) != null) {
            _ref.apply(previous, ["before:deactivation", this, previous, current]);
          }
        }
        if (current != null) {
          if ((_ref2 = current.trigger) != null) {
            _ref2.apply(previous, ["before:activation", this, previous, current]);
          }
        }
      }
      _(this.card_containers).each(function(container) {
        return container.hide();
      });
      if (!current.previously_activated) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      $(current.container).show();
      this.activeCard = index;
      if (!silent) {
        this.trigger("after:card:switch", previous, current);
        if ((_ref3 = previous.trigger) != null) {
          _ref3.apply(previous, ["deactivation", this, previous, current]);
        }
        if ((_ref4 = current.trigger) != null) {
          _ref4.apply(current, ["activation", this, previous, current]);
        }
      }
      if (_.isFunction(callback)) {
        return callback.apply(this, [this, previous, current]);
      }
    }
  });

  Luca.register('card_view', "Luca.containers.CardView");

}).call(this);
(function() {

  Luca.containers.ModalView = Luca.core.Container.extend({
    componentType: 'modal_view',
    className: 'luca-ui-modal-view',
    components: [],
    renderOnInitialize: true,
    showOnRender: false,
    hooks: ['before:show', 'before:hide'],
    defaultModalOptions: {
      minWidth: 375,
      maxWidth: 375,
      minHeight: 550,
      maxHeight: 550,
      opacity: 80,
      onOpen: function(modal) {
        this.onOpen.apply(this);
        return this.onModalOpen.apply(modal, [modal, this]);
      },
      onClose: function(modal) {
        this.onClose.apply(this);
        return this.onModalClose.apply(modal, [modal, this]);
      }
    },
    modalOptions: {},
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.setupHooks(this.hooks);
      _(this.defaultModalOptions).each(function(value, setting) {
        var _base;
        return (_base = _this.modalOptions)[setting] || (_base[setting] = value);
      });
      this.modalOptions.onOpen = _.bind(this.modalOptions.onOpen, this);
      return this.modalOptions.onClose = _.bind(this.modalOptions.onClose, this);
    },
    onOpen: function() {
      return true;
    },
    onClose: function() {
      return true;
    },
    getModal: function() {
      return this.modal;
    },
    onModalOpen: function(modal, view) {
      view.modal = modal;
      modal.overlay.show();
      modal.container.show();
      return modal.data.show();
    },
    onModalClose: function(modal, view) {
      return $.modal.close();
    },
    prepareLayout: function() {
      return $('body').append(this.$el);
    },
    prepareComponents: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        object.container = _this.el;
        return object;
      });
    },
    afterInitialize: function() {
      this.$el.hide();
      if (this.renderOnInitialize) return this.render();
    },
    afterRender: function() {
      if (this.showOnRender) return this.show();
    },
    wrapper: function() {
      return $(this.$el.parent());
    },
    show: function() {
      this.trigger("before:show", this);
      return this.$el.modal(this.modalOptions);
    },
    hide: function() {
      return this.trigger("before:hide", this);
    }
  });

  Luca.register("modal_view", "Luca.containers.ModalView");

}).call(this);
(function() {

  Luca.containers.PanelView = Luca.core.Container.extend({
    className: 'luca-ui-panel',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    afterLayout: function() {
      var contents;
      if (this.template) {
        contents = (Luca.templates || JST)[this.template](this);
        return this.$el.html(contents);
      }
    },
    render: function() {
      return $(this.container).append(this.$el);
    },
    afterRender: function() {
      var _ref,
        _this = this;
      if ((_ref = Luca.core.Container.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.css) {
        return _(this.css).each(function(value, property) {
          return _this.$el.css(property, value);
        });
      }
    }
  });

}).call(this);
(function() {

  Luca.containers.TabView = Luca.containers.CardView.extend({
    events: {
      "click ul.nav-tabs li": "select"
    },
    hooks: ["before:select", "after:select"],
    componentType: 'tab_view',
    className: 'luca-ui-tab-view tabbable',
    tab_position: 'top',
    tabVerticalOffset: '50px',
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "select", "highlightSelectedTab");
      this.setupHooks(this.hooks);
      return this.bind("after:card:switch", this.highlightSelectedTab);
    },
    activeTabSelector: function() {
      return this.tabSelectors().eq(this.activeCard);
    },
    prepareLayout: function() {
      var _this = this;
      return this.card_containers = _(this.cards).map(function(card, index) {
        _this.$('.tab-content').append(Luca.templates["containers/basic"](card));
        return $("#" + card.id);
      });
    },
    beforeLayout: function() {
      this.$el.addClass("tabs-" + this.tab_position);
      if (this.tab_position === "below") {
        this.$el.append(Luca.templates["containers/tab_view"](this));
        this.$el.append(Luca.templates["containers/tab_selector_container"](this));
      } else {
        this.$el.append(Luca.templates["containers/tab_selector_container"](this));
        this.$el.append(Luca.templates["containers/tab_view"](this));
      }
      return Luca.containers.CardView.prototype.beforeLayout.apply(this, arguments);
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.activeTabSelector().addClass('active');
      if (Luca.enableBootstrap && this.tab_position === "left" || this.tab_position === "right") {
        this.$el.addClass('grid-12');
        this.tabContainerWrapper().addClass('grid-3');
        this.tabContentWrapper().addClass('grid-9');
        if (this.tabVerticalOffset) {
          return this.tabContainerWrapper().css('padding-top', this.tabVerticalOffset);
        }
      }
    },
    highlightSelectedTab: function() {
      this.tabSelectors().removeClass('active');
      return this.activeTabSelector().addClass('active');
    },
    select: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:select", this);
      this.activate(my.data('target'));
      return this.trigger("after:select", this);
    },
    tabContentWrapper: function() {
      return $("#" + this.cid + "-tab-view-content");
    },
    tabContainerWrapper: function() {
      return $("#" + this.cid + "-tabs-selector");
    },
    tabContainer: function() {
      return $("ul#" + this.cid + "-tabs-nav");
    },
    tabSelectors: function() {
      return $('li.tab-selector', this.tabContainer());
    }
  });

}).call(this);
(function() {

  Luca.containers.Viewport = Luca.containers.CardView.extend({
    activeItem: 0,
    className: 'luca-ui-viewport',
    fullscreen: true,
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      if (this.fullscreen) return $('html,body').addClass('luca-ui-fullscreen');
    },
    render: function() {
      console.log("Rendering Viewport");
      return this.$el.addClass('luca-ui-viewport');
    }
  });

}).call(this);
(function() {



}).call(this);
