(function() {
  var UnderscoreExtensions,
    __slice = Array.prototype.slice;

  (window || global).Luca = function() {
    var args, definition, fallback, inheritsFrom, payload, result;
    payload = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (_.isString(payload) && (result = Luca.cache(payload))) return result;
    if (_.isString(payload) && (result = Luca.find(payload))) return result;
    if (_.isObject(payload) && (payload.ctype != null)) {
      return Luca.util.lazyComponent(payload);
    }
    if (_.isObject(payload) && payload.defines && payload["extends"]) {
      definition = payload.defines;
      inheritsFrom = payload["extends"];
    }
    if (_.isFunction(fallback = _(args).last())) return fallback();
  };

  _.extend(Luca, {
    VERSION: "0.8.9",
    core: {},
    containers: {},
    components: {},
    modules: {},
    util: {},
    fields: {},
    registry: {}
  });

  _.extend(Luca, Backbone.Events);

  Luca.developmentMode = false;

  Luca.enableGlobalObserver = false;

  Luca.enableBootstrap = true;

  Luca.keys = {
    ENTER: 13,
    ESCAPE: 27,
    KEYLEFT: 37,
    KEYUP: 38,
    KEYRIGHT: 39,
    KEYDOWN: 40,
    SPACEBAR: 32,
    FORWARDSLASH: 191
  };

  Luca.keyMap = _(Luca.keys).inject(function(memo, value, symbol) {
    memo[value] = symbol.toLowerCase();
    return memo;
  }, {});

  Luca.find = function() {
    return;
  };

  Luca.supportsEvents = Luca.supportsBackboneEvents = function(obj) {
    return Luca.isComponent(obj) || (_.isFunction(obj != null ? obj.trigger : void 0) || _.isFunction(obj != null ? obj.bind : void 0));
  };

  Luca.isComponent = function(obj) {
    return Luca.isBackboneModel(obj) || Luca.isBackboneView(obj) || Luca.isBackboneCollection(obj);
  };

  Luca.isBackboneModel = function(obj) {
    return _.isFunction(obj != null ? obj.set : void 0) && _.isFunction(obj != null ? obj.get : void 0) && _.isObject(obj != null ? obj.attributes : void 0);
  };

  Luca.isBackboneView = function(obj) {
    return _.isFunction(obj != null ? obj.render : void 0) && !_.isUndefined(obj != null ? obj.el : void 0);
  };

  Luca.isBackboneCollection = function(obj) {
    return _.isFunction(obj != null ? obj.fetch : void 0) && _.isFunction(obj != null ? obj.reset : void 0);
  };

  Luca.template = function(template_name, variables) {
    var jst, luca, needle, template, _ref;
    window.JST || (window.JST = {});
    luca = (_ref = Luca.templates) != null ? _ref[template_name] : void 0;
    jst = typeof JST !== "undefined" && JST !== null ? JST[template_name] : void 0;
    if (!((luca != null) || (jst != null))) {
      needle = new RegExp("" + template_name + "$");
      luca = _(Luca.templates).detect(function(fn, template_id) {
        return needle.exec(template_id);
      });
      jst = _(JST).detect(function(fn, template_id) {
        return needle.exec(template_id);
      });
    }
    if (!(luca || jst)) throw "Could not find template with " + template_name;
    template = luca || jst;
    if (variables != null) return template(variables);
    return template;
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

  UnderscoreExtensions = {
    module: function(base, module) {
      _.extend(base, module);
      if (base.included && _(base.included).isFunction()) {
        return base.included.apply(base);
      }
    },
    "delete": function(object, key) {
      var value;
      value = object[key];
      delete object[key];
      return value;
    },
    idle: function(code, delay) {
      var handle;
      if (delay == null) delay = 1000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleShort: function(code, delay) {
      var handle;
      if (delay == null) delay = 100;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleMedium: function(code, delay) {
      var handle;
      if (delay == null) delay = 2000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    },
    idleLong: function(code, delay) {
      var handle;
      if (delay == null) delay = 5000;
      if (window.DISABLE_IDLE) delay = 0;
      handle = void 0;
      return function() {
        if (handle) window.clearTimeout(handle);
        return handle = window.setTimeout(_.bind(code, this), delay);
      };
    }
  };

  _.mixin(UnderscoreExtensions);

}).call(this);
(function() {
  var currentNamespace;

  Luca.util.resolve = function(accessor, source_object) {
    source_object || (source_object = window || global);
    return _(accessor.split(/\./)).inject(function(obj, key) {
      return obj = obj != null ? obj[key] : void 0;
    }, source_object);
  };

  Luca.util.nestedValue = Luca.util.resolve;

  Luca.util.classify = function(string) {
    if (string == null) string = "";
    return _.string.camelize(_.string.capitalize(string));
  };

  Luca.util.hook = function(eventId) {
    var fn, parts, prefix;
    if (eventId == null) eventId = "";
    parts = eventId.split(':');
    prefix = parts.shift();
    parts = _(parts).map(function(p) {
      return _.string.capitalize(p);
    });
    return fn = prefix + parts.join('');
  };

  Luca.util.isIE = function() {
    try {
      Object.defineProperty({}, '', {});
      return false;
    } catch (e) {
      return true;
    }
  };

  currentNamespace = window || global;

  Luca.util.namespace = function(namespace) {
    if (namespace == null) return currentNamespace;
    currentNamespace = _.isString(namespace) ? Luca.util.resolve(namespace, window || global) : namespace;
    if (currentNamespace != null) return currentNamespace;
    return currentNamespace = eval("(window||global)." + namespace + " = {}");
  };

  Luca.util.lazyComponent = function(config) {
    var componentClass, constructor, ctype;
    if (_.isObject(config)) ctype = config.ctype || config.type;
    if (_.isString(config)) ctype = config;
    componentClass = Luca.registry.lookup(ctype);
    if (!componentClass) {
      throw "Invalid Component Type: " + ctype + ".  Did you forget to register it?";
    }
    constructor = eval(componentClass);
    return new constructor(config);
  };

  Luca.util.selectProperties = function(iterator, object, context) {
    var values;
    values = _(object).values();
    return _(values).select(iterator);
  };

}).call(this);
(function() {
  var component_cache, registry;

  registry = {
    classes: {},
    namespaces: ['Luca.containers', 'Luca.components']
  };

  component_cache = {
    cid_index: {},
    name_index: {}
  };

  Luca.defaultComponentType = 'view';

  Luca.register = function(component, prototypeName) {
    Luca.trigger("component:registered", component, prototypeName);
    return registry.classes[component] = prototypeName;
  };

  Luca.development_mode_register = function(component, prototypeName) {
    var existing, liveInstances, prototypeDefinition;
    existing = registry.classes[component];
    if (Luca.enableDevelopmentTools === true && (existing != null)) {
      prototypeDefinition = Luca.util.resolve(existing, window);
      liveInstances = Luca.registry.findInstancesByClassName(prototypeName);
      _(liveInstances).each(function(instance) {
        var _ref;
        return instance != null ? (_ref = instance.refreshCode) != null ? _ref.call(instance, prototypeDefinition) : void 0 : void 0;
      });
    }
    return Luca.register(component, prototypeName);
  };

  Luca.registry.addNamespace = function(identifier) {
    registry.namespaces.push(identifier);
    return registry.namespaces = _(registry.namespaces).uniq();
  };

  Luca.registry.namespaces = function(resolve) {
    if (resolve == null) resolve = true;
    return _(registry.namespaces).map(function(namespace) {
      if (resolve) {
        return Luca.util.resolve(namespace);
      } else {
        return namespace;
      }
    });
  };

  Luca.registry.lookup = function(ctype) {
    var c, className, fullPath, parents, _ref;
    c = registry.classes[ctype];
    if (c != null) return c;
    className = Luca.util.classify(ctype);
    parents = Luca.registry.namespaces();
    return fullPath = (_ref = _(parents).chain().map(function(parent) {
      return parent[className];
    }).compact().value()) != null ? _ref[0] : void 0;
  };

  Luca.registry.findInstancesByClassName = function(className) {
    var instances;
    instances = _(component_cache.cid_index).values();
    return _(instances).select(function(instance) {
      var _ref;
      return instance.displayName === className || (typeof instance._superClass === "function" ? (_ref = instance._superClass()) != null ? _ref.displayName : void 0 : void 0) === className;
    });
  };

  Luca.registry.classes = function(toString) {
    if (toString == null) toString = false;
    return _(registry.classes).map(function(className, ctype) {
      if (toString) {
        return className;
      } else {
        return {
          className: className,
          ctype: ctype
        };
      }
    });
  };

  Luca.cache = function(needle, component) {
    var lookup_id;
    if (component != null) component_cache.cid_index[needle] = component;
    component = component_cache.cid_index[needle];
    if ((component != null ? component.component_name : void 0) != null) {
      Luca.trigger("component:created:" + component.component_name, component);
      component_cache.name_index[component.component_name] = component.cid;
    } else if ((component != null ? component.name : void 0) != null) {
      Luca.trigger("component:created:" + component.component_name, component);
      component_cache.name_index[component.name] = component.cid;
    }
    if (component != null) return component;
    lookup_id = component_cache.name_index[needle];
    return component_cache.cid_index[lookup_id];
  };

}).call(this);
(function() {
  var DeferredBindingProxy, DefineProxy;

  Luca.define = function(componentName) {
    return new DefineProxy(componentName);
  };

  Luca.component = Luca.define;

  DefineProxy = (function() {

    function DefineProxy(componentName) {
      var parts;
      this.namespace = Luca.util.namespace();
      this.componentId = this.componentName = componentName;
      if (componentName.match(/\./)) {
        this.namespaced = true;
        parts = componentName.split('.');
        this.componentId = parts.pop();
        this.namespace = parts.join('.');
        Luca.registry.addNamespace(parts.join('.'));
      }
    }

    DefineProxy.prototype["in"] = function(namespace) {
      this.namespace = namespace;
      return this;
    };

    DefineProxy.prototype.from = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    DefineProxy.prototype["extends"] = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    DefineProxy.prototype.extend = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    DefineProxy.prototype.enhance = function(properties) {
      if (properties != null) return this["with"](properties);
      return this;
    };

    DefineProxy.prototype["with"] = function(properties) {
      var at;
      at = this.namespaced ? Luca.util.resolve(this.namespace, window || global) : window || global;
      if (this.namespaced && !(at != null)) {
        eval("(window||global)." + this.namespace + " = {}");
        at = Luca.util.resolve(this.namespace, window || global);
      }
      at[this.componentId] = Luca.extend(this.superClassName, this.componentName, properties);
      Luca.register(_.string.underscored(this.componentId), this.componentName);
      return at[this.componentId];
    };

    return DefineProxy;

  })();

  Luca.extend = function(superClassName, childName, properties) {
    var superClass;
    if (properties == null) properties = {};
    superClass = Luca.util.resolve(superClassName, window || global);
    if (!_.isFunction(superClass != null ? superClass.extend : void 0)) {
      throw "" + superClassName + " is not a valid component to extend from";
    }
    properties.displayName = childName;
    properties._superClass = function() {
      superClass.displayName || (superClass.displayName = superClassName);
      return superClass;
    };
    properties._super = function(method, context, args) {
      var _ref;
      return (_ref = this._superClass().prototype[method]) != null ? _ref.apply(context, args) : void 0;
    };
    return superClass.extend(properties);
  };

  _.mixin({
    def: Luca.define
  });

  DeferredBindingProxy = (function() {

    function DeferredBindingProxy(object, operation, wrapWithUnderscore) {
      var fn,
        _this = this;
      this.object = object;
      if (wrapWithUnderscore == null) wrapWithUnderscore = true;
      if (_.isFunction(operation)) {
        fn = operation;
      } else if (_.isString(operation) && _.isFunction(this.object[operation])) {
        fn = this.object[operation];
      }
      if (!_.isFunction(fn)) {
        throw "Must pass a function or a string representing one";
      }
      if (wrapWithUnderscore === true) {
        this.fn = function() {
          return _.defer(fn);
        };
      } else {
        this.fn = fn;
      }
      this;
    }

    DeferredBindingProxy.prototype.until = function(watch, trigger) {
      if ((watch != null) && !(trigger != null)) {
        trigger = watch;
        watch = this.object;
      }
      watch.once(trigger, this.fn);
      return this.object;
    };

    return DeferredBindingProxy;

  })();

  Luca.Events = {
    defer: function(operation, wrapWithUnderscore) {
      if (wrapWithUnderscore == null) wrapWithUnderscore = true;
      return new DeferredBindingProxy(this, operation, wrapWithUnderscore);
    },
    once: function(trigger, callback, context) {
      var onceFn;
      context || (context = this);
      onceFn = function() {
        callback.apply(context, arguments);
        return this.unbind(trigger, onceFn);
      };
      return this.bind(trigger, onceFn);
    }
  };

}).call(this);
(function() {
  var customizeRender;

  _.def("Luca.View")["extends"]("Backbone.View")["with"]({
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
        if (Luca.developmentMode === true || this.observeEvents === true) {
          Luca.ViewObserver || (Luca.ViewObserver = new Luca.Observer({
            type: "view"
          }));
          Luca.ViewObserver.relay(this, arguments);
        }
      }
      return Backbone.View.prototype.trigger.apply(this, arguments);
    },
    hooks: ["after:initialize", "before:render", "after:render", "first:activation", "activation", "deactivation"],
    initialize: function(options) {
      var template, unique;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (this.name != null) this.cid = _.uniqueId(this.name);
      Luca.cache(this.cid, this);
      unique = _(Luca.View.prototype.hooks.concat(this.hooks)).uniq();
      this.setupHooks(unique);
      if (this.autoBindEventHandlers === true) this.bindAllEventHandlers();
      this.trigger("after:initialize", this);
      this.registerCollectionEvents();
      if (template = this.bodyTemplate) {
        this.$el.empty();
        this.$html(Luca.template(template, this));
      }
      return this.delegateEvents();
    },
    $wrap: function(wrapper) {
      if (!wrapper.match(/[<>]/)) {
        wrapper = this.make("div", {
          "class": wrapper
        });
      }
      return this.$el.wrap(wrapper);
    },
    $template: function(template, variables) {
      if (variables == null) variables = {};
      return this.$el.html(Luca.template(template, variables));
    },
    $html: function(content) {
      return this.$el.html(content);
    },
    $append: function(content) {
      return this.$el.append(content);
    },
    $attach: function() {
      return this.$container().append(this.el);
    },
    $container: function() {
      return $(this.container);
    },
    setupHooks: function(set) {
      var _this = this;
      set || (set = this.hooks);
      return _(set).each(function(eventId) {
        var callback, fn;
        fn = Luca.util.hook(eventId);
        callback = function() {
          var _ref;
          return (_ref = _this[fn]) != null ? _ref.apply(_this, arguments) : void 0;
        };
        if (eventId != null ? eventId.match(/once:/) : void 0) {
          callback = _.once(callback);
        }
        return _this.bind(eventId, callback);
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
    },
    bindAllEventHandlers: function() {
      var _this = this;
      return _(this.events).each(function(handler, event) {
        if (_.isString(handler)) return _.bindAll(_this, handler);
      });
    },
    definitionClass: function() {
      var _ref;
      return (_ref = Luca.util.resolve(this.displayName, window)) != null ? _ref.prototype : void 0;
    },
    refreshCode: function() {
      var view;
      view = this;
      _(this.eventHandlerProperties()).each(function(prop) {
        return view[prop] = view.definitionClass()[prop];
      });
      if (this.autoBindEventHandlers === true) this.bindAllEventHandlers();
      return this.delegateEvents();
    },
    eventHandlerProperties: function() {
      var handlerIds;
      handlerIds = _(this.events).values();
      return _(handlerIds).select(function(v) {
        return _.isString(v);
      });
    },
    eventHandlerFunctions: function() {
      var handlerIds,
        _this = this;
      handlerIds = _(this.events).values();
      return _(handlerIds).map(function(handlerId) {
        if (_.isFunction(handlerId)) {
          return handlerId;
        } else {
          return _this[handlerId];
        }
      });
    },
    collections: function() {
      return Luca.util.selectProperties(Luca.isBackboneCollection, this);
    },
    models: function() {
      return Luca.util.selectProperties(Luca.isBackboneModel, this);
    },
    views: function() {
      return Luca.util.selectProperties(Luca.isBackboneView, this);
    }
  });

  Luca.View.originalExtend = Backbone.View.extend;

  customizeRender = function(definition) {
    var _base;
    _base = definition.render;
    _base || (_base = Luca.View.prototype.$attach);
    definition.render = function() {
      var deferredRender, fn, target, view, _base2, _name,
        _this = this;
      view = this;
      if (this.deferrable) {
        target = this.deferrable_target;
        if (!Luca.isBackboneCollection(this.deferrable)) {
          this.deferrable = this.collection;
        }
        deferredRender = _.once(function() {
          _base.apply(_this, arguments);
          return _this.trigger("after:render", _this);
        });
        (this.deferrable_target || this.deferrable).bind(this.deferrable_event || "reset", deferredRender);
        this.trigger("before:render", this);
        if (!this.deferrable_trigger) {
          if (typeof (_base2 = this.deferrable)[_name = this.deferrable_method || "fetch"] === "function") {
            _base2[_name]();
          }
        } else {
          fn = _.once(function() {
            var _base3, _name2;
            return typeof (_base3 = _this.deferrable)[_name2 = _this.deferrable_method || "fetch"] === "function" ? _base3[_name2]() : void 0;
          });
          (this.deferrable_target || this).bind(this.deferrable_trigger, fn);
        }
        return this;
      } else {
        this.trigger("before:render", this);
        _base.apply(this, arguments);
        this.trigger("after:render", this);
        return this;
      }
    };
    return definition;
  };

  Luca.View.extend = function(definition) {
    definition = customizeRender(definition);
    return Luca.View.originalExtend.call(this, definition);
  };

}).call(this);
(function() {

  _.def('Luca.Model')["extends"]('Backbone.Model')["with"]({
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
  var source;

  source = 'Backbone.Collection';

  if (Backbone.QueryCollection != null) source = 'Backbone.QueryCollection';

  _.def("Luca.Collection")["extends"](source)["with"]({
    cachedMethods: [],
    restoreMethodCache: function() {
      var config, name, _ref, _results;
      _ref = this._methodCache;
      _results = [];
      for (name in _ref) {
        config = _ref[name];
        if (config.original != null) {
          config.args = void 0;
          _results.push(this[name] = config.original);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    clearMethodCache: function(method) {
      return this._methodCache[method].value = void 0;
    },
    clearAllMethodsCache: function() {
      var config, name, _ref, _results;
      _ref = this._methodCache;
      _results = [];
      for (name in _ref) {
        config = _ref[name];
        _results.push(this.clearMethodCache(name));
      }
      return _results;
    },
    setupMethodCaching: function() {
      var cache, collection, membershipEvents;
      collection = this;
      membershipEvents = ["reset", "add", "remove"];
      cache = this._methodCache = {};
      return _(this.cachedMethods).each(function(method) {
        var dependencies, dependency, membershipEvent, _i, _j, _len, _len2, _ref, _results;
        cache[method] = {
          name: method,
          original: collection[method],
          value: void 0
        };
        collection[method] = function() {
          var _base;
          return (_base = cache[method]).value || (_base.value = cache[method].original.apply(collection, arguments));
        };
        for (_i = 0, _len = membershipEvents.length; _i < _len; _i++) {
          membershipEvent = membershipEvents[_i];
          collection.bind(membershipEvent, function() {
            return collection.clearAllMethodsCache();
          });
        }
        dependencies = method.split(':')[1];
        if (dependencies) {
          _ref = dependencies.split(",");
          _results = [];
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            dependency = _ref[_j];
            _results.push(collection.bind("change:" + dependency, function() {
              return collection.clearMethodCache({
                method: method
              });
            }));
          }
          return _results;
        }
      });
    },
    initialize: function(models, options) {
      var table,
        _this = this;
      if (models == null) models = [];
      this.options = options;
      _.extend(this, this.options);
      this.setupMethodCaching();
      this._reset();
      if (this.cached) {
        console.log('The @cached property of Luca.Collection is being deprecated.  Please change to cache_key');
      }
      if (this.cache_key || (this.cache_key = this.cached)) {
        this.bootstrap_cache_key = _.isFunction(this.cache_key) ? this.cache_key() : this.cache_key;
      }
      if (this.registerAs || this.registerWith) {
        console.log("This configuration API is deprecated.  use @name and @manager properties instead");
      }
      this.name || (this.name = this.registerAs);
      this.manager || (this.manager = this.registerWith);
      if (this.name && !this.manager) this.manager = Luca.CollectionManager.get();
      if (this.manager) {
        this.name || (this.name = this.cache_key());
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
  var attachToolbar;

  attachToolbar = function(config) {
    var action, container, hasBody, id, toolbar;
    if (config == null) config = {};
    config.orientation || (config.orientation = "top");
    config.ctype || (config.ctype = this.toolbarType || "panel_toolbar");
    id = "" + this.cid + "-tbc-" + config.orientation;
    toolbar = Luca.util.lazyComponent(config);
    container = this.make("div", {
      "class": "toolbar-container " + config.orientation,
      id: id
    }, toolbar.render().el);
    hasBody = this.bodyClassName || this.bodyTagName;
    action = (function() {
      switch (config.orientation) {
        case "top":
        case "left":
          if (hasBody) {
            return "before";
          } else {
            return "prepend";
          }
          break;
        case "bottom":
        case "right":
          if (hasBody) {
            return "after";
          } else {
            return "append";
          }
      }
    })();
    return this.$bodyEl()[action](container);
  };

  _.def("Luca.components.Panel")["extends"]("Luca.View")["with"]({
    topToolbar: void 0,
    bottomToolbar: void 0,
    applyStyles: function(styles, body) {
      var setting, target, value;
      if (styles == null) styles = {};
      if (body == null) body = false;
      target = body ? this.$bodyEl() : this.$el;
      for (setting in styles) {
        value = styles[setting];
        target.css(setting, value);
      }
      return this;
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.View.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.styles != null) this.applyStyles(this.styles);
      if (this.bodyStyles != null) this.applyStyles(this.bodyStyles, true);
      return typeof this.renderToolbars === "function" ? this.renderToolbars() : void 0;
    },
    $bodyEl: function() {
      var bodyEl, className, element, newElement;
      element = this.bodyTagName || "div";
      className = this.bodyClassName || "view-body";
      this.bodyEl || (this.bodyEl = "" + element + "." + className);
      bodyEl = this.$(this.bodyEl);
      if (bodyEl.length > 0) return bodyEl;
      if (bodyEl.length === 0 && ((this.bodyClassName != null) || (this.bodyTagName != null))) {
        newElement = this.make(element, {
          "class": className,
          "data-auto-appended": true
        });
        $(this.el).append(newElement);
        return this.$(this.bodyEl);
      }
      return $(this.el);
    },
    $wrap: function(wrapper) {
      if (!wrapper.match(/[<>]/)) {
        wrapper = this.make("div", {
          "class": wrapper
        });
      }
      return this.$el.wrap(wrapper);
    },
    $template: function(template, variables) {
      if (variables == null) variables = {};
      return this.$html(Luca.template(template, variables));
    },
    $html: function(content) {
      return this.$bodyEl().html(content);
    },
    $append: function(content) {
      return this.$bodyEl().append(content);
    },
    renderToolbars: function() {
      var _this = this;
      return _(["top", "left", "right", "bottom"]).each(function(orientation) {
        var config;
        if (config = _this["" + orientation + "Toolbar"]) {
          return _this.renderToolbar(orientation, config);
        }
      });
    },
    renderToolbar: function(orientation, config) {
      if (orientation == null) orientation = "top";
      if (config == null) config = {};
      config.parent = this;
      config.orientation = orientation;
      return attachToolbar.call(this, config);
    }
  });

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
  Luca.templates["components/collection_loader_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'modal\' id=\'progress-model\' style=\'display: none;\'>\n  <div class=\'progress progress-info progress-striped active\'>\n    <div class=\'bar\' style=\'width: 0%;\'></div>\n  </div>\n  <div class=\'message\'>\n    Initializing...\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/form_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'luca-ui-g-view-wrapper\'>\n  <div class=\'g-view-header\'>\n    <div class=\'toolbar-container top\'></div>\n  </div>\n  <div class=\'luca-ui-g-view-body\'>\n    <table cellpadding=\'0\' cellspacing=\'0\' class=\'luca-ui-g-view scrollable-table\' width=\'100%\'>\n      <thead class=\'fixed\'></thead>\n      <tbody class=\'scrollable\'></tbody>\n    </table>\n  </div>\n  <div class=\'luca-ui-g-view-footer\'>\n    <div class=\'toolbar-container bottom\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'empty-text-wrapper\'>\n  <p>\n    ', text ,'\n  </p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["components/nav_bar"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'navbar-inner\'>\n  <div class=\'luca-ui-navbar-body container\'></div>\n</div>\n');}return __p.join('');};
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
  Luca.templates["fields/checkbox_array"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'form-horizontal\'>\n  <div class=\'control-group\'>\n    <label for=\'', input_id ,'\'>\n      ', label ,'\n    </label>\n    <div class=\'controls\'></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["fields/checkbox_array_item"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for=\'', input_id ,'\'>\n  <input id=\'', input_id ,'\' name=\'', input_name ,'\' type=\'checkbox\' value=\'', value ,'\' />\n  ', label ,'\n</label>\n');}return __p.join('');};
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
        this.bind("all", function(trigger, one, two) {
          return console.log("ALL", trigger, one, two);
        });
      }
    }

    Observer.prototype.relay = function() {
      var args, triggerer;
      triggerer = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      console.log("Relaying", trigger, args);
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

  _.def('Luca.core.Field')["extends"]('Luca.View')["with"]({
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
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_class || (this.input_class = "");
      this.helperText || (this.helperText = "");
      if (this.required && !((_ref = this.label) != null ? _ref.match(/^\*/) : void 0)) {
        this.label || (this.label = "*" + this.label);
      }
      this.inputStyles || (this.inputStyles = "");
      if (this.disabled) this.disable();
      this.updateState(this.state);
      this.placeHolder || (this.placeHolder = "");
      return Luca.View.prototype.initialize.apply(this, arguments);
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
  var applyDOMConfig, doComponents, doLayout;

  doLayout = function() {
    this.trigger("before:layout", this);
    this.prepareLayout();
    return this.trigger("after:layout", this);
  };

  applyDOMConfig = function(panel, panelIndex) {
    var config, style_declarations;
    style_declarations = [];
    if (panel.height != null) {
      style_declarations.push("height: " + (_.isNumber(panel.height) ? panel.height + 'px' : panel.height));
    }
    if (panel.width != null) {
      style_declarations.push("width: " + (_.isNumber(panel.width) ? panel.width + 'px' : panel.width));
    }
    if (panel.float) style_declarations.push("float: " + panel.float);
    config = {
      "class": (panel != null ? panel.classes : void 0) || this.componentClass,
      id: "" + this.cid + "-" + panelIndex,
      style: style_declarations.join(';'),
      "data-luca-owner": this.name || this.cid
    };
    if (this.customizeContainerEl != null) {
      config = this.customizeContainerEl(config, panel, panelIndex);
    }
    return config;
  };

  doComponents = function() {
    this.trigger("before:components", this, this.components);
    this.prepareComponents();
    this.createComponents();
    this.trigger("before:render:components", this, this.components);
    this.renderComponents();
    return this.trigger("after:components", this, this.components);
  };

  _.def('Luca.core.Container')["extends"]('Luca.components.Panel')["with"]({
    className: 'luca-ui-container',
    componentTag: 'div',
    componentClass: 'luca-ui-panel',
    isContainer: true,
    hooks: ["before:components", "before:render:components", "before:layout", "after:components", "after:layout", "first:activation"],
    rendered: false,
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.setupHooks(["before:components", "before:render:components", "before:layout", "after:components", "after:layout", "first:activation"]);
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      var _ref;
      doLayout.call(this);
      doComponents.call(this);
      return (_ref = Luca.components.Panel.prototype.beforeRender) != null ? _ref.apply(this, arguments) : void 0;
    },
    customizeContainerEl: function(containerEl, panel, panelIndex) {
      return containerEl;
    },
    prepareLayout: function() {
      var container;
      container = this;
      return this.componentContainers = _(this.components).map(function(component, index) {
        return applyDOMConfig.call(container, component, index);
      });
    },
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component, index) {
        var container, panel, _ref;
        container = (_ref = _this.componentContainers) != null ? _ref[index] : void 0;
        container["class"] = container["class"] || container.className || container.classes;
        if (_this.appendContainers) {
          panel = _this.make(_this.componentTag, container, '');
          _this.$append(panel);
        }
        if (component.container == null) {
          if (_this.appendContainers) component.container = "#" + container.id;
          return component.container || (component.container = _this.$bodyEl());
        }
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
        component = Luca.isBackboneView(object) ? object : (object.type || (object.type = object.ctype || (object.ctype = Luca.defaultComponentType)), Luca.util.lazyComponent(object));
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
      if (!_.isEmpty(this.componentEvents)) this.registerComponentEvents();
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
          if (_.isObject(e)) {
            console.log(e.message);
            console.log(e.stack);
          }
          if ((Luca.silenceRenderErrors != null) !== true) throw e;
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
    componentEvents: {},
    registerComponentEvents: function() {
      var component, componentName, handler, listener, trigger, _ref, _ref2, _results;
      _ref = this.componentEvents;
      _results = [];
      for (listener in _ref) {
        handler = _ref[listener];
        _ref2 = listener.split(' '), componentName = _ref2[0], trigger = _ref2[1];
        component = this.findComponentByName(componentName);
        _results.push(component != null ? component.bind(trigger, this[handler]) : void 0);
      }
      return _results;
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
      return $(">." + this.componentClass, this.el);
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
      classified = Luca.util.classify(key);
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

  _.def('Luca.containers.SplitView')["extends"]('Luca.core.Container')["with"]({
    layout: '100',
    componentType: 'split_view',
    containerTemplate: 'containers/basic',
    className: 'luca-ui-split-view',
    componentClass: 'luca-ui-panel'
  });

}).call(this);
(function() {

  _.def('Luca.containers.ColumnView')["extends"]('Luca.core.Container')["with"]({
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

}).call(this);
(function() {

  _.def("Luca.containers.CardView")["extends"]("Luca.core.Container")["with"]({
    componentType: 'card_view',
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    componentClass: 'luca-ui-card',
    appendContainers: true,
    initialize: function(options) {
      this.options = options;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setupHooks(this.hooks);
    },
    prepareComponents: function() {
      var _ref,
        _this = this;
      if ((_ref = Luca.core.Container.prototype.prepareComponents) != null) {
        _ref.apply(this, arguments);
      }
      return _(this.components).each(function(component, index) {
        if (index === _this.activeCard) {
          return $(component.container).show();
        } else {
          return $(component.container).hide();
        }
      });
    },
    activeComponentElement: function() {
      return this.componentElements().eq(this.activeCard);
    },
    activeComponent: function() {
      return this.getComponent(this.activeCard);
    },
    customizeContainerEl: function(containerEl, panel, panelIndex) {
      containerEl.style += panelIndex === this.activeCard ? "display:block;" : "display:none;";
      return containerEl;
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
      this.$(">." + this.componentClass).hide();
      if (!current.previously_activated) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      this.activeCard = index;
      this.activeComponentElement().show();
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

}).call(this);
(function() {

  _.def("Luca.ModalView")["extends"]("Luca.View")["with"]({
    closeOnEscape: true,
    showOnInitialize: false,
    backdrop: false,
    container: function() {
      return $('body');
    },
    toggle: function() {
      return this.$el.modal('toggle');
    },
    show: function() {
      return this.$el.modal('show');
    },
    hide: function() {
      return this.$el.modal('hide');
    },
    render: function() {
      this.$el.addClass('modal');
      if (this.fade === true) this.$el.addClass('fade');
      $('body').append(this.$el);
      return this.$el.modal({
        backdrop: this.backdrop === true,
        keyboard: this.closeOnEscape === true,
        show: this.showOnInitialize === true
      });
    }
  });

  _.def("Luca.containers.ModalView")["extends"]("Luca.ModalView")["with"]();

}).call(this);
(function() {
  var buildButton, make, prepareButtons;

  make = Backbone.View.prototype.make;

  buildButton = function(config, wrap) {
    var autoWrapClass, buttonAttributes, buttonEl, buttons, dropdownEl, dropdownItems, label, object, white, wrapper,
      _this = this;
    if (wrap == null) wrap = true;
    if (config.ctype != null) {
      config.className || (config.className = "");
      config.className += 'toolbar-component';
      object = Luca(config).render();
      if (Luca.isBackboneView(object)) {
        console.log("Adding toolbar component", object);
        return object.el;
      }
    }
    if (config.spacer) {
      return make("div", {
        "class": "spacer " + config.spacer
      });
    }
    if (config.text) {
      return make("div", {
        "class": "toolbar-text"
      }, config.text);
    }
    wrapper = 'btn-group';
    if (config.wrapper != null) wrapper += " " + config.wrapper;
    if (config.align != null) wrapper += " align-" + config.align;
    if ((config.group != null) && (config.buttons != null)) {
      buttons = prepareButtons(config.buttons, false);
      return make("div", {
        "class": wrapper
      }, buttons);
    } else {
      label = config.label || (config.label = "");
      config.eventId || (config.eventId = _.string.dasherize(config.label.toLowerCase()));
      if (config.icon) {
        if (_.string.isBlank(label)) label = " ";
        if (config.white) white = "icon-white";
        label = "<i class='" + (white || "") + " icon-" + config.icon + "' /> " + label;
      }
      buttonAttributes = {
        "class": "btn",
        "data-eventId": config.eventId,
        title: config.title || config.description
      };
      if (config.color != null) {
        buttonAttributes["class"] += " btn-" + config.color;
      }
      if (config.dropdown) {
        label = "" + label + " <span class='caret'></span>";
        buttonAttributes["class"] += " dropdown-toggle";
        buttonAttributes["data-toggle"] = "dropdown";
        dropdownItems = _(config.dropdown).map(function(dropdownItem) {
          var link;
          link = make("a", {}, dropdownItem[1]);
          return make("li", {
            "data-eventId": dropdownItem[0]
          }, link);
        });
        dropdownEl = make("ul", {
          "class": "dropdown-menu"
        }, dropdownItems);
      }
      buttonEl = make("a", buttonAttributes, label);
      autoWrapClass = "btn-group";
      if (config.align != null) autoWrapClass += " align-" + config.align;
      if (wrap === true) {
        return make("div", {
          "class": autoWrapClass
        }, [buttonEl, dropdownEl]);
      } else {
        return buttonEl;
      }
    }
  };

  prepareButtons = function(buttons, wrap) {
    if (wrap == null) wrap = true;
    return _(buttons).map(function(button) {
      return buildButton(button, wrap);
    });
  };

  _.def("Luca.containers.PanelToolbar")["extends"]("Luca.View")["with"]({
    className: "luca-ui-toolbar btn-toolbar",
    buttons: [],
    well: true,
    orientation: 'top',
    autoBindEventHandlers: true,
    events: {
      "click a.btn, click .dropdown-menu li": "clickHandler"
    },
    clickHandler: function(e) {
      var eventId, hook, me, my, source;
      me = my = $(e.target);
      if (me.is('i')) me = my = $(e.target).parent();
      eventId = my.data('eventid');
      if (eventId == null) return;
      hook = Luca.util.hook(eventId);
      source = this.parent || this;
      if (_.isFunction(source[hook])) {
        return source[hook].call(this, me, e);
      } else {
        return source.trigger(eventId, me, e);
      }
    },
    beforeRender: function() {
      this._super("beforeRender", this, arguments);
      if (this.well === true) this.$el.addClass('well');
      this.$el.addClass("toolbar-" + this.orientation);
      if (this.styles != null) return this.applyStyles(this.styles);
    },
    render: function() {
      var elements,
        _this = this;
      this.$el.empty();
      elements = prepareButtons(this.buttons);
      return _(elements).each(function(element) {
        return _this.$el.append(element);
      });
    },
    afterRender: function() {
      return this._super("afterRender", this, arguments);
    }
  });

}).call(this);
(function() {

  _.def('Luca.containers.PanelView')["extends"]('Luca.core.Container')["with"]({
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

  _.def('Luca.containers.TabView')["extends"]('Luca.containers.CardView')["with"]({
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
    bodyTagName: "div",
    bodyClassName: 'tab-content',
    activeTabSelector: function() {
      return this.tabSelectors().eq(this.activeCard || this.activeTab || this.activeItem);
    },
    beforeLayout: function() {
      var _ref;
      this.$el.addClass("tabs-" + this.tab_position);
      if (this.tab_position === "below") {
        this.$el.append(Luca.templates["containers/tab_view"](this));
        this.$el.append(Luca.templates["containers/tab_selector_container"](this));
      } else {
        this.$el.append(Luca.templates["containers/tab_selector_container"](this));
        this.$el.append(Luca.templates["containers/tab_view"](this));
      }
      return (_ref = Luca.containers.CardView.prototype.beforeLayout) != null ? _ref.apply(this, arguments) : void 0;
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.activeTabSelector().addClass('active');
      if (Luca.enableBootstrap && this.tab_position === "left" || this.tab_position === "right") {
        this.$el.wrap("<div class='row' />");
        this.$el.addClass('span12');
        this.tabContainerWrapper().addClass('span3');
        this.tabContentWrapper().addClass('span9');
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

  _.def('Luca.containers.Viewport').extend('Luca.containers.CardView')["with"]({
    activeItem: 0,
    className: 'luca-ui-viewport',
    fullscreen: true,
    fluid: false,
    wrapperClass: 'row',
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      if (Luca.enableBootstrap === true) {
        if (this.fluid === true) this.wrapperClass = "row-fluid";
        this.$el.wrap("<div class='" + this.wrapperClass + "' />").addClass('span12');
      }
      if (this.fullscreen) return $('html,body').addClass('luca-ui-fullscreen');
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if (Luca.enableBootstrap && this.topNav && this.fullscreen) {
        $('body').css('padding', '40px');
      }
      if (this.topNav != null) this.renderTopNavigation();
      if (this.bottomNav != null) return this.renderBottomNavigation();
    },
    renderTopNavigation: function() {
      var _base;
      if (this.topNav == null) return;
      if (_.isString(this.topNav)) {
        this.topNav = Luca.util.lazyComponent(this.topNav);
      }
      if (_.isObject(this.topNav)) {
        (_base = this.topNav).ctype || (_base.ctype = this.topNav.type || "nav_bar");
        if (!Luca.isBackboneView(this.topNav)) {
          this.topNav = Luca.util.lazyComponent(this.topNav);
        }
      }
      this.topNav.app = this;
      return $('body').prepend(this.topNav.render().el);
    },
    renderBottomNavigation: function() {}
  });

}).call(this);
(function() {



}).call(this);
(function() {

  _.def('Luca.components.Template')["extends"]('Luca.View')["with"]({
    initialize: function(options) {
      this.options = options != null ? options : {};
      console.log("The Use of Luca.components.Template directly is being DEPRECATED");
      return Luca.View.prototype.initialize.apply(this, arguments);
    }
  });

}).call(this);
(function() {

  _.def('Luca.Application')["extends"]('Luca.containers.Viewport')["with"]({
    autoStartHistory: true,
    useCollectionManager: true,
    plugin: false,
    useController: true,
    components: [
      {
        ctype: 'template',
        name: 'welcome',
        template: 'sample/welcome',
        templateContainer: "Luca.templates"
      }
    ],
    initialize: function(options) {
      var definedComponents, _base,
        _this = this;
      this.options = options != null ? options : {};
      Luca.containers.Viewport.prototype.initialize.apply(this, arguments);
      if (this.useController === true) definedComponents = this.components || [];
      this.components = [
        {
          ctype: 'controller',
          name: "main_controller",
          components: definedComponents
        }
      ];
      if (this.useCollectionManager === true) {
        this.collectionManager || (this.collectionManager = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get() : void 0);
        this.collectionManager || (this.collectionManager = new Luca.CollectionManager(this.collectionManagerOptions || (this.collectionManagerOptions = {})));
      }
      this.state = new Backbone.Model(this.defaultState);
      this.bind("ready", function() {
        return _this.render();
      });
      if (this.useKeyRouter === true && (this.keyEvents != null)) {
        this.setupKeyRouter();
      }
      if (this.plugin !== true) {
        return Luca.getApplication = function() {
          return _this;
        };
      }
    },
    activeView: function() {
      var active;
      if (active = this.activeSubSection()) {
        return this.view(active);
      } else {
        return this.view(this.activeSection());
      }
    },
    activeSubSection: function() {
      return this.get("active_sub_section");
    },
    activeSection: function() {
      return this.get("active_section");
    },
    beforeRender: function() {
      var routerStartEvent, _ref;
      if ((_ref = Luca.containers.Viewport.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if ((this.router != null) && this.autoStartHistory === true) {
        routerStartEvent = this.startRouterOn || "after:render";
        if (routerStartEvent === "before:render") {
          return Backbone.history.start();
        } else {
          return this.bind(routerStartEvent, function() {
            return Backbone.history.start();
          });
        }
      }
    },
    afterComponents: function() {
      var _ref, _ref2, _ref3,
        _this = this;
      if ((_ref = Luca.containers.Viewport.prototype.afterComponents) != null) {
        _ref.apply(this, arguments);
      }
      if ((_ref2 = this.getMainController()) != null) {
        _ref2.bind("after:card:switch", function(previous, current) {
          return _this.state.set({
            active_section: current.name
          });
        });
      }
      return (_ref3 = this.getMainController()) != null ? _ref3.each(function(component) {
        if (component.ctype.match(/controller$/)) {
          return component.bind("after:card:switch", function(previous, current) {
            return _this.state.set({
              active_sub_section: current.name
            });
          });
        }
      }) : void 0;
    },
    boot: function() {
      return this.trigger("ready");
    },
    collection: function() {
      return this.collectionManager.getOrCreate.apply(this.collectionManager, arguments);
    },
    get: function(attribute) {
      return this.state.get(attribute);
    },
    getMainController: function() {
      if (this.useController === true) return this.components[0];
      return Luca.cache('main_controller');
    },
    set: function(attributes) {
      return this.state.set(attributes);
    },
    view: function(name) {
      return Luca.cache(name);
    },
    navigate_to: function(component_name, callback) {
      return this.getMainController().navigate_to(component_name, callback);
    },
    setupKeyRouter: function() {
      var router, _base;
      if (!this.keyEvents) return;
      (_base = this.keyEvents).control_meta || (_base.control_meta = {});
      if (this.keyEvents.meta_control) {
        _.extend(this.keyEvents.control_meta, this.keyEvents.meta_control);
      }
      router = _.bind(this.keyRouter, this);
      return $(document).keydown(router);
    },
    keyRouter: function(e) {
      var control, isInputEvent, keyEvent, keyname, meta, source, _ref;
      if (!(e && this.keyEvents)) return;
      isInputEvent = $(e.target).is('input') || $(e.target).is('textarea');
      if (isInputEvent) return;
      keyname = Luca.keyMap[e.keyCode];
      if (!keyname) return;
      meta = (e != null ? e.metaKey : void 0) === true;
      control = (e != null ? e.ctrlKey : void 0) === true;
      source = this.keyEvents;
      source = meta ? this.keyEvents.meta : source;
      source = control ? this.keyEvents.control : source;
      source = meta && control ? this.keyEvents.meta_control : source;
      if (keyEvent = source != null ? source[keyname] : void 0) {
        if (this[keyEvent] != null) {
          return (_ref = this[keyEvent]) != null ? _ref.call(this) : void 0;
        } else {
          return this.trigger(keyEvent);
        }
      }
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.Toolbar')["extends"]('Luca.core.Container')["with"]({
    className: 'luca-ui-toolbar',
    position: 'bottom',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        return component.container = _this.$el;
      });
    },
    render: function() {
      return $(this.container).append(this.el);
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.CollectionLoaderView')["extends"]('Luca.components.Template')["with"]({
    className: 'luca-ui-collection-loader-view',
    template: "components/collection_loader_view",
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Template.prototype.initialize.apply(this, arguments);
      this.container || (this.container = $('body'));
      this.manager || (this.manager = Luca.CollectionManager.get());
      return this.setupBindings();
    },
    modalContainer: function() {
      return $("#progress-modal", this.el);
    },
    setupBindings: function() {
      var _this = this;
      this.manager.bind("collection_loaded", function(name) {
        var collectionName, loaded, progress, total;
        loaded = _this.manager.loadedCollectionsCount();
        total = _this.manager.totalCollectionsCount();
        progress = parseInt((loaded / total) * 100);
        collectionName = _.string.titleize(_.string.humanize(name));
        _this.modalContainer().find('.progress .bar').attr("style", "width: " + progress + "%;");
        return _this.modalContainer().find('.message').html("Loaded " + collectionName + "...");
      });
      return this.manager.bind("all_collections_loaded", function() {
        _this.modalContainer().find('.message').html("All done!");
        return _.delay(function() {
          return _this.modalContainer().modal('hide');
        }, 400);
      });
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.Controller')["extends"]('Luca.containers.CardView')["with"]({
    initialize: function(options) {
      var _ref;
      this.options = options;
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      this.defaultCard || (this.defaultCard = (_ref = this.components[0]) != null ? _ref.name : void 0);
      if (!this.defaultCard) {
        throw "Controllers must specify a defaultCard property and/or the first component must have a name";
      }
      return this.state = new Backbone.Model({
        active_section: this.defaultCard
      });
    },
    each: function(fn) {
      var _this = this;
      return _(this.components).each(function(component) {
        return fn.apply(_this, [component]);
      });
    },
    "default": function(callback) {
      return this.navigate_to(this.defaultCard, callback);
    },
    navigate_to: function(section, callback) {
      var _this = this;
      section || (section = this.defaultCard);
      this.activate(section, false, function(activator, previous, current) {
        _this.state.set({
          active_section: current.name
        });
        if (_.isFunction(callback)) return callback.apply(current);
      });
      return this.find(section);
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.ButtonField')["extends"]('Luca.core.Field')["with"]({
    readOnly: true,
    events: {
      "click input": "click_handler"
    },
    hooks: ["button:click"],
    className: 'luca-ui-field luca-ui-button-field',
    template: 'fields/button_field',
    click_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      return this.trigger("button:click");
    },
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      _.extend(this.options);
      _.bindAll(this, "click_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      if ((_ref = this.icon_class) != null ? _ref.length : void 0) {
        return this.template = "fields/button_field_link";
      }
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('button'));
      this.input_name || (this.input_name = this.name || (this.name = this.input_id));
      this.input_value || (this.input_value = this.label || (this.label = this.text));
      this.input_type || (this.input_type = "button");
      this.input_class || (this.input_class = this["class"]);
      this.icon_class || (this.icon_class = "");
      if (this.icon_class.length && !this.icon_class.match(/^icon-/)) {
        this.icon_class = "icon-" + this.icon_class;
      }
      if (this.white) return this.icon_class += " icon-white";
    },
    setValue: function() {
      return true;
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.CheckboxArray')["extends"]('Luca.core.Field')["with"]({
    template: "fields/checkbox_array",
    events: {
      "click input": "clickHandler"
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      _.bindAll(this, "populateCheckboxes", "clickHandler", "_updateModel");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.valueField || (this.valueField = "id");
      this.displayField || (this.displayField = "name");
      return this.selectedItems = [];
    },
    afterInitialize: function(options) {
      this.options = options != null ? options : {};
      try {
        this.configure_collection();
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      return this.collection.bind("reset", this.populateCheckboxes);
    },
    afterRender: function() {
      var _ref, _ref2;
      if (((_ref = this.collection) != null ? (_ref2 = _ref.models) != null ? _ref2.length : void 0 : void 0) > 0) {
        return this.populateCheckboxes();
      } else {
        return this.collection.trigger("reset");
      }
    },
    clickHandler: function(event) {
      var checkbox;
      checkbox = event.target;
      if (checkbox.checked) {
        this.selectedItems.push(checkbox.value);
      } else {
        if (this.selectedItems.indexOf(checkbox.value) !== -1) {
          this.selectedItems = _.without(this.selectedItems, [checkbox.value]);
        }
      }
      return this._updateModel();
    },
    populateCheckboxes: function() {
      var controls,
        _this = this;
      controls = $(this.el).find('.controls');
      controls.empty();
      if (!_.isUndefined(this.getModel())) {
        this.selectedItems = this.getModel().get(this.name);
      }
      this.collection.each(function(model) {
        var input_id, label, value;
        value = model.get(_this.valueField);
        label = model.get(_this.displayField);
        input_id = _.uniqueId('field');
        controls.append(Luca.templates["fields/checkbox_array_item"]({
          label: label,
          value: value,
          input_id: input_id,
          input_name: _this.input_name
        }));
        if (_(_this.selectedItems).indexOf(value) !== -1) {
          return _this.$("#" + input_id).attr("checked", "checked");
        }
      });
      return $(this.container).append(this.$el);
    },
    _updateModel: function() {
      var attributes;
      attributes = {};
      attributes[this.name] = this.selectedItems;
      return this.getModel().set(attributes);
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.CheckboxField')["extends"]('Luca.core.Field')["with"]({
    events: {
      "change input": "change_handler"
    },
    change_handler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("on:change", this, e);
      if (me.checked === true) {
        return this.trigger("checked");
      } else {
        return this.trigger("unchecked");
      }
    },
    className: 'luca-ui-checkbox-field luca-ui-field',
    template: 'fields/checkbox_field',
    hooks: ["checked", "unchecked"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "change_handler");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = 1);
      return this.label || (this.label = this.name);
    },
    setValue: function(checked) {
      return this.input.attr('checked', checked);
    },
    getValue: function() {
      return this.input.attr('checked') === true;
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.FileUploadField')["extends"]('Luca.core.Field')["with"]({
    template: 'fields/file_upload_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      return this.helperText || (this.helperText = "");
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.HiddenField')["extends"]('Luca.core.Field')["with"]({
    template: 'fields/hidden_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = this.value);
      return this.label || (this.label = this.name);
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.SelectField')["extends"]('Luca.core.Field')["with"]({
    events: {
      "change select": "change_handler"
    },
    hooks: ["after:select"],
    className: 'luca-ui-select-field luca-ui-field',
    template: "fields/select_field",
    includeBlank: true,
    blankValue: '',
    blankText: 'Select One',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      _.bindAll(this, "change_handler", "populateOptions", "beforeFetch");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (_.isUndefined(this.retainValue)) return this.retainValue = true;
    },
    afterInitialize: function() {
      var _ref;
      if ((_ref = this.collection) != null ? _ref.data : void 0) {
        this.valueField || (this.valueField = "id");
        this.displayField || (this.displayField = "name");
        this.parseData();
      }
      try {
        this.configure_collection();
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      this.collection.bind("before:fetch", this.beforeFetch);
      return this.collection.bind("reset", this.populateOptions);
    },
    parseData: function() {
      var _this = this;
      return this.collection.data = _(this.collection.data).map(function(record) {
        var hash;
        if (!_.isArray(record)) return record;
        hash = {};
        hash[_this.valueField] = record[0];
        hash[_this.displayField] = record[1];
        return hash;
      });
    },
    afterRender: function() {
      var _ref, _ref2;
      this.input = $('select', this.el);
      if (((_ref = this.collection) != null ? (_ref2 = _ref.models) != null ? _ref2.length : void 0 : void 0) > 0) {
        return this.populateOptions();
      } else {
        return this.collection.trigger("reset");
      }
    },
    setValue: function(value) {
      this.currentValue = value;
      return Luca.core.Field.prototype.setValue.apply(this, arguments);
    },
    beforeFetch: function() {
      return this.resetOptions();
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    resetOptions: function() {
      this.input.html('');
      if (this.includeBlank) {
        return this.input.append("<option value='" + this.blankValue + "'>" + this.blankText + "</option>");
      }
    },
    populateOptions: function() {
      var _ref,
        _this = this;
      this.resetOptions();
      if (((_ref = this.collection) != null ? _ref.each : void 0) != null) {
        this.collection.each(function(model) {
          var display, option, selected, value;
          value = model.get(_this.valueField);
          display = model.get(_this.displayField);
          if (_this.selected && value === _this.selected) selected = "selected";
          option = "<option " + selected + " value='" + value + "'>" + display + "</option>";
          return _this.input.append(option);
        });
      }
      this.trigger("after:populate:options", this);
      return this.setValue(this.currentValue);
    }
  });

}).call(this);
(function() {

  _.def('Luca.fields.TextAreaField')["extends"]('Luca.core.Field')["with"]({
    events: {
      "keydown input": "keydown_handler",
      "blur input": "blur_handler",
      "focus input": "focus_handler"
    },
    template: 'fields/text_area_field',
    height: "200px",
    width: "90%",
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.bindAll(this, "keydown_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      return this.inputStyles || (this.inputStyles = "height:" + this.height + ";width:" + this.width);
    },
    setValue: function(value) {
      return $(this.field()).val(value);
    },
    getValue: function() {
      return $(this.field()).val();
    },
    field: function() {
      return this.input = $("textarea#" + this.input_id, this.el);
    },
    keydown_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    blur_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    focus_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    }
  });

}).call(this);
(function() {
  var change_handler;

  change_handler = function(e) {
    return this.trigger("on:change", this, e);
  };

  _.def('Luca.fields.TextField')["extends"]('Luca.core.Field')["with"]({
    events: {
      "blur input": "blur_handler",
      "focus input": "focus_handler",
      "change input": "change_handler"
    },
    template: 'fields/text_field',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.bindAll(this, "keydown_handler", "blur_handler", "focus_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      if (this.prepend) {
        this.$el.addClass('input-prepend');
        this.addOn = this.prepend;
      }
      if (this.append) {
        this.$el.addClass('input-append');
        this.addOn = this.append;
      }
      if (this.enableKeyEvents) {
        this.events["keydown input"] = "keydown_handler";
        return this.delegateEvents();
      }
    },
    keydown_handler: _.throttle((function(e) {
      return change_handler.apply(this, arguments);
    }), 300),
    blur_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    focus_handler: function(e) {
      var me, my;
      return me = my = $(e.currentTarget);
    },
    change_handler: change_handler
  });

}).call(this);
(function() {

  _.def('Luca.fields.TypeAheadField')["extends"]('Luca.fields.TextField')["with"]({
    className: 'luca-ui-field',
    getSource: function() {
      return this.source || [];
    },
    matcher: function(item) {
      return true;
    },
    beforeRender: function() {
      this._super("beforeRender", this, arguments);
      return this.$('input').attr('data-provide', 'typeahead');
    },
    afterRender: function() {
      this._super("afterRender", this, arguments);
      return this.$('input').typeahead({
        matcher: this.matcher,
        source: this.getSource()
      });
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.FormButtonToolbar')["extends"]('Luca.components.Toolbar')["with"]({
    className: 'luca-ui-form-toolbar form-actions',
    position: 'bottom',
    includeReset: false,
    render: function() {
      return $(this.container).append(this.el);
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.components.Toolbar.prototype.initialize.apply(this, arguments);
      this.components = [
        {
          ctype: 'button_field',
          label: 'Submit',
          "class": 'btn submit-button'
        }
      ];
      if (this.includeReset) {
        return this.components.push({
          ctype: 'button_field',
          label: 'Reset',
          "class": 'btn reset-button'
        });
      }
    }
  });

}).call(this);
(function() {

  _.def("Luca.components.FormView")["extends"]('Luca.core.Container')["with"]({
    tagName: 'form',
    className: 'luca-ui-form-view',
    hooks: ["before:submit", "before:reset", "before:load", "before:load:new", "before:load:existing", "after:submit", "after:reset", "after:load", "after:load:new", "after:load:existing", "after:submit:success", "after:submit:fatal_error", "after:submit:error"],
    events: {
      "click .submit-button": "submitHandler",
      "click .reset-button": "resetHandler"
    },
    toolbar: true,
    legend: "",
    bodyTemplate: ["components/form_view"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "submitHandler", "resetHandler", "renderToolbars");
      this.state || (this.state = new Backbone.Model);
      this.setupHooks(this.hooks);
      this.applyStyleClasses();
      if (this.toolbar === true && !((this.bottomToolbar != null) || (this.topToolbar != null))) {
        return this.bottomToolbar = {
          buttons: [
            {
              icon: "ok-sign",
              white: true,
              label: "Save Changes",
              eventId: "click:submit",
              color: "success"
            }, {
              icon: "remove-sign",
              label: "Reset",
              eventId: "click:reset"
            }
          ]
        };
      }
    },
    applyStyleClasses: function() {
      if (Luca.enableBootstrap) this.applyBootstrapStyleClasses();
      if (this.labelAlign) this.$el.addClass("label-align-" + this.labelAlign);
      if (this.fieldLayoutClass) return this.$el.addClass(this.fieldLayoutClass);
    },
    applyBootstrapStyleClasses: function() {
      if (this.labelAlign === "left") this.inlineForm = true;
      if (this.well) this.$el.addClass('well');
      if (this.searchForm) this.$el.addClass('form-search');
      if (this.horizontalForm) this.$el.addClass('form-horizontal');
      if (this.inlineForm) return this.$el.addClass('form-inline');
    },
    resetHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:reset", this);
      this.reset();
      return this.trigger("after:reset", this);
    },
    submitHandler: function(e) {
      var me, my;
      me = my = $(e.currentTarget);
      this.trigger("before:submit", this);
      return this.submit();
    },
    afterComponents: function() {
      var _ref,
        _this = this;
      if ((_ref = Luca.core.Container.prototype.afterComponents) != null) {
        _ref.apply(this, arguments);
      }
      return this.eachField(function(field) {
        field.getForm = function() {
          return _this;
        };
        return field.getModel = function() {
          return _this.currentModel();
        };
      });
    },
    eachField: function(iterator) {
      return _(this.getFields()).map(iterator);
    },
    getField: function(name) {
      return _(this.getFields('name', name)).first();
    },
    getFields: function(attr, value) {
      var fields;
      fields = this.select("isField", true, true);
      if (fields.length > 0 && attr && value) {
        fields = _(fields).select(function(field) {
          var property, propvalue;
          property = field[attr];
          if (property == null) return false;
          propvalue = _.isFunction(property) ? property() : property;
          return value === propvalue;
        });
      }
      return fields;
    },
    loadModel: function(current_model) {
      var event, fields, form, _ref;
      this.current_model = current_model;
      form = this;
      fields = this.getFields();
      this.trigger("before:load", this, this.current_model);
      if (this.current_model) {
        if ((_ref = this.current_model.beforeFormLoad) != null) {
          _ref.apply(this.current_model, this);
        }
        event = "before:load:" + (this.current_model.isNew() ? "new" : "existing");
        this.trigger(event, this, this.current_model);
      }
      this.setValues(this.current_model);
      this.trigger("after:load", this, this.current_model);
      if (this.current_model) {
        return this.trigger("after:load:" + (this.current_model.isNew() ? "new" : "existing"), this, this.current_model);
      }
    },
    reset: function() {
      if (this.current_model != null) return this.loadModel(this.current_model);
    },
    clear: function() {
      var _this = this;
      this.current_model = this.defaultModel != null ? this.defaultModel() : void 0;
      return _(this.getFields()).each(function(field) {
        try {
          return field.setValue('');
        } catch (e) {
          return console.log("Error Clearing", _this, field);
        }
      });
    },
    setValues: function(source, options) {
      var fields,
        _this = this;
      if (options == null) options = {};
      source || (source = this.currentModel());
      fields = this.getFields();
      _(fields).each(function(field) {
        var field_name, value;
        field_name = field.input_name || field.name;
        if (value = source[field_name]) {
          if (_.isFunction(value)) value = value.apply(_this);
        }
        if (!value && Luca.isBackboneModel(source)) value = source.get(field_name);
        if (field.readOnly !== true) {
          return field != null ? field.setValue(value) : void 0;
        }
      });
      if ((options.silent != null) !== true) return this.syncFormWithModel();
    },
    getValues: function(options) {
      if (options == null) options = {};
      if (options.reject_blank == null) options.reject_blank = true;
      if (options.skip_buttons == null) options.skip_buttons = true;
      return _(this.getFields()).inject(function(memo, field) {
        var key, skip, value;
        value = field.getValue();
        key = field.input_name || field.name;
        skip = false;
        if (options.skip_buttons && field.ctype === "button_field") skip = true;
        if (_.string.isBlank(value)) {
          if (options.reject_blank && !field.send_blanks) skip = true;
          if (field.input_name === "id") skip = true;
        }
        if (skip !== true) memo[key] = value;
        return memo;
      }, {});
    },
    submit_success_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      if (response && (response != null ? response.success : void 0) === true) {
        return this.trigger("after:submit:success", this, model, response);
      } else {
        return this.trigger("after:submit:error", this, model, response);
      }
    },
    submit_fatal_error_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      return this.trigger("after:submit:fatal_error", this, model, response);
    },
    submit: function(save, saveOptions) {
      if (save == null) save = true;
      if (saveOptions == null) saveOptions = {};
      _.bindAll(this, "submit_success_handler", "submit_fatal_error_handler");
      saveOptions.success || (saveOptions.success = this.submit_success_handler);
      saveOptions.error || (saveOptions.error = this.submit_fatal_error_handler);
      this.syncFormWithModel();
      if (!save) return;
      return this.current_model.save(this.current_model.toJSON(), saveOptions);
    },
    currentModel: function(options) {
      if (options == null) options = {};
      if (options === true || (options != null ? options.refresh : void 0) === true) {
        this.syncFormWithModel();
      }
      return this.current_model;
    },
    syncFormWithModel: function() {
      var _ref;
      return (_ref = this.current_model) != null ? _ref.set(this.getValues()) : void 0;
    },
    setLegend: function(legend) {
      this.legend = legend;
      return $('fieldset legend', this.el).first().html(this.legend);
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.GridView').extend('Luca.components.Panel')["with"]({
    bodyTemplate: "components/grid_view",
    autoBindEventHandlers: true,
    events: {
      "dblclick table tbody tr": "double_click_handler",
      "click table tbody tr": "click_handler"
    },
    className: 'luca-ui-g-view',
    rowClass: "luca-ui-g-row",
    wrapperClass: "luca-ui-g-view-wrapper",
    additionalWrapperClasses: [],
    wrapperStyles: {},
    scrollable: true,
    emptyText: 'No Results To display.',
    tableStyle: 'striped',
    defaultHeight: 285,
    defaultWidth: 756,
    maxWidth: void 0,
    hooks: ["before:grid:render", "before:render:header", "before:render:row", "after:grid:render", "row:double:click", "row:click", "after:collection:load"],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.modules.Deferrable);
      Luca.components.Panel.prototype.initialize.apply(this, arguments);
      this.configure_collection(true);
      this.collection.bind("reset", function(collection) {
        _this.refresh();
        return _this.trigger("after:collection:load", collection);
      });
      return this.collection.bind("change", function(model) {
        var cells, rowEl;
        if (_this.rendered !== true) return;
        try {
          rowEl = _this.getRowEl(model.id || model.get('id') || model.cid);
          cells = _this.render_row(model, _this.collection.indexOf(model), {
            cellsOnly: true
          });
          return $(rowEl).html(cells);
        } catch (error) {
          return console.log("Error in change handler for GridView.collection", error, _this, model, rowEl, cells);
        }
      });
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.components.Panel.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.trigger("before:grid:render", this);
      this.table = this.$('table.luca-ui-g-view');
      this.header = this.$("thead");
      this.body = this.$("tbody");
      this.footer = this.$("tfoot");
      this.wrapper = this.$("." + this.wrapperClass);
      this.applyCssClasses();
      if (this.scrollable) this.setDimensions();
      this.renderHeader();
      this.emptyMessage();
      return $(this.container).append(this.$el);
    },
    afterRender: function() {
      var _ref;
      if ((_ref = Luca.components.Panel.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      this.rendered = true;
      this.refresh();
      return this.trigger("after:grid:render", this);
    },
    applyCssClasses: function() {
      var _ref,
        _this = this;
      if (this.scrollable) this.$el.addClass('scrollable-g-view');
      _(this.additionalWrapperClasses).each(function(containerClass) {
        var _ref;
        return (_ref = _this.wrapper) != null ? _ref.addClass(containerClass) : void 0;
      });
      if (Luca.enableBootstrap) this.table.addClass('table');
      return _((_ref = this.tableStyle) != null ? _ref.split(" ") : void 0).each(function(style) {
        return _this.table.addClass("table-" + style);
      });
    },
    setDimensions: function(offset) {
      var _this = this;
      this.height || (this.height = this.defaultHeight);
      this.$('.luca-ui-g-view-body').height(this.height);
      this.$('tbody.scrollable').height(this.height - 23);
      this.container_width = (function() {
        return $(_this.container).width();
      })();
      this.width || (this.width = this.container_width > 0 ? this.container_width : this.defaultWidth);
      this.width = _([this.width, this.maxWidth || this.width]).max();
      this.$('.luca-ui-g-view-body').width(this.width);
      this.$('.luca-ui-g-view-body table').width(this.width);
      return this.setDefaultColumnWidths();
    },
    resize: function(newWidth) {
      var difference, distribution,
        _this = this;
      difference = newWidth - this.width;
      this.width = newWidth;
      this.$('.luca-ui-g-view-body').width(this.width);
      this.$('.luca-ui-g-view-body table').width(this.width);
      if (this.columns.length > 0) {
        distribution = difference / this.columns.length;
        return _(this.columns).each(function(col, index) {
          var column;
          column = $(".column-" + index, _this.el);
          return column.width(col.width = col.width + distribution);
        });
      }
    },
    padLastColumn: function() {
      var configured_column_widths, unused_width;
      configured_column_widths = _(this.columns).inject(function(sum, column) {
        return sum = column.width + sum;
      }, 0);
      unused_width = this.width - configured_column_widths;
      if (unused_width > 0) return this.lastColumn().width += unused_width;
    },
    setDefaultColumnWidths: function() {
      var default_column_width;
      default_column_width = this.columns.length > 0 ? this.width / this.columns.length : 200;
      _(this.columns).each(function(column) {
        return parseInt(column.width || (column.width = default_column_width));
      });
      return this.padLastColumn();
    },
    lastColumn: function() {
      return this.columns[this.columns.length - 1];
    },
    emptyMessage: function(text) {
      if (text == null) text = "";
      text || (text = this.emptyText);
      this.body.html('');
      return this.body.append(Luca.templates["components/grid_view_empty_text"]({
        colspan: this.columns.length,
        text: text
      }));
    },
    refresh: function() {
      var _this = this;
      this.body.html('');
      this.collection.each(function(model, index) {
        return _this.render_row.apply(_this, [model, index]);
      });
      if (this.collection.models.length === 0) return this.emptyMessage();
    },
    ifLoaded: function(fn, scope) {
      scope || (scope = this);
      fn || (fn = function() {
        return true;
      });
      return this.collection.ifLoaded(fn, scope);
    },
    applyFilter: function(values, options) {
      if (options == null) {
        options = {
          auto: true,
          refresh: true
        };
      }
      return this.collection.applyFilter(values, options);
    },
    renderHeader: function() {
      var headers,
        _this = this;
      this.trigger("before:render:header");
      headers = _(this.columns).map(function(column, column_index) {
        var style;
        style = column.width ? "width:" + column.width + "px;" : "";
        return "<th style='" + style + "' class='column-" + column_index + "'>" + column.header + "</th>";
      });
      return this.header.append("<tr>" + headers + "</tr>");
    },
    getRowEl: function(id) {
      return this.$("[data-record-id=" + id + "]", 'table');
    },
    render_row: function(row, row_index, options) {
      var altClass, cells, content, model_id, rowClass, _ref,
        _this = this;
      if (options == null) options = {};
      rowClass = this.rowClass;
      model_id = (row != null ? row.get : void 0) && (row != null ? row.attributes : void 0) ? row.get('id') : '';
      this.trigger("before:render:row", row, row_index);
      cells = _(this.columns).map(function(column, col_index) {
        var display, style, value;
        value = _this.cell_renderer(row, column, col_index);
        style = column.width ? "width:" + column.width + "px;" : "";
        display = _.isUndefined(value) ? "" : value;
        return "<td style='" + style + "' class='column-" + col_index + "'>" + display + "</td>";
      });
      if (options.cellsOnly) return cells;
      altClass = '';
      if (this.alternateRowClasses) {
        altClass = row_index % 2 === 0 ? "even" : "odd";
      }
      content = "<tr data-record-id='" + model_id + "' data-row-index='" + row_index + "' class='" + rowClass + " " + altClass + "' id='row-" + row_index + "'>" + cells + "</tr>";
      if (options.contentOnly === true) return content;
      return (_ref = this.body) != null ? _ref.append(content) : void 0;
    },
    cell_renderer: function(row, column, columnIndex) {
      var source;
      if (_.isFunction(column.renderer)) {
        return column.renderer.apply(this, [row, column, columnIndex]);
      } else if (column.data.match(/\w+\.\w+/)) {
        source = row.attributes || row;
        return Luca.util.nestedValue(column.data, source);
      } else {
        return (typeof row.get === "function" ? row.get(column.data) : void 0) || row[column.data];
      }
    },
    double_click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      return this.trigger("row:double:click", this, record, rowIndex);
    },
    click_handler: function(e) {
      var me, my, record, rowIndex;
      me = my = $(e.currentTarget);
      rowIndex = my.data('row-index');
      record = this.collection.at(rowIndex);
      this.trigger("row:click", this, record, rowIndex);
      $("." + this.rowClass, this.body).removeClass('selected-row');
      return me.addClass('selected-row');
    }
  });

}).call(this);
(function() {

  _.def("Luca.components.NavBar")["extends"]("Luca.View")["with"]({
    fixed: true,
    position: 'top',
    className: 'navbar',
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    brand: "Luca.js",
    bodyTemplate: 'nav_bar',
    bodyClassName: 'luca-ui-navbar-body',
    beforeRender: function() {
      if (this.fixed) this.$el.addClass("navbar-fixed-" + this.position);
      if (this.brand != null) {
        return this.content().append("<a class='brand' href='#'>" + this.brand + "</a>");
      }
    },
    render: function() {
      return this;
    },
    content: function() {
      return this.$('.container').eq(0);
    }
  });

}).call(this);
(function() {

  _.def('Luca.components.RecordManager')["extends"]('Luca.containers.CardView')["with"]({
    events: {
      "click .record-manager-grid .edit-link": "edit_handler",
      "click .record-manager-filter .filter-button": "filter_handler",
      "click .record-manager-filter .reset-button": "reset_filter_handler",
      "click .add-button": "add_handler",
      "click .refresh-button": "filter_handler",
      "click .back-to-search-button": "back_to_search_handler"
    },
    record_manager: true,
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      if (!this.name) throw "Record Managers must specify a name";
      _.bindAll(this, "add_handler", "edit_handler", "filter_handler", "reset_filter_handler");
      if (this.filterConfig) _.extend(this.components[0][0], this.filterConfig);
      if (this.gridConfig) _.extend(this.components[0][1], this.gridConfig);
      if (this.editorConfig) _.extend(this.components[1][0], this.editorConfig);
      return this.bind("after:card:switch", function() {
        if (_this.activeCard === 0) _this.trigger("activation:search", _this);
        if (_this.activeCard === 1) {
          return _this.trigger("activation:editor", _this);
        }
      });
    },
    components: [
      {
        ctype: 'split_view',
        relayFirstActivation: true,
        components: [
          {
            ctype: 'form_view'
          }, {
            ctype: 'grid_view'
          }
        ]
      }, {
        ctype: 'form_view'
      }
    ],
    getSearch: function(activate, reset) {
      if (activate == null) activate = false;
      if (reset == null) reset = true;
      if (activate === true) this.activate(0);
      if (reset === true) this.getEditor().clear();
      return _.first(this.components);
    },
    getFilter: function() {
      return _.first(this.getSearch().components);
    },
    getGrid: function() {
      return _.last(this.getSearch().components);
    },
    getCollection: function() {
      return this.getGrid().collection;
    },
    getEditor: function(activate, reset) {
      var _this = this;
      if (activate == null) activate = false;
      if (reset == null) reset = false;
      if (activate === true) {
        this.activate(1, function(activator, previous, current) {
          return current.reset();
        });
      }
      return _.last(this.components);
    },
    beforeRender: function() {
      var _ref;
      this.$el.addClass("" + this.resource + "-manager");
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      this.$el.addClass("" + this.resource + " record-manager");
      this.$el.data('resource', this.resource);
      $(this.getGrid().el).addClass("" + this.resource + " record-manager-grid");
      $(this.getFilter().el).addClass("" + this.resource + " record-manager-filter");
      return $(this.getEditor().el).addClass("" + this.resource + " record-manager-editor");
    },
    afterRender: function() {
      var collection, editor, filter, grid, manager, _ref,
        _this = this;
      if ((_ref = Luca.containers.CardView.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      manager = this;
      grid = this.getGrid();
      filter = this.getFilter();
      editor = this.getEditor();
      collection = this.getCollection();
      grid.bind("row:double:click", function(grid, model, index) {
        manager.getEditor(true);
        return editor.loadModel(model);
      });
      editor.bind("before:submit", function() {
        $('.form-view-flash-container', _this.el).html('');
        return $('.form-view-body', _this.el).spin("large");
      });
      editor.bind("after:submit", function() {
        return $('.form-view-body', _this.el).spin(false);
      });
      editor.bind("after:submit:fatal_error", function() {
        $('.form-view-flash-container', _this.el).append("<li class='error'>There was an internal server error saving this record.  Please contact developers@benchprep.com to report this error.</li>");
        return $('.form-view-body', _this.el).spin(false);
      });
      editor.bind("after:submit:error", function(form, model, response) {
        return _(response.errors).each(function(error) {
          return $('.form-view-flash-container', _this.el).append("<li class='error'>" + error + "</li>");
        });
      });
      editor.bind("after:submit:success", function(form, model, response) {
        $('.form-view-flash-container', _this.el).append("<li class='success'>Successfully Saved Record</li>");
        model.set(response.result);
        form.loadModel(model);
        grid.refresh();
        return _.delay(function() {
          $('.form-view-flash-container li.success', _this.el).fadeOut(1000);
          return $('.form-view-flash-container', _this.el).html('');
        }, 4000);
      });
      return filter.eachComponent(function(component) {
        try {
          return component.bind("on:change", _this.filter_handler);
        } catch (e) {
          return;
        }
      });
    },
    firstActivation: function() {
      this.getGrid().trigger("first:activation", this, this.getGrid());
      return this.getFilter().trigger("first:activation", this, this.getGrid());
    },
    reload: function() {
      var editor, filter, grid, manager;
      manager = this;
      grid = this.getGrid();
      filter = this.getFilter();
      editor = this.getEditor();
      filter.clear();
      return grid.applyFilter();
    },
    manageRecord: function(record_id) {
      var model,
        _this = this;
      model = this.getCollection().get(record_id);
      if (model) return this.loadModel(model);
      console.log("Could Not Find Model, building and fetching");
      model = this.buildModel();
      model.set({
        id: record_id
      }, {
        silent: true
      });
      return model.fetch({
        success: function(model, response) {
          return _this.loadModel(model);
        }
      });
    },
    loadModel: function(current_model) {
      this.current_model = current_model;
      this.getEditor(true).loadModel(this.current_model);
      return this.trigger("model:loaded", this.current_model);
    },
    currentModel: function() {
      return this.getEditor(false).currentModel();
    },
    buildModel: function() {
      var collection, editor, model;
      editor = this.getEditor(false);
      collection = this.getCollection();
      collection.add([{}], {
        silent: true,
        at: 0
      });
      return model = collection.at(0);
    },
    createModel: function() {
      return this.loadModel(this.buildModel());
    },
    reset_filter_handler: function(e) {
      this.getFilter().clear();
      return this.getGrid().applyFilter(this.getFilter().getValues());
    },
    filter_handler: function(e) {
      return this.getGrid().applyFilter(this.getFilter().getValues());
    },
    edit_handler: function(e) {
      var me, model, my, record_id;
      me = my = $(e.currentTarget);
      record_id = my.parents('tr').data('record-id');
      if (record_id) model = this.getGrid().collection.get(record_id);
      return model || (model = this.getGrid().collection.at(row_index));
    },
    add_handler: function(e) {
      var me, my, resource;
      me = my = $(e.currentTarget);
      return resource = my.parents('.record-manager').eq(0).data('resource');
    },
    destroy_handler: function(e) {},
    back_to_search_handler: function() {}
  });

}).call(this);
(function() {

  _.def("Luca.Router")["extends"]("Backbone.Router")["with"]({
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
(function() {

  _.def("Luca.components.ToolbarDialog")["extends"]("Luca.View")["with"]({
    className: "luca-ui-toolbar-dialog span well",
    styles: {
      "position": "absolute",
      "z-Index": "3000",
      "float": "left"
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      return this._super("initialize", this, arguments);
    },
    createWrapper: function() {
      return this.make("div", {
        "class": "component-picker span4 well",
        style: "position: absolute; z-index:12000"
      });
    },
    show: function() {
      return this.$el.parent().show();
    },
    hide: function() {
      return this.$el.parent().hide();
    },
    toggle: function() {
      return this.$el.parent().toggle();
    }
  });

}).call(this);
(function() {

  _.extend(Luca, Luca.Events);

  _.extend(Luca.View.prototype, Luca.Events);

  _.extend(Luca.Collection.prototype, Luca.Events);

  _.extend(Luca.Model.prototype, Luca.Events);

}).call(this);
