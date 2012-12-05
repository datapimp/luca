(function() {
  var UnderscoreExtensions, lucaUtilityHelper,
    __slice = Array.prototype.slice;

  lucaUtilityHelper = function() {
    var args, definition, fallback, inheritsFrom, payload, result, _ref;
    payload = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (arguments.length === 0) {
      return (_ref = _(Luca.Application.instances).values()) != null ? _ref[0] : void 0;
    }
    if (_.isString(payload) && (result = Luca.cache(payload))) return result;
    if (_.isString(payload) && (result = Luca.find(payload))) return result;
    if (_.isString(payload) && (result = Luca.registry.find(payload))) {
      return result;
    }
    if (payload instanceof jQuery && (result = Luca.find(payload))) return result;
    if (_.isObject(payload) && (payload.ctype != null)) {
      return Luca.util.lazyComponent(payload);
    }
    if (_.isObject(payload) && payload.defines && payload["extends"]) {
      definition = payload.defines;
      inheritsFrom = payload["extends"];
    }
    if (_.isFunction(fallback = _(args).last())) return fallback();
  };

  (window || global).Luca = function() {
    return lucaUtilityHelper.apply(this, arguments);
  };

  _.extend(Luca, {
    VERSION: "0.9.77",
    core: {},
    collections: {},
    containers: {},
    components: {},
    models: {},
    concerns: {},
    util: {},
    fields: {},
    registry: {},
    options: {},
    config: {},
    getHelper: function() {
      return function() {
        return lucaUtilityHelper.apply(this, arguments);
      };
    }
  });

  _.extend(Luca, Backbone.Events);

  Luca.config.maintainStyleHierarchy = true;

  Luca.config.maintainClassHierarchy = true;

  Luca.config.autoApplyClassHierarchyAsCssClasses = true;

  Luca.autoRegister = Luca.config.autoRegister = true;

  Luca.developmentMode = Luca.config.developmentMode = false;

  Luca.enableGlobalObserver = Luca.config.enableGlobalObserver = false;

  Luca.config.enableBoostrap = Luca.config.enableBootstrap = true;

  Luca.config.enhancedViewProperties = true;

  Luca.keys = Luca.config.keys = {
    ENTER: 13,
    ESCAPE: 27,
    KEYLEFT: 37,
    KEYUP: 38,
    KEYRIGHT: 39,
    KEYDOWN: 40,
    SPACEBAR: 32,
    FORWARDSLASH: 191
  };

  Luca.keyMap = Luca.config.keyMap = _(Luca.keys).inject(function(memo, value, symbol) {
    memo[value] = symbol.toLowerCase();
    return memo;
  }, {});

  Luca.config.showWarnings = true;

  Luca.setupCollectionSpace = function(options) {
    var baseParams, modelBootstrap;
    if (options == null) options = {};
    baseParams = options.baseParams, modelBootstrap = options.modelBootstrap;
    if (baseParams != null) {
      Luca.Collection.baseParams(baseParams);
    } else {
      Luca.warn('You should remember to set the base params for Luca.Collection class.  You can do this by defining a property or function on Luca.config.baseParams');
    }
    if (modelBootstrap != null) {
      return Luca.Collection.bootstrap(modelBootstrap);
    } else {
      return Luca.warn("You should remember to set the model bootstrap location for Luca.Collection.  You can do this by defining a property or function on Luca.config.modelBootstrap");
    }
  };

  Luca.initialize = function(namespace, options) {
    var defaults, object;
    if (options == null) options = {};
    defaults = {
      views: {},
      collections: {},
      models: {},
      components: {},
      lib: {},
      util: {},
      concerns: {},
      register: function() {
        return Luca.register.apply(this, arguments);
      },
      onReady: function() {
        return Luca.onReady.apply(this, arguments);
      },
      getApplication: function() {
        var _ref;
        return (_ref = Luca.getApplication) != null ? _ref.apply(this, arguments) : void 0;
      },
      getCollectionManager: function() {
        var _ref;
        return (_ref = Luca.CollectionManager.get) != null ? _ref.apply(this, arguments) : void 0;
      },
      route: Luca.routeHelper
    };
    object = {};
    object[namespace] = _.extend(Luca.getHelper(), defaults);
    _.extend(Luca.config, options);
    _.extend(window || global, object);
    Luca.concern.namespace("" + namespace + ".concerns");
    Luca.registry.namespace("" + namespace + ".views");
    Luca.Collection.namespace("" + namespace + ".collections");
    return Luca.on("ready", function() {
      return Luca.setupCollectionSpace(options);
    });
  };

  Luca.onReady = function(callback) {
    Luca.define.close();
    Luca.trigger("ready");
    return $(function() {
      return callback.apply(this, arguments);
    });
  };

  Luca.warn = function(message) {
    if (Luca.config.showWarnings === true) return console.log(message);
  };

  Luca.find = function(el) {
    return Luca($(el).data('luca-id'));
  };

  Luca.supportsEvents = Luca.supportsBackboneEvents = function(obj) {
    return Luca.isComponent(obj) || (_.isFunction(obj != null ? obj.trigger : void 0) || _.isFunction(obj != null ? obj.bind : void 0));
  };

  Luca.isComponent = function(obj) {
    return Luca.isBackboneModel(obj) || Luca.isBackboneView(obj) || Luca.isBackboneCollection(obj);
  };

  Luca.isComponentPrototype = function(obj) {
    return Luca.isViewPrototype(obj) || Luca.isModelPrototype(obj) || Luca.isCollectionPrototype(obj);
  };

  Luca.isBackboneModel = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.set : void 0) && _.isFunction(obj != null ? obj.get : void 0) && _.isObject(obj != null ? obj.attributes : void 0);
  };

  Luca.isBackboneView = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.render : void 0) && !_.isUndefined(obj != null ? obj.el : void 0);
  };

  Luca.isBackboneCollection = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return _.isFunction(obj != null ? obj.fetch : void 0) && _.isFunction(obj != null ? obj.reset : void 0);
  };

  Luca.isViewPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (obj.prototype != null) && (obj.prototype.make != null) && (obj.prototype.$ != null) && (obj.prototype.render != null);
  };

  Luca.isModelPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (typeof obj.prototype === "function" ? obj.prototype((obj.prototype.save != null) && (obj.prototype.changedAttributes != null)) : void 0);
  };

  Luca.isCollectionPrototype = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    return (obj != null) && (obj.prototype != null) && !Luca.isModelPrototype(obj) && (obj.prototype.reset != null) && (obj.prototype.select != null) && (obj.prototype.reject != null);
  };

  Luca.inheritanceChain = function(obj) {
    return Luca.parentClasses(obj);
  };

  Luca.parentClasses = function(obj) {
    var list, metaData, _base;
    list = [];
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    metaData = typeof obj.componentMetaData === "function" ? obj.componentMetaData() : void 0;
    metaData || (metaData = typeof (_base = obj.prototype).componentMetaData === "function" ? _base.componentMetaData() : void 0);
    return list = (metaData != null ? metaData.classHierarchy() : void 0) || [obj.displayName || obj.prototype.displayName];
  };

  Luca.parentClass = function(obj, resolve) {
    var parent, _base, _ref, _ref2, _ref3;
    if (resolve == null) resolve = true;
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    parent = typeof obj.componentMetaData === "function" ? (_ref = obj.componentMetaData()) != null ? _ref.meta["super class name"] : void 0 : void 0;
    parent || (parent = typeof (_base = obj.prototype).componentMetaData === "function" ? (_ref2 = _base.componentMetaData()) != null ? _ref2.meta["super class name"] : void 0 : void 0);
    parent || obj.displayName || ((_ref3 = obj.prototype) != null ? _ref3.displayName : void 0);
    if (resolve) {
      return Luca.util.resolve(parent);
    } else {
      return parent;
    }
  };

  Luca.template = function(template_name, variables) {
    var jst, luca, needle, template, _ref;
    window.JST || (window.JST = {});
    if (_.isFunction(template_name)) return template_name(variables);
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
    if (!(luca || jst)) throw "Could not find template named " + template_name;
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
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/bootstrap_form_controls"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="btn-group form-actions">\n  <a class="btn btn-primary submit-button">\n    <i class="icon icon-ok icon-white"></i>\n    Save Changes\n  </a>\n  <a class="btn reset-button cancel-button">\n    <i class="icon icon-remove"></i>\n    Cancel\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/collection_loader_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="progress-modal" class="modal" style="display: none">\n  <div class="progress progress-info progress-striped active">\n    <div class="bar" style="width:0%;"></div>\n  </div>\n  <div class="message">Initializing...</div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/form_alert"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="', className ,'">\n  <a class="close" href="#" data-dismiss="alert">x</a>\n  ', message ,'\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-g-view-wrapper">\n  <div class="g-view-header"></div>\n  <div class="luca-ui-g-view-body">\n    <table class="luca-ui-g-view scrollable-table" width="100%" cellpadding=0 cellspacing=0>\n      <thead class="fixed"></thead>\n      <tbody class="scrollable"></tbody>\n      <tfoot></tfoot>\n    </table>\n  </div>\n  <div class="luca-ui-g-view-header"></div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/grid_view_empty_text"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="empty-text empty-text-wrapper">\n  <p>', text ,'</p>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/load_mask"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="load-mask">\n  <div class="progress progress-striped active">\n    <div class="bar" style="width:0%"></div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/nav_bar"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="navbar-inner">\n  <div class="luca-ui-navbar-body container">\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/components/pagination"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="pagination">\n  <a class="btn previous">\n    <i class="icon icon-chevron-left"></i>\n  </a>\n  <div class="pagination-group">\n  </div>\n  <a class="btn next">\n    <i class="icon icon-chevron-right"></i>\n  </a>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/basic"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', id ,'" class="', classes ,'" style="', style ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_selector_container"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div id="', cid ,'-tab-selector" class="tab-selector-container">\n  <ul id="', cid ,'-tabs-nav" class="nav nav-tabs">\n    '); for(var i = 0; i < components.length; i++ ) { __p.push('\n    '); var component = components[i];__p.push('\n    <li class="tab-selector" data-target="', i ,'">\n      <a data-target="', i ,'">\n        ', component.title ,'\n      </a>\n    </li>\n    '); } __p.push('\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/tab_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul id="', cid ,'-tabs-selector" class="nav ', navClass ,'"></ul>\n<div id="', cid ,'-tab-view-content" class="tab-content"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/containers/toolbar_wrapper"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="luca-ui-toolbar-wrapper" id="', id ,'"></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label>&nbsp;</label>\n<input style="', inputStyles ,'" class="btn ', input_class ,'" value="', input_value ,'" type="', input_type ,'" id="<%= input_id" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/button_field_link"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<a class="btn ', input_class ,'">\n  '); if(icon_class.length) { __p.push('\n  <i class="', icon_class ,'"></i>\n  ', input_value ,'\n  '); } __p.push('\n</a>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="control-group">\n  <label for="', input_id ,'"><%= label =>\n  <div class="controls"><div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_array_item"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  <input id="', input_id ,'" type="checkbox" name="', input_name ,'" value="', value ,'" />\n</label>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/checkbox_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="checkbox" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/file_upload_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n  <input type="file" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n</label>\n\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/hidden_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(' <input type="hidden" name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" />\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/select_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <select name="', input_name ,'" value="', input_value ,'" style="', inputStyles ,'" ></select>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_area_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<label for="', input_id ,'">\n  ', label ,'\n</label>\n<div class="controls">\n <textarea placeholder="', placeHolder ,'" name="', input_name ,'" style="', inputStyles ,'" >', input_value ,'</textarea>\n  '); if(helperText) { __p.push('\n  <p class="helper-text help-block">\n    ', helperText ,'\n  </p>\n  '); } __p.push('\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/fields/text_field"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(''); if(typeof(label)!=="undefined" && (typeof(hideLabel) !== "undefined" && !hideLabel) || (typeof(hideLabel)==="undefined")) {__p.push('\n<label class="control-label" for="', input_id ,'">', label ,'</label>\n'); } __p.push('\n\n<div class="controls">\n'); if( typeof(addOn) !== "undefined" ) { __p.push('\n  <span class="add-on">', addOn ,'</span>\n'); } __p.push('\n<input type="text" placeholder="', placeHolder ,'" name="', input_name ,'" style="', inputStyles ,'" value="', input_value ,'" />\n'); if(helperText) { __p.push('\n<p class="helper-text help-block">\n  ', helperText ,'\n</p>\n'); } __p.push('\n\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-src/templates/table_view"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<thead></thead>\n<tbody class="table-body"></tbody>\n<tfoot></tfoot>\n<caption></caption>\n');}return __p.join('');};
}).call(this);
(function() {
  var currentNamespace,
    __slice = Array.prototype.slice;

  Luca.util.resolve = function(accessor, source_object) {
    var resolved;
    try {
      source_object || (source_object = window || global);
      resolved = _(accessor.split(/\./)).inject(function(obj, key) {
        return obj = obj != null ? obj[key] : void 0;
      }, source_object);
    } catch (e) {
      console.log("Error resolving", accessor, source_object);
      throw e;
    }
    return resolved;
  };

  Luca.util.nestedValue = Luca.util.resolve;

  Luca.util.argumentsLogger = function(prompt) {
    return function() {
      return console.log(prompt, arguments);
    };
  };

  Luca.util.read = function() {
    var args, property;
    property = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (_.isFunction(property)) {
      return property.apply(this, args);
    } else {
      return property;
    }
  };

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

  Luca.util.toCssClass = function() {
    var componentName, exclusions, part, parts, transformed;
    componentName = arguments[0], exclusions = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    parts = componentName.split('.');
    transformed = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        if (!(_(exclusions).indexOf(part) === -1)) continue;
        part = _.str.underscored(part);
        part = part.replace(/_/g, '-');
        _results.push(part);
      }
      return _results;
    })();
    return transformed.join('-');
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

  Luca.util.loadScript = function(url, callback) {
    var script;
    script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          return callback();
        } else {
          return script.onload = function() {
            return callback();
          };
        }
      };
    }
    script.src = url;
    return document.body.appendChild(script);
  };

  Luca.util.make = Backbone.View.prototype.make;

  Luca.util.list = function(list, options, ordered) {
    var container, item, _i, _len;
    if (options == null) options = {};
    container = ordered ? "ol" : "ul";
    container = Luca.util.make(container, options);
    if (_.isArray(list)) {
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        $(container).append(Luca.util.make("li", {}, item));
      }
    }
    return container.outerHTML;
  };

  Luca.util.label = function(contents, type, baseClass) {
    var cssClass;
    if (contents == null) contents = "";
    if (baseClass == null) baseClass = "label";
    cssClass = baseClass;
    if (type != null) cssClass += " " + baseClass + "-" + type;
    return Luca.util.make("span", {
      "class": cssClass
    }, contents);
  };

  Luca.util.badge = function(contents, type, baseClass) {
    var cssClass;
    if (contents == null) contents = "";
    if (baseClass == null) baseClass = "badge";
    cssClass = baseClass;
    if (type != null) cssClass += " " + baseClass + "-" + type;
    return Luca.util.make("span", {
      "class": cssClass
    }, contents);
  };

  Luca.util.setupHooks = function(set) {
    var _this = this;
    set || (set = this.hooks);
    return _(set).each(function(eventId) {
      var callback, fn;
      fn = Luca.util.hook(eventId);
      callback = function() {
        var _ref;
        return (_ref = this[fn]) != null ? _ref.apply(this, arguments) : void 0;
      };
      if (eventId != null ? eventId.match(/once:/) : void 0) {
        callback = _.once(callback);
      }
      return _this.on(eventId, callback, _this);
    });
  };

  Luca.util.setupHooksAdvanced = function(set) {
    var _this = this;
    set || (set = this.hooks);
    return _(set).each(function(eventId) {
      var callback, entry, fn, hookSetup, _i, _len, _results;
      hookSetup = _this[Luca.util.hook(eventId)];
      if (!_.isArray(hookSetup)) hookSetup = [hookSetup];
      _results = [];
      for (_i = 0, _len = hookSetup.length; _i < _len; _i++) {
        entry = hookSetup[_i];
        fn = _.isString(entry) ? _this[entry] : void 0;
        if (_.isFunction(entry)) fn = entry;
        callback = function() {
          var _ref;
          return (_ref = this[fn]) != null ? _ref.apply(this, arguments) : void 0;
        };
        if (eventId != null ? eventId.match(/once:/) : void 0) {
          callback = _.once(callback);
        }
        _results.push(_this.on(eventId, callback, _this));
      }
      return _results;
    });
  };

}).call(this);
(function() {

  Luca.DevelopmentToolHelpers = {
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
    }
  };

}).call(this);
(function() {
  var DeferredBindingProxy,
    __slice = Array.prototype.slice;

  DeferredBindingProxy = (function() {

    function DeferredBindingProxy(object, operation, wrapWithUnderscore) {
      var fn;
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
        this.fn = _.bind(function() {
          return _.defer(fn);
        }, this.object);
      } else {
        this.fn = _.bind(fn, this.object);
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

  Luca.EventsExt = {
    waitUntil: function(trigger, context) {
      return this.waitFor.call(this, trigger, context);
    },
    waitFor: function(trigger, context) {
      var proxy, self;
      self = this;
      return proxy = {
        on: function(target) {
          return target.waitFor.call(target, trigger, context);
        },
        and: function() {
          var fn, runList, _i, _len, _results;
          runList = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          _results = [];
          for (_i = 0, _len = runList.length; _i < _len; _i++) {
            fn = runList[_i];
            fn = _.isFunction(fn) ? fn : self[fn];
            _results.push(self.once(trigger, fn, context));
          }
          return _results;
        },
        andThen: function() {
          return self.and.apply(self, arguments);
        }
      };
    },
    relayEvent: function(trigger) {
      var _this = this;
      return {
        on: function() {
          var components;
          components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return {
            to: function() {
              var component, target, targets, _i, _len, _results;
              targets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              _results = [];
              for (_i = 0, _len = targets.length; _i < _len; _i++) {
                target = targets[_i];
                _results.push((function() {
                  var _j, _len2, _results2,
                    _this = this;
                  _results2 = [];
                  for (_j = 0, _len2 = components.length; _j < _len2; _j++) {
                    component = components[_j];
                    _results2.push(component.on(trigger, function() {
                      var args;
                      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                      args.unshift(trigger);
                      return target.trigger.apply(target, args);
                    }));
                  }
                  return _results2;
                }).call(_this));
              }
              return _results;
            }
          };
        }
      };
    }
  };

}).call(this);
(function() {

  Luca.concern = function(mixinName) {
    var namespace, resolved;
    namespace = _(Luca.concern.namespaces).detect(function(space) {
      var _ref;
      return ((_ref = Luca.util.resolve(space)) != null ? _ref[mixinName] : void 0) != null;
    });
    namespace || (namespace = "Luca.concerns");
    resolved = Luca.util.resolve(namespace)[mixinName];
    if (resolved == null) {
      console.log("Could not find " + mixinName + " in ", Luca.concern.namespaces);
    }
    return resolved;
  };

  Luca.concern.namespaces = ["Luca.concerns"];

  Luca.concern.namespace = function(namespace) {
    Luca.concern.namespaces.push(namespace);
    return Luca.concern.namespaces = _(Luca.concern.namespaces).uniq();
  };

  Luca.concern.setup = function() {
    var module, _i, _len, _ref, _ref2, _ref3, _ref4, _results;
    if (((_ref = this.concerns) != null ? _ref.length : void 0) > 0) {
      _ref2 = this.concerns;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        module = _ref2[_i];
        _results.push((_ref3 = Luca.concern(module)) != null ? (_ref4 = _ref3.__initializer) != null ? _ref4.call(this, this, module) : void 0 : void 0);
      }
      return _results;
    }
  };

  Luca.decorate = function(target) {
    var componentClass, componentName, componentPrototype;
    try {
      if (_.isString(target)) {
        componentName = target;
        componentClass = Luca.util.resolve(componentName);
      }
      if (_.isFunction(target)) componentClass = target;
      componentPrototype = componentClass.prototype;
      componentName = componentName || componentClass.displayName;
      componentName || (componentName = componentPrototype.displayName);
    } catch (e) {
      console.log(e.message);
      console.log(e.stack);
      console.log("Error calling Luca.decorate on ", componentClass, componentPrototype, componentName);
      throw e;
    }
    return {
      "with": function(mixinName) {
        var fn, method, mixinDefinition, mixinPrivates, sanitized, superclassMixins, _ref;
        mixinDefinition = Luca.concern(mixinName);
        mixinDefinition.__displayName || (mixinDefinition.__displayName = mixinName);
        mixinPrivates = _(mixinDefinition).chain().keys().select(function(key) {
          return ("" + key).match(/^__/) || key === "classMethods";
        });
        sanitized = _(mixinDefinition).omit(mixinPrivates.value());
        _.extend(componentPrototype, sanitized);
        if (mixinDefinition.classMethods != null) {
          _ref = mixinDefinition.classMethods;
          for (method in _ref) {
            fn = _ref[method];
            componentClass[method] = _.bind(fn, componentClass);
          }
        }
        if (mixinDefinition != null) {
          if (typeof mixinDefinition.__included === "function") {
            mixinDefinition.__included(componentName, componentClass, mixinDefinition);
          }
        }
        superclassMixins = componentPrototype._superClass().prototype.concerns;
        componentPrototype.concerns || (componentPrototype.concerns = []);
        componentPrototype.concerns.push(mixinName);
        componentPrototype.concerns = componentPrototype.concerns.concat(superclassMixins);
        componentPrototype.concerns = _(componentPrototype.concerns).chain().uniq().compact().value();
        return componentPrototype;
      }
    };
  };

}).call(this);
(function() {
  var ComponentDefinition, cd,
    __slice = Array.prototype.slice;

  ComponentDefinition = (function() {

    function ComponentDefinition(componentName, autoRegister) {
      var parts;
      this.autoRegister = autoRegister != null ? autoRegister : true;
      this.namespace = Luca.util.namespace();
      this.componentId = this.componentName = componentName;
      this.superClassName = 'Luca.View';
      this.properties || (this.properties = {});
      this._classProperties || (this._classProperties = {});
      if (componentName.match(/\./)) {
        this.namespaced = true;
        parts = componentName.split('.');
        this.componentId = parts.pop();
        this.namespace = parts.join('.');
        Luca.registry.addNamespace(parts.join('.'));
      }
      Luca.define.__definitions.push(this);
    }

    ComponentDefinition.create = function(componentName, autoRegister) {
      if (autoRegister == null) autoRegister = Luca.config.autoRegister;
      return new ComponentDefinition(componentName, autoRegister);
    };

    ComponentDefinition.prototype.isValid = function() {
      if (!_.isObject(this.properties)) return false;
      if (Luca.util.resolve(this.superClassName) == null) return false;
      if (this.componentName == null) return false;
      return true;
    };

    ComponentDefinition.prototype.isDefined = function() {
      return this.defined === true;
    };

    ComponentDefinition.prototype.isOpen = function() {
      return !!(this.isValid() && !this.isDefined());
    };

    ComponentDefinition.prototype.meta = function(key, value) {
      var data, metaKey;
      metaKey = this.namespace + '.' + this.componentId;
      metaKey = metaKey.replace(/^\./, '');
      data = Luca.registry.addMetaData(metaKey, key, value);
      return this.properties.componentMetaData = function() {
        return Luca.registry.getMetaDataFor(metaKey);
      };
    };

    ComponentDefinition.prototype["in"] = function(namespace) {
      this.namespace = namespace;
      return this;
    };

    ComponentDefinition.prototype.from = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype["extends"] = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype.extend = function(superClassName) {
      this.superClassName = superClassName;
      return this;
    };

    ComponentDefinition.prototype.triggers = function() {
      var hook, hooks, _i, _len;
      hooks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        hooks: []
      });
      for (_i = 0, _len = hooks.length; _i < _len; _i++) {
        hook = hooks[_i];
        this.properties.hooks.push(hook);
      }
      this.properties.hooks = _.uniq(this.properties.hooks);
      this.meta("hooks", this.properties.hooks);
      return this;
    };

    ComponentDefinition.prototype.includes = function() {
      var include, includes, _i, _len;
      includes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        include: []
      });
      for (_i = 0, _len = includes.length; _i < _len; _i++) {
        include = includes[_i];
        this.properties.include.push(include);
      }
      this.properties.include = _.uniq(this.properties.include);
      this.meta("includes", this.properties.include);
      return this;
    };

    ComponentDefinition.prototype.mixesIn = function() {
      var concern, concerns, _i, _len;
      concerns = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties || (this.properties = {}), {
        concerns: []
      });
      for (_i = 0, _len = concerns.length; _i < _len; _i++) {
        concern = concerns[_i];
        this.properties.concerns.push(concern);
      }
      this.properties.concerns = _.uniq(this.properties.concerns);
      this.meta("concerns", this.properties.concerns);
      return this;
    };

    ComponentDefinition.prototype.contains = function() {
      var components;
      components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _.defaults(this.properties, {
        components: []
      });
      this.properties.components = components;
      return this;
    };

    ComponentDefinition.prototype.validatesConfigurationWith = function(validationConfiguration) {
      if (validationConfiguration == null) validationConfiguration = {};
      this.meta("configuration validations", validationConfiguration);
      this.properties.validatable = true;
      return this;
    };

    ComponentDefinition.prototype.beforeDefinition = function(callback) {
      this._classProperties.beforeDefinition = callback;
      return this;
    };

    ComponentDefinition.prototype.afterDefinition = function(callback) {
      this._classProperties.afterDefinition = callback;
      return this;
    };

    ComponentDefinition.prototype.classConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("class configuration", _.keys(properties));
      _.defaults((this._classProperties || (this._classProperties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.publicConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("public configuration", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.privateConfiguration = function(properties) {
      if (properties == null) properties = {};
      this.meta("private configuration", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.classInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("class interface", _.keys(properties));
      _.defaults((this._classProperties || (this._classProperties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.publicInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("public interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.privateInterface = function(properties) {
      if (properties == null) properties = {};
      this.meta("private interface", _.keys(properties));
      _.defaults((this.properties || (this.properties = {})), properties);
      return this;
    };

    ComponentDefinition.prototype.definePrototype = function(properties) {
      var at, componentType, definition, _base, _ref, _ref2;
      if (properties == null) properties = {};
      _.defaults((this.properties || (this.properties = {})), properties);
      at = this.namespaced ? Luca.util.resolve(this.namespace, window || global) : window || global;
      if (this.namespaced && !(at != null)) {
        eval("(window||global)." + this.namespace + " = {}");
        at = Luca.util.resolve(this.namespace, window || global);
      }
      this.meta("super class name", this.superClassName);
      this.meta("display name", this.componentName);
      this.properties.displayName = this.componentName;
      this.properties.componentMetaData = function() {
        return Luca.registry.getMetaDataFor(this.displayName);
      };
      if ((_ref = this._classProperties) != null) {
        if (typeof _ref.beforeDefinition === "function") {
          _ref.beforeDefinition(this);
        }
      }
      definition = at[this.componentId] = Luca.extend(this.superClassName, this.componentName, this.properties);
      if (this.autoRegister === true) {
        if (Luca.isViewPrototype(definition)) componentType = "view";
        if (Luca.isCollectionPrototype(definition)) {
          (_base = Luca.Collection).namespaces || (_base.namespaces = []);
          Luca.Collection.namespaces.push(this.namespace);
          componentType = "collection";
        }
        if (Luca.isModelPrototype(definition)) componentType = "model";
        Luca.registerComponent(_.string.underscored(this.componentId), this.componentName, componentType);
      }
      this.defined = true;
      if (!_.isEmpty(this._classProperties)) {
        _.extend(definition, this._classProperties);
      }
      if (definition != null) {
        if ((_ref2 = definition.afterDefinition) != null) {
          _ref2.call(definition, this);
        }
      }
      return definition;
    };

    return ComponentDefinition;

  })();

  cd = ComponentDefinition.prototype;

  cd.concerns = cd.behavesAs = cd.uses = cd.mixesIn;

  cd.register = cd.defines = cd.defaults = cd.exports = cd.defaultProperties = cd.definePrototype;

  cd.defaultsTo = cd.enhance = cd["with"] = cd.definePrototype;

  cd.publicMethods = cd.publicInterface;

  cd.privateMethods = cd.privateInterface;

  cd.classMethods = cd.classInterface;

  _.extend((Luca.define = ComponentDefinition.create), {
    __definitions: [],
    incomplete: function() {
      return _(Luca.define.__definitions).select(function(definition) {
        return definition.isOpen();
      });
    },
    close: function() {
      var open, _i, _len, _ref;
      _ref = Luca.define.incomplete();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        open = _ref[_i];
        if (open.isValid()) open.register();
      }
      return Luca.define.__definitions.length = 0;
    },
    findDefinition: function(componentName) {
      return _(Luca.define.__definitions).detect(function(definition) {
        return definition.componentName === componentName;
      });
    }
  });

  Luca.register = function(componentName) {
    return new ComponentDefinition(componentName, true);
  };

  _.mixin({
    def: Luca.define
  });

  Luca.extend = function(superClassName, childName, properties) {
    var definition, include, superClass, _i, _len, _ref;
    if (properties == null) properties = {};
    superClass = Luca.util.resolve(superClassName, window || global);
    if (!_.isFunction(superClass != null ? superClass.extend : void 0)) {
      throw "Error defining " + childName + ". " + superClassName + " is not a valid component to extend from";
    }
    properties.displayName = childName;
    properties._superClass = function() {
      superClass.displayName || (superClass.displayName = superClassName);
      return superClass;
    };
    properties._super = function(method, context, args) {
      var _ref;
      if (context == null) context = this;
      if (args == null) args = [];
      return (_ref = this._superClass().prototype[method]) != null ? _ref.apply(context, args) : void 0;
    };
    definition = superClass.extend(properties);
    if (_.isArray(properties != null ? properties.include : void 0)) {
      _ref = properties.include;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        include = _ref[_i];
        if (_.isString(include)) include = Luca.util.resolve(include);
        _.extend(definition.prototype, include);
      }
    }
    return definition;
  };

}).call(this);
(function() {

  Luca.concerns.ApplicationEventBindings = {
    __initializer: function() {
      var app, eventTrigger, handler, _len, _ref, _ref2, _results;
      if (_.isEmpty(this.applicationEvents)) return;
      app = this.app;
      if (_.isString(app) || _.isUndefined(app)) {
        app = (_ref = Luca.Application) != null ? typeof _ref.get === "function" ? _ref.get(app) : void 0 : void 0;
      }
      if (!Luca.supportsEvents(app)) {
        throw "Error binding to the application object on " + (this.name || this.cid);
      }
      _ref2 = this.applicationEvents;
      _results = [];
      for (handler = 0, _len = _ref2.length; handler < _len; handler++) {
        eventTrigger = _ref2[handler];
        if (_.isString(handler)) handler = this[handler];
        if (!_.isFunction(handler)) {
          throw "Error registering application event " + eventTrigger + " on " + (this.name || this.cid);
        }
        _results.push(app.on(eventTrigger, handler));
      }
      return _results;
    }
  };

}).call(this);
(function() {

  Luca.concerns.CollectionEventBindings = {
    __initializer: function() {
      var collection, eventTrigger, handler, key, manager, signature, _ref, _ref2, _results;
      if (_.isEmpty(this.collectionEvents)) return;
      manager = this.collectionManager || Luca.CollectionManager.get();
      _ref = this.collectionEvents;
      _results = [];
      for (signature in _ref) {
        handler = _ref[signature];
        _ref2 = signature.split(" "), key = _ref2[0], eventTrigger = _ref2[1];
        collection = manager.getOrCreate(key);
        if (!collection) throw "Could not find collection specified by " + key;
        if (_.isString(handler)) handler = this[handler];
        if (!_.isFunction(handler)) throw "invalid collectionEvents configuration";
        try {
          _results.push(collection.on(eventTrigger, handler, collection));
        } catch (e) {
          console.log("Error Binding To Collection in registerCollectionEvents", this);
          throw e;
        }
      }
      return _results;
    }
  };

}).call(this);
(function() {

  Luca.concerns.Deferrable = {
    configure_collection: function(setAsDeferrable) {
      var collectionManager, _ref, _ref2;
      if (setAsDeferrable == null) setAsDeferrable = true;
      if (!this.collection) return;
      if (_.isString(this.collection) && (collectionManager = (_ref = Luca.CollectionManager) != null ? _ref.get() : void 0)) {
        this.collection = collectionManager.getOrCreate(this.collection);
      }
      if (_.isObject(this.collection) && !Luca.isBackboneCollection(this.collection)) {
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

  Luca.concerns.DomHelpers = {
    __initializer: function() {
      var additional, additionalClasses, classes, cssClass, _i, _j, _len, _len2, _ref, _results;
      additionalClasses = _(this.additionalClassNames || []).clone();
      if (this.wrapperClass != null) this.$wrap(this.wrapperClass);
      if (_.isString(additionalClasses)) {
        additionalClasses = additionalClasses.split(" ");
      }
      if (this.gridSpan) additionalClasses.push("span" + this.gridSpan);
      if (this.gridOffset) additionalClasses.push("offset" + this.gridOffset);
      if (this.gridRowFluid) additionalClasses.push("row-fluid");
      if (this.gridRow) additionalClasses.push("row");
      if (additionalClasses == null) return;
      for (_i = 0, _len = additionalClasses.length; _i < _len; _i++) {
        additional = additionalClasses[_i];
        this.$el.addClass(additional);
      }
      if (Luca.config.autoApplyClassHierarchyAsCssClasses === true) {
        classes = (typeof this.componentMetaData === "function" ? (_ref = this.componentMetaData()) != null ? _ref.styleHierarchy() : void 0 : void 0) || [];
        _results = [];
        for (_j = 0, _len2 = classes.length; _j < _len2; _j++) {
          cssClass = classes[_j];
          if (cssClass !== "luca-view" && cssClass !== "backbone-view") {
            _results.push(this.$el.addClass(cssClass));
          }
        }
        return _results;
      }
    },
    $wrap: function(wrapper) {
      if (_.isString(wrapper) && !wrapper.match(/[<>]/)) {
        wrapper = this.make("div", {
          "class": wrapper,
          "data-wrapper": true
        });
      }
      return this.$el.wrap(wrapper);
    },
    $wrapper: function() {
      return this.$el.parent('[data-wrapper="true"]');
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
    $bodyEl: function() {
      return this.$el;
    },
    $container: function() {
      return $(this.container);
    }
  };

}).call(this);
(function() {

  Luca.concerns.EnhancedProperties = {
    __initializer: function() {
      if (Luca.config.enhancedViewProperties !== true) return;
      if (_.isString(this.collection) && Luca.CollectionManager.get()) {
        this.collection = Luca.CollectionManager.get().getOrCreate(this.collection);
      }
      if (this.template != null) this.$template(this.template, this);
      if (_.isString(this.collectionManager)) {
        return this.collectionManager = Luca.CollectionManager.get(this.collectionManager);
      }
    }
  };

}).call(this);
(function() {
  var FilterModel,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Luca.concerns.Filterable = {
    __included: function(component, module) {
      return _.extend(Luca.Collection.prototype, {
        __filters: {}
      });
    },
    __initializer: function(component, module) {
      var filter, _base, _ref,
        _this = this;
      if (this.filterable === false) return;
      if (!Luca.isBackboneCollection(this.collection)) {
        this.collection = typeof (_base = Luca.CollectionManager).get === "function" ? (_ref = _base.get()) != null ? _ref.getOrCreate(this.collection) : void 0 : void 0;
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        this.debug("Skipping Filterable due to no collection being present on " + (this.name || this.cid));
        this.debug("Collection", this.collection);
        return;
      }
      this.getCollection || (this.getCollection = function() {
        return this.collection;
      });
      filter = this.getFilterState();
      this.querySources || (this.querySources = []);
      this.optionsSources || (this.optionsSources = []);
      this.query || (this.query = {});
      this.queryOptions || (this.queryOptions = {});
      this.querySources.push((function(options) {
        if (options == null) options = {};
        return _this.getFilterState().toQuery();
      }));
      this.optionsSources.push((function(options) {
        if (options == null) options = {};
        return _this.getFilterState().toOptions();
      }));
      filter.on("change", function() {
        var options, prepared;
        filter = _.clone(_this.getQuery());
        options = _.clone(_this.getQueryOptions());
        prepared = _this.prepareRemoteFilter(filter, options);
        if (_this.isRemote()) {
          return _this.collection.applyFilter(prepared, {
            remote: true
          });
        } else {
          return _this.trigger("refresh");
        }
      });
      return module;
    },
    prepareRemoteFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      if (options.limit != null) filter.limit = options.limit;
      if (options.page != null) filter.page = options.page;
      if (options.sortBy != null) filter.sortBy = options.sortBy;
      return filter;
    },
    isRemote: function() {
      return this.getQueryOptions().remote === true;
    },
    getFilterState: function() {
      var _base, _name;
      return (_base = this.collection.__filters)[_name = this.cid] || (_base[_name] = new FilterModel(this.filterable));
    },
    setSortBy: function(sortBy, options) {
      if (options == null) options = {};
      return this.getFilterState().setOption('sortBy', sortBy, options);
    },
    applyFilter: function(query, options) {
      if (query == null) query = {};
      if (options == null) options = {};
      options = _.defaults(options, this.getQueryOptions());
      query = _.defaults(query, this.getQuery());
      return this.getFilterState().set({
        query: query,
        options: options
      }, options);
    }
  };

  FilterModel = (function(_super) {

    __extends(FilterModel, _super);

    function FilterModel() {
      FilterModel.__super__.constructor.apply(this, arguments);
    }

    FilterModel.prototype.defaults = {
      options: {},
      query: {}
    };

    FilterModel.prototype.setOption = function(option, value, options) {
      var payload;
      payload = {};
      payload[option] = value;
      return this.set('options', _.extend(this.toOptions(), payload), options);
    };

    FilterModel.prototype.setQueryOption = function(option, value, options) {
      var payload;
      payload = {};
      payload[option] = value;
      return this.set('query', _.extend(this.toQuery(), payload), options);
    };

    FilterModel.prototype.toOptions = function() {
      return this.toJSON().options;
    };

    FilterModel.prototype.toQuery = function() {
      return this.toJSON().query;
    };

    FilterModel.prototype.toRemote = function() {
      var options;
      options = this.toOptions();
      return _.extend(this.toQuery(), {
        limit: options.limit,
        page: options.page,
        sortBy: options.sortBy
      });
    };

    return FilterModel;

  })(Backbone.Model);

}).call(this);
(function() {

  Luca.concerns.GridLayout = {
    _initializer: function() {
      if (this.gridSpan) this.$el.addClass("span" + this.gridSpan);
      if (this.gridOffset) this.$el.addClass("offset" + this.gridOffset);
      if (this.gridRowFluid) this.$el.addClass("row-fluid");
      if (this.gridRow) return this.$el.addClass("row");
    }
  };

}).call(this);
(function() {

  Luca.concerns.LoadMaskable = {
    __initializer: function() {
      var _this = this;
      if (this.loadMask !== true) return;
      if (this.loadMask === true) {
        this.defer(function() {
          _this.$el.addClass('with-mask');
          if (_this.$('.load-mask').length === 0) {
            _this.loadMaskTarget().prepend(Luca.template(_this.loadMaskTemplate, _this));
            return _this.$('.load-mask').hide();
          }
        }).until("after:render");
        this.on(this.loadmaskEnableEvent || "enable:loadmask", this.applyLoadMask, this);
        return this.on(this.loadmaskDisableEvent || "disable:loadmask", this.applyLoadMask, this);
      }
    },
    showLoadMask: function() {
      return this.trigger("enable:loadmask");
    },
    hideLoadMask: function() {
      return this.trigger("disable:loadmask");
    },
    loadMaskTarget: function() {
      if (this.loadMaskEl != null) {
        return this.$(this.loadMaskEl);
      } else {
        return this.$bodyEl();
      }
    },
    disableLoadMask: function() {
      this.$('.load-mask .bar').css("width", "100%");
      this.$('.load-mask').hide();
      return clearInterval(this.loadMaskInterval);
    },
    enableLoadMask: function() {
      var maxWidth,
        _this = this;
      this.$('.load-mask').show().find('.bar').css("width", "0%");
      maxWidth = this.$('.load-mask .progress').width();
      if (maxWidth < 20 && (maxWidth = this.$el.width()) < 20) {
        maxWidth = this.$el.parent().width();
      }
      this.loadMaskInterval = setInterval(function() {
        var currentWidth, newWidth;
        currentWidth = _this.$('.load-mask .bar').width();
        newWidth = currentWidth + 12;
        return _this.$('.load-mask .bar').css('width', newWidth);
      }, 200);
      if (this.loadMaskTimeout == null) return;
      return _.delay(function() {
        return _this.disableLoadMask();
      }, this.loadMaskTimeout);
    },
    applyLoadMask: function() {
      if (this.$('.load-mask').is(":visible")) {
        return this.disableLoadMask();
      } else {
        return this.enableLoadMask();
      }
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
  var applyModalConfig;

  Luca.concerns.ModalView = {
    closeOnEscape: true,
    showOnInitialize: false,
    backdrop: false,
    __initializer: function() {
      this.$el.addClass("modal");
      this.on("before:render", applyModalConfig, this);
      return this;
    },
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
    }
  };

  applyModalConfig = function() {
    this.$el.addClass('modal');
    if (this.fade === true) this.$el.addClass('fade');
    $('body').append(this.$el);
    this.$el.modal({
      backdrop: this.backdrop === true,
      keyboard: this.closeOnEscape === true,
      show: this.showOnInitialize === true
    });
    return this;
  };

}).call(this);
(function() {

  Luca.concerns.ModelPresenter = {
    classMethods: {
      getPresenter: function(format) {
        var _ref;
        return (_ref = this.presenters) != null ? _ref[format] : void 0;
      },
      registerPresenter: function(format, config) {
        this.presenters || (this.presenters = {});
        return this.presenters[format] = config;
      }
    },
    presentAs: function(format) {
      var attributeList,
        _this = this;
      try {
        attributeList = this.componentMetaData().componentDefinition().getPresenter(format);
        if (attributeList == null) return this.toJSON();
        return _(attributeList).reduce(function(memo, attribute) {
          memo[attribute] = _this.read(attribute);
          return memo;
        }, {});
      } catch (e) {
        console.log("Error presentAs", e.stack, e.message);
        return this.toJSON();
      }
    }
  };

}).call(this);
(function() {

  Luca.concerns.Paginatable = {
    paginatorViewClass: 'Luca.components.PaginationControl',
    paginationSelector: ".toolbar.bottom",
    __included: function() {
      return _.extend(Luca.Collection.prototype, {
        __paginators: {}
      });
    },
    __initializer: function() {
      var collection, paginationState, _base, _ref,
        _this = this;
      if (this.paginatable === false) return;
      if (!Luca.isBackboneCollection(this.collection)) {
        this.collection = typeof (_base = Luca.CollectionManager).get === "function" ? (_ref = _base.get()) != null ? _ref.getOrCreate(this.collection) : void 0 : void 0;
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        this.debug("Skipping Paginatable due to no collection being present on " + (this.name || this.cid));
        this.debug("collection", this.collection);
        return;
      }
      _.bindAll(this, "paginationControl", "pager");
      this.getCollection || (this.getCollection = function() {
        return this.collection;
      });
      collection = this.getCollection();
      paginationState = this.getPaginationState();
      this.optionsSources || (this.optionsSources = []);
      this.queryOptions || (this.queryOptions = {});
      this.optionsSources.push(function() {
        var options;
        options = _(paginationState.toJSON()).pick('limit', 'page', 'sortBy');
        return _.extend(options, {
          pager: _this.pager
        });
      });
      paginationState.on("change:page", function(state) {
        var filter, options, prepared;
        filter = _.clone(_this.getQuery());
        options = _.clone(_this.getQueryOptions());
        prepared = _this.prepareRemoteFilter(filter, options);
        if (_this.isRemote()) {
          return _this.collection.applyFilter(prepared, {
            remote: true
          });
        } else {
          return _this.trigger("refresh");
        }
      });
      return this.on("before:render", this.renderPaginationControl, this);
    },
    pager: function(numberOfPages, models) {
      this.getPaginationState().set({
        numberOfPages: numberOfPages,
        itemCount: models.length
      });
      return this.paginationControl().updateWithPageCount(numberOfPages, models);
    },
    isRemote: function() {
      return this.getQueryOptions().remote === true;
    },
    getPaginationState: function() {
      var _base, _name;
      return (_base = this.collection.__paginators)[_name = this.cid] || (_base[_name] = this.paginationControl().state);
    },
    paginationContainer: function() {
      return this.$(">" + this.paginationSelector);
    },
    setCurrentPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.getPaginationState().set('page', page, options);
    },
    setPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.getPaginationState().set('page', page, options);
    },
    setLimit: function(limit, options) {
      if (limit == null) limit = 0;
      if (options == null) options = {};
      return this.getPaginationState().set('limit', limit, options);
    },
    paginationControl: function() {
      if (this.paginator != null) return this.paginator;
      _.defaults(this.paginatable || (this.paginatable = {}), {
        page: 1,
        limit: 20
      });
      this.paginator = Luca.util.lazyComponent({
        type: "pagination_control",
        collection: this.getCollection(),
        defaultState: this.paginatable,
        parent: this.name || this.cid,
        debugMode: this.debugMode
      });
      return this.paginator;
    },
    renderPaginationControl: function() {
      var control;
      control = this.paginationControl();
      this.paginationContainer().append(control.render().$el);
      return control;
    }
  };

}).call(this);
(function() {

  Luca.concerns.QueryCollectionBindings = {
    getCollection: function() {
      return this.collection;
    },
    loadModels: function(models, options) {
      var _ref;
      if (models == null) models = [];
      if (options == null) options = {};
      return (_ref = this.getCollection()) != null ? _ref.reset(models, options) : void 0;
    },
    applyQuery: function(query, queryOptions) {
      if (query == null) query = {};
      if (queryOptions == null) queryOptions = {};
      this.query = query;
      this.queryOptions = queryOptions;
      this.refresh();
      return this;
    },
    getQuery: function(options) {
      var query, querySource, _i, _len, _ref;
      if (options == null) options = {};
      query = this.query || (this.query = {});
      _ref = _(this.querySources || []).compact();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        querySource = _ref[_i];
        query = _.extend(query, querySource(options) || {});
      }
      return query;
    },
    getQueryOptions: function(options) {
      var optionSource, _i, _len, _ref;
      if (options == null) options = {};
      options = this.queryOptions || (this.queryOptions = {});
      _ref = _(this.optionsSources || []).compact();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        optionSource = _ref[_i];
        options = _.extend(options, optionSource(options) || {});
      }
      return options;
    },
    getModels: function(query, options) {
      var _ref;
      if ((_ref = this.collection) != null ? _ref.query : void 0) {
        query || (query = this.getQuery());
        options || (options = this.getQueryOptions());
        return this.collection.query(query, options);
      } else {
        return this.collection.models;
      }
    }
  };

}).call(this);
(function() {

  Luca.concerns.StateModel = {
    __initializer: function() {
      var _this = this;
      if (this.stateful !== true) return;
      if ((this.state != null) && !Luca.isBackboneModel(this.state)) return;
      this.state = new Backbone.Model(this.defaultState || {});
      this.set || (this.set = function() {
        return _this.state.set.apply(_this.state, arguments);
      });
      this.get || (this.get = function() {
        return _this.state.get.apply(_this.state, arguments);
      });
      return this.state.on("change", function(state) {
        var changed, previousValues, value, _len, _ref, _results;
        _this.trigger("state:change", state);
        previousValues = state.previousAttributes();
        _ref = state.changedAttributes;
        _results = [];
        for (value = 0, _len = _ref.length; value < _len; value++) {
          changed = _ref[value];
          _results.push(_this.trigger("state:change:" + changed, value, state.previous(changed)));
        }
        return _results;
      });
    }
  };

}).call(this);
(function() {

  Luca.concerns.Templating = {
    __initializer: function() {
      var template, templateContent, templateVars;
      templateVars = Luca.util.read.call(this, this.bodyTemplateVars) || {};
      if (template = this.bodyTemplate) {
        this.$el.empty();
        templateContent = Luca.template(template, templateVars);
        return Luca.View.prototype.$html.call(this, templateContent);
      }
    }
  };

}).call(this);
(function() {
  var componentCacheStore, registry;

  registry = {
    classes: {},
    model_classes: {},
    collection_classes: {},
    namespaces: ['Luca.containers', 'Luca.components']
  };

  componentCacheStore = {
    cid_index: {},
    name_index: {}
  };

  Luca.config.defaultComponentClass = Luca.defaultComponentClass = 'Luca.View';

  Luca.config.defaultComponentType = Luca.defaultComponentType = 'view';

  Luca.registry.aliases = {
    grid: "grid_view",
    form: "form_view",
    text: "text_field",
    button: "button_field",
    select: "select_field",
    card: "card_view",
    paged: "card_view",
    wizard: "card_view",
    collection: "collection_view",
    list: "collection_view",
    multi: "collection_multi_view",
    table: "table_view"
  };

  Luca.registerComponent = function(component, prototypeName, componentType) {
    if (componentType == null) componentType = "view";
    Luca.trigger("component:registered", component, prototypeName);
    switch (componentType) {
      case "model":
        return registry.model_classes[component] = prototypeName;
      case "collection":
        return registry.collection_classes[component] = prototypeName;
      default:
        return registry.classes[component] = prototypeName;
    }
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
    return Luca.registerComponent(component, prototypeName);
  };

  Luca.registry.addNamespace = Luca.registry.namespace = function(identifier) {
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
    var alias, c, className, fullPath, parents, _ref;
    if (alias = Luca.registry.aliases[ctype]) ctype = alias;
    c = registry.classes[ctype];
    if (c != null) return c;
    className = Luca.util.classify(ctype);
    parents = Luca.registry.namespaces();
    return fullPath = (_ref = _(parents).chain().map(function(parent) {
      return parent[className];
    }).compact().value()) != null ? _ref[0] : void 0;
  };

  Luca.registry.instances = function() {
    return _(componentCacheStore.cid_index).values();
  };

  Luca.registry.findInstancesByClass = function(componentClass) {
    return Luca.registry.findInstancesByClassName(componentClass.displayName);
  };

  Luca.registry.findInstancesByClassName = function(className) {
    var instances;
    if (!_.isString(className)) className = className.displayName;
    instances = Luca.registry.instances();
    return _(instances).select(function(instance) {
      var isClass, _ref;
      isClass = instance.displayName === className;
      return instance.displayName === className || (typeof instance._superClass === "function" ? (_ref = instance._superClass()) != null ? _ref.displayName : void 0 : void 0) === className;
    });
  };

  Luca.registry.classes = function(toString) {
    if (toString == null) toString = false;
    return _(_.extend({}, registry.classes, registry.model_classes, registry.collection_classes)).map(function(className, ctype) {
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

  Luca.registry.find = function(search) {
    return Luca.util.resolve(search) || Luca.define.findDefinition(search);
  };

  Luca.cache = Luca.cacheInstance = function(cacheKey, object) {
    var lookup_id;
    if (cacheKey == null) return;
    if ((object != null ? object.doNotCache : void 0) === true) return object;
    if (object != null) componentCacheStore.cid_index[cacheKey] = object;
    object = componentCacheStore.cid_index[cacheKey];
    if ((object != null ? object.component_name : void 0) != null) {
      componentCacheStore.name_index[object.component_name] = object.cid;
    } else if ((object != null ? object.name : void 0) != null) {
      componentCacheStore.name_index[object.name] = object.cid;
    }
    if (object != null) return object;
    lookup_id = componentCacheStore.name_index[cacheKey];
    return componentCacheStore.cid_index[lookup_id];
  };

}).call(this);
(function() {
  var MetaDataProxy;

  Luca.registry.componentMetaData = {};

  Luca.registry.getMetaDataFor = function(componentName) {
    return new MetaDataProxy(Luca.registry.componentMetaData[componentName]);
  };

  Luca.registry.addMetaData = function(componentName, key, value) {
    var data, _base;
    data = (_base = Luca.registry.componentMetaData)[componentName] || (_base[componentName] = {});
    data[key] = _(value).clone();
    return data;
  };

  MetaDataProxy = (function() {

    function MetaDataProxy(meta) {
      this.meta = meta != null ? meta : {};
      _.defaults(this.meta, {
        "super class name": "",
        "display name": "",
        "public interface": [],
        "public configuration": [],
        "private interface": [],
        "private configuration": [],
        "class configuration": [],
        "class interface": []
      });
    }

    MetaDataProxy.prototype.superClass = function() {
      return Luca.util.resolve(this.meta["super class name"]);
    };

    MetaDataProxy.prototype.componentDefinition = function() {
      return Luca.registry.find(this.meta["display name"]);
    };

    MetaDataProxy.prototype.componentPrototype = function() {
      var _ref;
      return (_ref = this.componentDefinition()) != null ? _ref.prototype : void 0;
    };

    MetaDataProxy.prototype.prototypeFunctions = function() {
      return _.functions(this.componentPrototype());
    };

    MetaDataProxy.prototype.classAttributes = function() {
      return _.uniq(this.classInterface().concat(this.classConfiguration()));
    };

    MetaDataProxy.prototype.publicAttributes = function() {
      return _.uniq(this.publicInterface().concat(this.publicConfiguration()));
    };

    MetaDataProxy.prototype.privateAttributes = function() {
      return _.uniq(this.privateInterface().concat(this.privateConfiguration()));
    };

    MetaDataProxy.prototype.classMethods = function() {
      var list;
      list = _.functions(this.componentDefinition());
      return _(list).intersection(this.classAttributes());
    };

    MetaDataProxy.prototype.publicMethods = function() {
      return _(this.prototypeFunctions()).intersection(this.publicAttributes());
    };

    MetaDataProxy.prototype.privateMethods = function() {
      return _(this.prototypeFunctions()).intersection(this.privateAttributes());
    };

    MetaDataProxy.prototype.classConfiguration = function() {
      return this.meta["class configuration"];
    };

    MetaDataProxy.prototype.publicConfiguration = function() {
      return this.meta["public configuration"];
    };

    MetaDataProxy.prototype.privateConfiguration = function() {
      return this.meta["private configuration"];
    };

    MetaDataProxy.prototype.classInterface = function() {
      return this.meta["class interface"];
    };

    MetaDataProxy.prototype.publicInterface = function() {
      return this.meta["public interface"];
    };

    MetaDataProxy.prototype.privateInterface = function() {
      return this.meta["private interface"];
    };

    MetaDataProxy.prototype.triggers = function() {
      return this.meta["hooks"];
    };

    MetaDataProxy.prototype.hooks = function() {
      return this.meta["hooks"];
    };

    MetaDataProxy.prototype.styleHierarchy = function() {
      var list;
      list = _(this.classHierarchy()).map(function(cls) {
        return Luca.util.toCssClass(cls, 'views', 'components', 'core', 'fields', 'containers');
      });
      return _(list).without('backbone-view', 'luca-view');
    };

    MetaDataProxy.prototype.classHierarchy = function() {
      var list, proxy, _ref, _ref2, _ref3, _ref4;
      list = [this.meta["display name"], this.meta["super class name"]];
      proxy = (_ref = this.superClass()) != null ? (_ref2 = _ref.prototype) != null ? typeof _ref2.componentMetaData === "function" ? _ref2.componentMetaData() : void 0 : void 0 : void 0;
      while (!!proxy) {
        list = list.concat(proxy != null ? proxy.classHierarchy() : void 0);
        proxy = (_ref3 = proxy.superClass()) != null ? (_ref4 = _ref3.prototype) != null ? typeof _ref4.componentMetaData === "function" ? _ref4.componentMetaData() : void 0 : void 0 : void 0;
      }
      return _(list).uniq();
    };

    return MetaDataProxy;

  })();

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
  var bindAllEventHandlers, bindEventHandlers, view,
    __slice = Array.prototype.slice;

  view = Luca.register("Luca.View");

  view["extends"]("Backbone.View");

  view.includes("Luca.Events", "Luca.concerns.DomHelpers");

  view.mixesIn("DomHelpers", "Templating", "EnhancedProperties", "CollectionEventBindings", "ApplicationEventBindings", "StateModel");

  view.triggers("before:initialize", "after:initialize", "before:render", "after:render", "first:activation", "activation", "deactivation");

  view.defines({
    initialize: function(options) {
      this.options = options != null ? options : {};
      this.trigger("before:initialize", this, this.options);
      _.extend(this, this.options);
      if (this.autoBindEventHandlers === true || this.bindAllEvents === true) {
        bindAllEventHandlers.call(this);
      }
      if (this.name != null) this.cid = _.uniqueId(this.name);
      this.$el.attr("data-luca-id", this.name || this.cid);
      Luca.cacheInstance(this.cid, this);
      this.setupHooks(_(Luca.View.prototype.hooks.concat(this.hooks)).uniq());
      Luca.concern.setup.call(this);
      this.delegateEvents();
      return this.trigger("after:initialize", this);
    },
    setupHooks: Luca.util.setupHooks,
    registerEvent: function(selector, handler) {
      this.events || (this.events = {});
      this.events[selector] = handler;
      return this.delegateEvents();
    },
    definitionClass: function() {
      var _ref;
      return (_ref = Luca.util.resolve(this.displayName, window)) != null ? _ref.prototype : void 0;
    },
    collections: function() {
      return Luca.util.selectProperties(Luca.isBackboneCollection, this);
    },
    models: function() {
      return Luca.util.selectProperties(Luca.isBackboneModel, this);
    },
    views: function() {
      return Luca.util.selectProperties(Luca.isBackboneView, this);
    },
    debug: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (!(this.debugMode || (window.LucaDebugMode != null))) return;
      return console.log([this.name || this.cid].concat(__slice.call(args)));
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
    }
  });

  Luca.View._originalExtend = Backbone.View.extend;

  Luca.View.renderStrategies = {
    legacy: function(_userSpecifiedMethod) {
      var autoTrigger, deferred, fn, target, trigger,
        _this = this;
      view = this;
      if (this.deferrable) {
        target = this.deferrable_target;
        if (!Luca.isBackboneCollection(this.deferrable)) {
          this.deferrable = this.collection;
        }
        target || (target = this.deferrable);
        trigger = this.deferrable_event ? this.deferrable_event : Luca.View.deferrableEvent;
        deferred = function() {
          _userSpecifiedMethod.call(view);
          return view.trigger("after:render", view);
        };
        view.defer(deferred).until(target, trigger);
        view.trigger("before:render", this);
        autoTrigger = this.deferrable_trigger || this.deferUntil;
        if (!(autoTrigger != null)) {
          target[this.deferrable_method || "fetch"].call(target);
        } else {
          fn = _.once(function() {
            var _base, _name;
            return typeof (_base = _this.deferrable)[_name = _this.deferrable_method || "fetch"] === "function" ? _base[_name]() : void 0;
          });
          (this.deferrable_target || this).bind(this.deferrable_trigger, fn);
        }
        return this;
      } else {
        this.trigger("before:render", this);
        _userSpecifiedMethod.apply(this, arguments);
        this.trigger("after:render", this);
        return this;
      }
    },
    improved: function(_userSpecifiedMethod) {
      var deferred, listenForEvent;
      this.trigger("before:render", this);
      deferred = function() {
        _userSpecifiedMethod.apply(this, arguments);
        return this.trigger("after:render", this);
      };
      if (this.deferrable) {
        listenForEvent = _.isString(this.deferrable) ? this.deferrable : this.deferrable === true ? "collection:reset" : void 0;
        return view.defer(deferred).until(this, listenForEvent);
      } else {
        return deferred.call(this);
      }
    }
  };

  Luca.View.renderWrapper = function(definition) {
    var _userSpecifiedMethod;
    _userSpecifiedMethod = definition.render;
    _userSpecifiedMethod || (_userSpecifiedMethod = function() {
      return this.trigger("empty:render");
    });
    definition.render = function() {
      var strategy;
      strategy = Luca.View.renderStrategies[this.renderStrategy || (this.renderStrategy = "legacy")];
      if (!_.isFunction(strategy)) {
        throw "Invalid rendering strategy.  Please see Luca.View.renderStrategies";
      }
      strategy.call(this, _userSpecifiedMethod);
      return this;
    };
    return definition;
  };

  bindAllEventHandlers = function() {
    var config, _i, _len, _ref, _results;
    _ref = [this.events, this.componentEvents, this.collectionEvents, this.applicationEvents];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      config = _ref[_i];
      if (!_.isEmpty(config)) _results.push(bindEventHandlers.call(this, config));
    }
    return _results;
  };

  bindEventHandlers = function(events) {
    var eventSignature, handler, _results;
    if (events == null) events = {};
    _results = [];
    for (eventSignature in events) {
      handler = events[eventSignature];
      if (_.isString(handler)) {
        _results.push(_.bindAll(this, handler));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Luca.View.deferrableEvent = "reset";

  Luca.View.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    definition = Luca.View.renderWrapper(definition);
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.View._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

}).call(this);
(function() {
  var model, setupComputedProperties;

  model = Luca.define('Luca.Model');

  model["extends"]('Backbone.Model');

  model.includes('Luca.Events');

  model.defines({
    initialize: function() {
      Backbone.Model.prototype.initialize(this, arguments);
      setupComputedProperties.call(this);
      return Luca.concern.setup.call(this);
    },
    read: function(attr) {
      if (_.isFunction(this[attr])) {
        return this[attr].call(this);
      } else {
        return this.get(attr) || this[attr];
      }
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

  setupComputedProperties = function() {
    var attr, dependencies, _ref, _results,
      _this = this;
    if (_.isUndefined(this.computed)) return;
    this._computed = {};
    _ref = this.computed;
    _results = [];
    for (attr in _ref) {
      dependencies = _ref[attr];
      this.on("change:" + attr, function() {
        return _this._computed[attr] = _this[attr].call(_this);
      });
      if (_.isString(dependencies)) dependencies = dependencies.split(',');
      _results.push(_(dependencies).each(function(dep) {
        _this.on("change:" + dep, function() {
          return _this.trigger("change:" + attr);
        });
        if (_this.has(dep)) return _this.trigger("change:" + attr);
      }));
    }
    return _results;
  };

  Luca.Model._originalExtend = Backbone.Model.extend;

  Luca.Model.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.Model._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

}).call(this);
(function() {
  var collection;

  collection = Luca.define('Luca.Collection');

  collection["extends"]('Backbone.QueryCollection');

  collection.includes('Luca.Events');

  collection.triggers("after:initialize", "before:fetch", "after:response");

  collection.defines({
    model: Luca.Model,
    cachedMethods: [],
    remoteFilter: false,
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
        this.bootstrap_cache_key = Luca.util.read(this.cache_key);
      }
      if (this.registerAs || this.registerWith) {
        console.log("This configuration API is deprecated.  use @name and @manager properties instead");
      }
      this.name || (this.name = this.registerAs);
      this.manager || (this.manager = this.registerWith);
      this.manager = _.isFunction(this.manager) ? this.manager() : this.manager;
      if (this.name && !this.manager) this.manager = Luca.CollectionManager.get();
      if (this.manager) {
        this.name || (this.name = Luca.util.read(this.cache_key));
        this.name = Luca.util.read(this.name);
        if (!(this.private || this.anonymous)) {
          this.bind("after:initialize", function() {
            return _this.register(_this.manager, _this.name, _this);
          });
        }
      }
      if (this.useLocalStorage === true && (window.localStorage != null)) {
        table = this.bootstrap_cache_key || this.name;
        throw "Must specify a cache_key property or method to use localStorage";
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
      Luca.concern.setup.call(this);
      Luca.util.setupHooks.call(this, this.hooks);
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
      this.base_params = _(Luca.Collection.baseParams()).clone();
      return this;
    },
    applyFilter: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      options = _(options).clone();
      if ((options.remote != null) === true || this.remoteFilter === true) {
        this.applyParams(filter);
        return this.fetch(_.extend(options, {
          refresh: true,
          remote: true
        }));
      } else {
        return this.reset(this.query(filter, options));
      }
    },
    applyParams: function(params) {
      this.base_params = _(Luca.Collection.baseParams()).clone() || {};
      _.extend(this.base_params, params);
      return this;
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
      if (this.cached_models().length && !(options.refresh === true || options.remote === true)) {
        return this.bootstrap();
      }
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
      if (options == null) options = {};
      _.defaults(options, {
        autoFetch: true
      });
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
        return fn.call(scope, collection);
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
    },
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
      var cache, membershipEvents;
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
    query: function(filter, options) {
      if (filter == null) filter = {};
      if (options == null) options = {};
      if (Backbone.QueryCollection != null) {
        return Backbone.QueryCollection.prototype.query.apply(this, arguments);
      } else {
        return this.models;
      }
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

  Luca.Collection._originalExtend = Backbone.Collection.extend;

  Luca.Collection.extend = function(definition) {
    var componentClass, module, _i, _len, _ref;
    if (definition == null) definition = {};
    if (definition.concerns != null) {
      definition.concerns || (definition.concerns = definition.concerns);
    }
    componentClass = Luca.Collection._originalExtend.call(this, definition);
    if ((definition.concerns != null) && _.isArray(definition.concerns)) {
      _ref = definition.concerns;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        module = _ref[_i];
        Luca.decorate(componentClass)["with"](module);
      }
    }
    return componentClass;
  };

  Luca.Collection.namespace = function(namespace) {
    var _base;
    if (_.isString(namespace)) namespace = Luca.util.resolve(namespace);
    if (namespace != null) Luca.Collection.__defaultNamespace = namespace;
    (_base = Luca.Collection).__defaultNamespace || (_base.__defaultNamespace = window || global);
    return Luca.util.read(Luca.Collection.__defaultNamespace);
  };

  Luca.Collection.baseParams = function(obj) {
    if (_.isString(obj)) obj = Luca.util.resolve(obj);
    if (obj) Luca.Collection._baseParams = obj;
    return Luca.util.read(Luca.Collection._baseParams);
  };

  Luca.Collection.resetBaseParams = function() {
    return Luca.Collection._baseParams = {};
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

  attachToolbar = function(config, targetEl) {
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
    return (targetEl || this.$bodyEl())[action](container);
  };

  _.def("Luca.components.Panel")["extends"]("Luca.View")["with"]({
    topToolbar: void 0,
    bottomToolbar: void 0,
    loadMask: false,
    loadMaskTemplate: ["components/load_mask"],
    loadMaskTimeout: 3000,
    mixins: ["LoadMaskable"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
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
      if (_.isString(wrapper) && !wrapper.match(/[<>]/)) {
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
    $empty: function() {
      return this.$bodyEl().empty();
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
      return attachToolbar.call(this, config, config.targetEl);
    }
  });

}).call(this);
(function() {
  var field;

  field = Luca.register("Luca.core.Field");

  field["extends"]("Luca.View");

  field.triggers("before:validation", "after:validation", "on:change");

  field.publicConfiguration({
    labelAlign: 'top',
    className: 'luca-ui-text-field luca-ui-field',
    statuses: ["warning", "error", "success"]
  });

  field.publicInterface({
    disable: function() {
      return this.getInputElement().attr('disabled', true);
    },
    enable: function() {
      return this.getInputElement().attr('disabled', false);
    },
    getValue: function() {
      var raw, _ref;
      raw = (_ref = this.getInputElement()) != null ? _ref.attr('value') : void 0;
      if (_.str.isBlank(raw)) return raw;
      switch (this.valueType) {
        case "integer":
          return parseInt(raw);
        case "string":
          return "" + raw;
        case "float":
          return parseFloat(raw);
        default:
          return raw;
      }
    },
    setValue: function(value) {
      var _ref;
      return (_ref = this.getInputElement()) != null ? _ref.attr('value', value) : void 0;
    },
    updateState: function(state) {
      var _this = this;
      return _(this.statuses).each(function(cls) {
        _this.$el.removeClass(cls);
        return _this.$el.addClass(state);
      });
    }
  });

  field.privateConfiguration({
    isField: true,
    template: 'fields/text_field'
  });

  field.defines({
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_class || (this.input_class = "");
      this.input_type || (this.input_type = "");
      this.helperText || (this.helperText = "");
      if (!(this.label != null) || this.label.length === 0) this.label = this.name;
      if (this.required && !((_ref = this.label) != null ? _ref.match(/^\*/) : void 0)) {
        this.label || (this.label = "*" + this.label);
      }
      this.inputStyles || (this.inputStyles = "");
      this.input_value || (this.input_value = this.value || "");
      if (this.disabled) this.disable();
      this.updateState(this.state);
      this.placeHolder || (this.placeHolder = "");
      return Luca.View.prototype.initialize.apply(this, arguments);
    },
    beforeRender: function() {
      if (Luca.config.enableBoostrap) this.$el.addClass('control-group');
      if (this.required) return this.$el.addClass('required');
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    },
    getInputElement: function() {
      return this.input || (this.input = this.$('input').eq(0));
    }
  });

}).call(this);
(function() {
  var applyDOMConfig, container, createGetterMethods, createMethodsToGetComponentsByRole, doComponents, doLayout, indexComponent, validateContainerConfiguration;

  container = Luca.register("Luca.core.Container");

  container["extends"]("Luca.components.Panel");

  container.triggers("before:components", "before:render:components", "before:layout", "after:components", "after:layout", "first:activation");

  container.defines({
    className: 'luca-ui-container',
    componentTag: 'div',
    componentClass: 'luca-ui-panel',
    isContainer: true,
    rendered: false,
    components: [],
    componentEvents: {},
    initialize: function(options) {
      var component, _i, _len, _ref;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.components || (this.components = this.fields || (this.fields = this.pages || (this.pages = this.cards || (this.cards = this.views))));
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        if (_.isString(component)) {
          component = {
            type: component,
            role: component,
            name: component
          };
        }
      }
      _.bindAll(this, "beforeRender");
      this.setupHooks(Luca.core.Container.prototype.hooks);
      validateContainerConfiguration(this);
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
      var componentsWithClassBasedAssignment, containerAssignment, specialComponent, targetEl, _i, _len, _results;
      container = this;
      this.componentContainers = _(this.components).map(function(component, index) {
        return applyDOMConfig.call(container, component, index);
      });
      componentsWithClassBasedAssignment = this._().select(function(component) {
        var _ref;
        return _.isString(component.container) && ((_ref = component.container) != null ? _ref.match('.') : void 0) && container.$(component.container).length > 0;
      });
      if (componentsWithClassBasedAssignment.length > 0) {
        _results = [];
        for (_i = 0, _len = componentsWithClassBasedAssignment.length; _i < _len; _i++) {
          specialComponent = componentsWithClassBasedAssignment[_i];
          containerAssignment = _.uniqueId('container');
          targetEl = container.$(specialComponent.container);
          if (targetEl.length > 0) {
            $(targetEl).attr('data-container-assignment', containerAssignment);
            _results.push(specialComponent.container += "[data-container-assignment='" + containerAssignment + "']");
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    },
    prepareComponents: function() {
      var _this = this;
      container = this;
      return _(this.components).each(function(component, index) {
        var ce, componentContainerElement, componentExtension, panel, _ref, _ref2;
        ce = componentContainerElement = (_ref = _this.componentContainers) != null ? _ref[index] : void 0;
        ce["class"] = ce["class"] || ce.className || ce.classes;
        if (_this.generateComponentElements) {
          panel = _this.make(_this.componentTag, componentContainerElement, '');
          _this.$append(panel);
        }
        if (container.defaults != null) {
          component = _.defaults(component, container.defaults || {});
        }
        if (_.isArray(container.extensions) && _.isObject((_ref2 = container.extensions) != null ? _ref2[index] : void 0)) {
          componentExtension = container.extensions[index];
          component = _.extend(component, componentExtension);
        }
        if ((component.role != null) && _.isObject(container.extensions) && _.isObject(container.extensions[component.role])) {
          componentExtension = container.extensions[component.role];
          component = _.extend(component, componentExtension);
        }
        if (component.container == null) {
          if (_this.generateComponentElements) {
            component.container = "#" + componentContainerElement.id;
          }
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
        cid_index: {},
        role_index: {}
      };
      container = this;
      this.components = _(this.components).map(function(object, index) {
        var component, created, _ref;
        component = Luca.isComponent(object) ? object : (object.type || (object.type = object.ctype), !(object.type != null) ? object.components != null ? object.type = object.ctype = 'container' : object.type = object.ctype = Luca.defaultComponentType : void 0, object._parentCid || (object._parentCid = container.cid), created = Luca.util.lazyComponent(object));
        if (!component.container && ((_ref = component.options) != null ? _ref.container : void 0)) {
          component.container = component.options.container;
        }
        component.getParent || (component.getParent = function() {
          return Luca(component._parentCid);
        });
        if (!(component.container != null)) {
          console.log(component, index, _this);
          console.error("could not assign container property to component on container " + (_this.name || _this.cid));
        }
        indexComponent(component).at(index)["in"](_this.componentIndex);
        return component;
      });
      this.componentsCreated = true;
      return map;
    },
    renderComponents: function(debugMode) {
      var _this = this;
      this.debugMode = debugMode != null ? debugMode : "";
      this.debug("container render components");
      container = this;
      return _(this.components).each(function(component) {
        try {
          component.trigger("before:attach");
          _this.$(component.container).eq(0).append(component.el);
          component.trigger("after:attach");
          return component.render.call(component);
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
      var activator;
      activator = this;
      return this.each(function(component, index) {
        var _ref;
        if ((component != null ? component.previously_activated : void 0) !== true) {
          if (component != null) {
            if ((_ref = component.trigger) != null) {
              _ref.call(component, "first:activation", component, activator);
            }
          }
          return component.previously_activated = true;
        }
      });
    },
    _: function() {
      return _(this.components);
    },
    pluck: function(attribute) {
      return this._().pluck(attribute);
    },
    invoke: function(method) {
      return this._().invoke(method);
    },
    select: function(fn) {
      return this._().select(fn);
    },
    detect: function(fn) {
      return this._().detect(attribute);
    },
    reject: function(fn) {
      return this._().reject(fn);
    },
    map: function(fn) {
      return this._().map(fn);
    },
    registerComponentEvents: function(eventList) {
      var component, componentNameOrRole, eventId, handler, listener, _ref, _ref2, _results,
        _this = this;
      container = this;
      _ref = eventList || this.componentEvents || {};
      _results = [];
      for (listener in _ref) {
        handler = _ref[listener];
        _ref2 = listener.split(' '), componentNameOrRole = _ref2[0], eventId = _ref2[1];
        if (!_.isFunction(this[handler])) {
          console.log("Error registering component event", listener, componentNameOrRole, eventId);
          throw "Invalid component event definition " + listener + ". Specified handler is not a method on the container";
        }
        if (componentNameOrRole === "*") {
          _results.push(this.eachComponent(function(component) {
            return component.on(eventId, _this[handler], container);
          }));
        } else {
          component = this.findComponentForEventBinding(componentNameOrRole);
          if (!((component != null) && Luca.isComponent(component))) {
            console.log("Error registering component event", listener, componentNameOrRole, eventId);
            throw "Invalid component event definition: " + componentNameOrRole;
          }
          _results.push(component != null ? component.bind(eventId, this[handler], container) : void 0);
        }
      }
      return _results;
    },
    subContainers: function() {
      return this.select(function(component) {
        return component.isContainer === true;
      });
    },
    roles: function() {
      return _(this.allChildren()).pluck('role');
    },
    allChildren: function() {
      var children, grandchildren;
      children = this.components;
      grandchildren = _(this.subContainers()).invoke('allChildren');
      return _([children, grandchildren]).chain().compact().flatten().value();
    },
    findComponentForEventBinding: function(nameRoleOrGetter, deep) {
      if (deep == null) deep = true;
      return this.findComponentByName(nameRoleOrGetter, deep) || this.findComponentByGetter(nameRoleOrGetter, deep) || this.findComponentByRole(nameRoleOrGetter, deep);
    },
    findComponentByGetter: function(getter, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.getter === getter;
      });
    },
    findComponentByRole: function(role, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.role === role || component.type === role || component.ctype === role;
      });
    },
    findComponentByName: function(name, deep) {
      if (deep == null) deep = false;
      return _(this.allChildren()).detect(function(component) {
        return component.name === name;
      });
    },
    findComponentById: function(id, deep) {
      if (deep == null) deep = false;
      return this.findComponent(id, "cid_index", deep);
    },
    findComponent: function(needle, haystack, deep) {
      var component, position, sub_container, _ref;
      if (haystack == null) haystack = "name";
      if (deep == null) deep = false;
      if (this.componentsCreated !== true) this.createComponents();
      position = (_ref = this.componentIndex) != null ? _ref[haystack][needle] : void 0;
      component = this.components[position];
      if (component) return component;
      if (deep === true) {
        sub_container = _(this.components).detect(function(component) {
          return component != null ? typeof component.findComponent === "function" ? component.findComponent(needle, haystack, true) : void 0 : void 0;
        });
        return sub_container != null ? typeof sub_container.findComponent === "function" ? sub_container.findComponent(needle, haystack, true) : void 0 : void 0;
      }
    },
    each: function(fn) {
      return this.eachComponent(fn, false);
    },
    eachComponent: function(fn, deep) {
      var _this = this;
      if (deep == null) deep = true;
      return _(this.components).each(function(component, index) {
        var _ref;
        fn.call(component, component, index);
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
      return this.$("[data-luca-parent='" + (this.name || this.cid) + "']");
    },
    getComponent: function(needle) {
      return this.components[needle];
    },
    isRootComponent: function() {
      return this.rootComponent === true || !(this.getParent != null);
    },
    getRootComponent: function() {
      if (this.isRootComponent()) {
        return this;
      } else {
        return this.getParent().getRootComponent();
      }
    },
    selectByAttribute: function(attribute, value, deep) {
      var components;
      if (value == null) value = void 0;
      if (deep == null) deep = false;
      components = _(this.components).map(function(component) {
        var matches, test;
        matches = [];
        test = component[attribute];
        if (test === value || (!(value != null) && (test != null))) {
          matches.push(component);
        }
        if (deep === true) {
          matches.push(typeof component.selectByAttribute === "function" ? component.selectByAttribute(attribute, value, true) : void 0);
        }
        return _.compact(matches);
      });
      return _.flatten(components);
    }
  });

  Luca.core.Container.componentRenderer = function(container, component) {
    var attachMethod;
    attachMethod = $(component.container)[component.attachWith || "append"];
    return attachMethod(component.render().el);
  };

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
      "data-luca-parent": this.name || this.cid
    };
    if (this.customizeContainerEl != null) {
      config = this.customizeContainerEl(config, panel, panelIndex);
    }
    return config;
  };

  createGetterMethods = function() {
    var childrenWithGetter;
    container = this;
    childrenWithGetter = _(this.allChildren()).select(function(component) {
      return component.getter != null;
    });
    return _(childrenWithGetter).each(function(component) {
      var _name;
      return container[_name = component.getter] || (container[_name] = function() {
        console.log(component.getter, component, container);
        return component;
      });
    });
  };

  createMethodsToGetComponentsByRole = function() {
    var childrenWithRole;
    container = this;
    childrenWithRole = _(this.allChildren()).select(function(component) {
      return component.role != null;
    });
    return _(childrenWithRole).each(function(component) {
      var getter;
      getter = _.str.camelize("get_" + component.role);
      return container[getter] || (container[getter] = function() {
        return component;
      });
    });
  };

  doComponents = function() {
    this.trigger("before:components", this, this.components);
    this.prepareComponents();
    this.createComponents();
    this.trigger("before:render:components", this, this.components);
    this.renderComponents();
    this.trigger("after:components", this, this.components);
    if (this.skipGetterMethods !== true) {
      createGetterMethods.call(this);
      createMethodsToGetComponentsByRole.call(this);
    }
    return this.registerComponentEvents();
  };

  validateContainerConfiguration = function() {
    return true;
  };

  indexComponent = function(component) {
    return {
      at: function(index) {
        return {
          "in": function(map) {
            if (component.cid != null) map.cid_index[component.cid] = index;
            if (component.role != null) map.role_index[component.role] = index;
            if (component.name != null) {
              return map.name_index[component.name] = index;
            }
          }
        };
      }
    };
  };

}).call(this);
(function() {
  var guessCollectionClass, handleInitialCollections, loadInitialCollections;

  Luca.CollectionManager = (function() {

    CollectionManager.prototype.name = "primary";

    CollectionManager.prototype.__collections = {};

    CollectionManager.prototype.relayEvents = true;

    function CollectionManager(options) {
      var existing, manager, _base, _base2;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      manager = this;
      if (existing = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get(this.name) : void 0) {
        throw 'Attempt to create a collection manager with a name which already exists';
      }
      this.collectionNamespace || (this.collectionNamespace = Luca.util.read(Luca.Collection.namespace));
      (_base2 = Luca.CollectionManager).instances || (_base2.instances = {});
      _.extend(this, Backbone.Events);
      _.extend(this, Luca.Events);
      Luca.CollectionManager.instances[this.name] = manager;
      Luca.CollectionManager.get = function(name) {
        if (name == null) return manager;
        return Luca.CollectionManager.instances[name];
      };
      this.state = new Luca.Model();
      if (this.initialCollections) handleInitialCollections.call(this);
    }

    CollectionManager.prototype.add = function(key, collection) {
      var _base;
      return (_base = this.currentScope())[key] || (_base[key] = collection);
    };

    CollectionManager.prototype.allCollections = function() {
      return _(this.currentScope()).values();
    };

    CollectionManager.prototype.create = function(key, collectionOptions, initialModels) {
      var CollectionClass, collection, collectionManager;
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      CollectionClass = collectionOptions.base;
      CollectionClass || (CollectionClass = guessCollectionClass.call(this, key));
      if (collectionOptions.private) collectionOptions.name = "";
      try {
        collection = new CollectionClass(initialModels, collectionOptions);
      } catch (e) {
        console.log("Error creating collection", CollectionClass, collectionOptions, key);
        throw e;
      }
      this.add(key, collection);
      collectionManager = this;
      if (this.relayEvents === true) {
        this.bind("*", function() {
          return console.log("Relay Events on Collection Manager *", collection, arguments);
        });
      }
      return collection;
    };

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

    CollectionManager.prototype.destroy = function(key) {
      var c;
      c = this.get(key);
      delete this.currentScope()[key];
      return c;
    };

    CollectionManager.prototype.getOrCreate = function(key, collectionOptions, initialModels) {
      if (collectionOptions == null) collectionOptions = {};
      if (initialModels == null) initialModels = [];
      return this.get(key) || this.create(key, collectionOptions, initialModels, false);
    };

    CollectionManager.prototype.collectionCountDidChange = function() {
      if (this.allCollectionsLoaded()) {
        this.trigger("all_collections_loaded");
        return this.trigger("initial:load");
      }
    };

    CollectionManager.prototype.allCollectionsLoaded = function() {
      return this.totalCollectionsCount() === this.loadedCollectionsCount();
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

  Luca.CollectionManager.isRunning = function() {
    return _.isEmpty(Luca.CollectionManager.instances) !== true;
  };

  Luca.CollectionManager.destroyAll = function() {
    return Luca.CollectionManager.instances = {};
  };

  Luca.CollectionManager.loadCollectionsByName = function(set, callback) {
    var collection, name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = set.length; _i < _len; _i++) {
      name = set[_i];
      collection = this.getOrCreate(name);
      collection.once("reset", function() {
        return callback(collection);
      });
      _results.push(collection.fetch());
    }
    return _results;
  };

  guessCollectionClass = function(key) {
    var classified, guess, guesses, _ref;
    classified = Luca.util.classify(key);
    if (_.isString(this.collectionNamespace)) {
      this.collectionNamespace = Luca.util.resolve(this.collectionNamespace);
    }
    guess = (this.collectionNamespace || (window || global))[classified];
    guess || (guess = (this.collectionNamespace || (window || global))["" + classified + "Collection"]);
    if (!(guess != null) && ((_ref = Luca.Collection.namespaces) != null ? _ref.length : void 0) > 0) {
      guesses = _(Luca.Collection.namespaces.reverse()).map(function(namespace) {
        return Luca.util.resolve("" + namespace + "." + classified) || Luca.util.resolve("" + namespace + "." + classified + "Collection");
      });
      guesses = _(guesses).compact();
      if (guesses.length > 0) guess = guesses[0];
    }
    return guess;
  };

  loadInitialCollections = function() {
    var collectionDidLoad, set,
      _this = this;
    collectionDidLoad = function(collection) {
      var current;
      current = _this.state.get("loaded_collections_count");
      _this.state.set("loaded_collections_count", current + 1);
      _this.trigger("collection_loaded", collection.name);
      return collection.unbind("reset");
    };
    set = this.initialCollections;
    return Luca.CollectionManager.loadCollectionsByName.call(this, set, collectionDidLoad);
  };

  handleInitialCollections = function() {
    var _this = this;
    this.state.set({
      loaded_collections_count: 0,
      collections_count: this.initialCollections.length
    });
    this.state.bind("change:loaded_collections_count", function() {
      return _this.collectionCountDidChange();
    });
    if (this.useProgressLoader) {
      this.loaderView || (this.loaderView = new Luca.components.CollectionLoaderView({
        manager: this,
        name: "collection_loader_view"
      }));
    }
    loadInitialCollections.call(this);
    this.initialCollectionsLoadedu;
    return this;
  };

}).call(this);
(function() {

  Luca.SocketManager = (function() {

    function SocketManager(options) {
      this.options = options != null ? options : {};
      _.extend(Backbone.Events);
      this.loadProviderSource();
    }

    SocketManager.prototype.connect = function() {
      switch (this.options.provider) {
        case "socket.io":
          return this.socket = io.connect(this.options.host);
        case "faye.js":
          return this.socket = new Faye.Client(this.options.host);
      }
    };

    SocketManager.prototype.providerSourceLoaded = function() {
      return this.connect();
    };

    SocketManager.prototype.providerSourceUrl = function() {
      switch (this.options.provider) {
        case "socket.io":
          return "" + this.options.host + "/socket.io/socket.io.js";
        case "faye.js":
          return "" + this.options.host + "/faye.js";
      }
    };

    SocketManager.prototype.loadProviderSource = function() {
      var script,
        _this = this;
      script = document.createElement('script');
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", this.providerSourceUrl());
      script.onload = _.bind(this.providerSourceLoaded, this);
      if (Luca.util.isIE()) {
        script.onreadystatechange = function() {
          if (script.readyState === "loaded") return _this.providerSourceLoaded();
        };
      }
      return document.getElementsByTagName('head')[0].appendChild(script);
    };

    return SocketManager;

  })();

}).call(this);
(function() {

  _.def('Luca.containers.SplitView')["extends"]('Luca.core.Container')["with"]({
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
      console.log("Column Views are deprecated in favor of just using grid css on a normal container");
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setColumnWidths();
    },
    componentClass: 'luca-ui-column',
    containerTemplate: "containers/basic",
    generateComponentElements: true,
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
  var component;

  component = Luca.define("Luca.containers.CardView");

  component["extends"]("Luca.core.Container");

  component.defaults({
    className: 'luca-ui-card-view-wrapper',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    componentClass: 'luca-ui-card',
    generateComponentElements: true,
    initialize: function(options) {
      this.options = options;
      this.components || (this.components = this.pages || (this.pages = this.cards));
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.setupHooks(this.hooks);
      return this.defer(this.simulateActivationEvent, this).until("after:render");
    },
    simulateActivationEvent: function() {
      var c;
      c = this.activeComponent();
      if ((c != null) && this.$el.is(":visible")) {
        return c != null ? c.trigger("activation", this, c, c) : void 0;
      }
    },
    prepareComponents: function() {
      var _ref;
      if ((_ref = Luca.core.Container.prototype.prepareComponents) != null) {
        _ref.apply(this, arguments);
      }
      this.componentElements().hide();
      return this.activeComponentElement().show();
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
    atFirst: function() {
      return this.activeCard === 0;
    },
    atLast: function() {
      return this.activeCard === this.components.length - 1;
    },
    next: function() {
      if (this.atLast()) return;
      return this.activate(this.activeCard + 1);
    },
    previous: function() {
      if (this.atFirst()) return;
      return this.activate(this.activeCard - 1);
    },
    cycle: function() {
      var nextIndex;
      nextIndex = this.atLast() ? 0 : this.activeCard + 1;
      return this.activate(nextIndex);
    },
    find: function(name) {
      return Luca(name);
    },
    firstActivation: function() {
      var _ref;
      return (_ref = this.activeComponent()) != null ? _ref.trigger("first:activation", this, this.activeComponent()) : void 0;
    },
    activate: function(index, silent, callback) {
      var activationContext, current, previous,
        _this = this;
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
      if (silent !== true) {
        this.trigger("before:card:switch", previous, current);
        if (previous != null) {
          previous.trigger("before:deactivation", this, previous, current);
        }
        if (current != null) {
          current.trigger("before:activation", this, previous, current);
        }
        _.defer(function() {
          return _this.$el.data(_this.activeAttribute || "active-card", current.name);
        });
      }
      this.componentElements().hide();
      if (current.previously_activated !== true) {
        current.trigger("first:activation");
        current.previously_activated = true;
      }
      this.activeCard = index;
      this.activeComponentElement().show();
      if (silent !== true) {
        this.trigger("after:card:switch", previous, current);
        if (previous != null) {
          previous.trigger("deactivation", this, previous, current);
        }
        if (current != null) {
          current.trigger("activation", this, previous, current);
        }
      }
      activationContext = this;
      if (Luca.containers.CardView.activationContext === "current") {
        activationContext = current;
      }
      if (_.isFunction(callback)) {
        return callback.apply(activationContext, [this, previous, current]);
      }
    }
  });

  Luca.containers.CardView.activationContext = "current";

}).call(this);
(function() {

  _.def("Luca.ModalView")["extends"]("Luca.core.Container")["with"]({
    closeOnEscape: true,
    showOnInitialize: false,
    backdrop: false,
    className: "luca-ui-container modal",
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
      this.$el.modal({
        backdrop: this.backdrop === true,
        keyboard: this.closeOnEscape === true,
        show: this.showOnInitialize === true
      });
      return this;
    }
  });

  _.def("Luca.containers.ModalView")["extends"]("Luca.ModalView")["with"]();

}).call(this);
(function() {

  _.def("Luca.PageView")["extends"]("Luca.containers.CardView")["with"]({
    version: 2
  });

}).call(this);
(function() {
  var buildButton, make, panelToolbar, prepareButtons;

  panelToolbar = Luca.register("Luca.components.PanelToolbar");

  panelToolbar["extends"]("Luca.View");

  panelToolbar.defines({
    buttons: [],
    className: "luca-ui-toolbar btn-toolbar",
    well: true,
    orientation: 'top',
    autoBindEventHandlers: true,
    events: {
      "click a.btn, click .dropdown-menu li": "clickHandler"
    },
    initialize: function(options) {
      var _ref;
      this.options = options != null ? options : {};
      this._super("initialize", this, arguments);
      if (this.group === true && ((_ref = this.buttons) != null ? _ref.length : void 0) >= 0) {
        return this.buttons = [
          {
            group: true,
            buttons: this.buttons
          }
        ];
      }
    },
    clickHandler: function(e) {
      var eventId, hook, me, my, source;
      me = my = $(e.target);
      if (me.is('i')) me = my = $(e.target).parent();
      if (this.selectable === true) {
        my.siblings().removeClass("is-selected");
        me.addClass('is-selected');
      }
      if (!(eventId = my.data('eventid'))) return;
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
      if (this.selectable === true) this.$el.addClass('btn-selectable');
      this.$el.addClass("toolbar-" + this.orientation);
      if (this.align === "right") this.$el.addClass("pull-right");
      if (this.align === "left") return this.$el.addClass("pull-left");
    },
    render: function() {
      var element, _i, _len, _ref;
      this.$el.empty();
      _ref = prepareButtons(this.buttons);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        this.$el.append(element);
      }
      return this;
    }
  });

  make = Backbone.View.prototype.make;

  buildButton = function(config, wrap) {
    var autoWrapClass, buttonAttributes, buttonEl, buttons, dropdownEl, dropdownItems, label, object, white, wrapper,
      _this = this;
    if (wrap == null) wrap = true;
    if ((config.ctype != null) || (config.type != null)) {
      config.className || (config.className = "");
      config.className += 'toolbar-component';
      object = Luca(config).render();
      if (Luca.isBackboneView(object)) return object.$el;
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
    if (config.wrapper != null) wrapper += "" + config.wrapper;
    if (config.align != null) {
      wrapper += "pull-" + config.align + " align-" + config.align;
    }
    if (config.selectable === true) wrapper += 'btn-selectable';
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
        "class": _.compact(["btn", config.classes, config.className]).join(" "),
        "data-eventId": config.eventId,
        title: config.title || config.description
      };
      if (config.color != null) {
        buttonAttributes["class"] += " btn-" + config.color;
      }
      if (config.selected != null) buttonAttributes["class"] += " is-selected";
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
    var button, _i, _len, _results;
    if (buttons == null) buttons = [];
    if (wrap == null) wrap = true;
    _results = [];
    for (_i = 0, _len = buttons.length; _i < _len; _i++) {
      button = buttons[_i];
      _results.push(buildButton(button, wrap));
    }
    return _results;
  };

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
  var tabView;

  _.def('Luca.containers.TabView')["extends"]('Luca.containers.CardView')["with"];

  tabView = Luca.register("Luca.containers.TabView");

  tabView.triggers("before:select", "after:select");

  tabView.publicConfiguration({
    tab_position: 'top',
    tabVerticalOffset: '50px'
  });

  tabView.privateConfiguration({
    additionalClassNames: 'tabbable',
    navClass: "nav-tabs",
    bodyTemplate: "containers/tab_view",
    bodyEl: "div.tab-content"
  });

  tabView.defines({
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.navStyle === "list") this.navClass = "nav-list";
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "select", "highlightSelectedTab");
      this.setupHooks(this.hooks);
      return this.bind("after:card:switch", this.highlightSelectedTab);
    },
    activeTabSelector: function() {
      return this.tabSelectors().eq(this.activeCard || this.activeTab || this.activeItem);
    },
    beforeLayout: function() {
      var _ref;
      this.$el.addClass("tabs-" + this.tab_position);
      this.activeTabSelector().addClass('active');
      this.createTabSelectors();
      return (_ref = Luca.containers.CardView.prototype.beforeLayout) != null ? _ref.apply(this, arguments) : void 0;
    },
    afterRender: function() {
      var tabContainerId, _ref;
      if ((_ref = Luca.containers.CardView.prototype.afterRender) != null) {
        _ref.apply(this, arguments);
      }
      tabContainerId = this.tabContainer().attr("id");
      this.registerEvent("click #" + tabContainerId + " li a", "select");
      if (Luca.config.enableBoostrap && (this.tab_position === "left" || this.tab_position === "right")) {
        this.tabContainerWrapper().addClass("span2");
        return this.tabContentWrapper().addClass("span9");
      }
    },
    createTabSelectors: function() {
      tabView = this;
      return this.each(function(component, index) {
        var icon, link, selector, _ref;
        if (component.tabIcon) {
          icon = "<i class='icon-" + component.tabIcon + "'></i>";
        }
        link = "<a href='#'>" + (icon || '') + " " + component.title + "</a>";
        selector = tabView.make("li", {
          "class": "tab-selector",
          "data-target": index
        }, link);
        tabView.tabContainer().append(selector);
        if ((component.navHeading != null) && !((_ref = tabView.navHeadings) != null ? _ref[component.navHeading] : void 0)) {
          $(selector).before(tabView.make('li', {
            "class": "nav-header"
          }, component.navHeading));
          tabView.navHeadings || (tabView.navHeadings = {});
          return tabView.navHeadings[component.navHeading] = true;
        }
      });
    },
    highlightSelectedTab: function() {
      this.tabSelectors().removeClass('active');
      return this.activeTabSelector().addClass('active');
    },
    select: function(e) {
      var me, my;
      e.preventDefault();
      me = my = $(e.target);
      this.trigger("before:select", this);
      this.activate(my.parent().data('target'));
      return this.trigger("after:select", this);
    },
    componentElements: function() {
      return this.$(">.tab-content >." + this.componentClass);
    },
    tabContentWrapper: function() {
      return $("#" + this.cid + "-tab-view-content");
    },
    tabContainerWrapper: function() {
      return $("#" + this.cid + "-tabs-selector");
    },
    tabContainer: function() {
      return this.$("ul." + this.navClass, this.tabContainerWrapper());
    },
    tabSelectors: function() {
      return this.$('li.tab-selector', this.tabContainer());
    }
  });

}).call(this);
(function() {

  _.def('Luca.containers.Viewport').extend('Luca.containers.CardView')["with"]({
    activeItem: 0,
    additionalClassNames: 'luca-ui-viewport',
    fullscreen: true,
    fluid: false,
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      if (Luca.config.enableBoostrap === true) {
        this.wrapperClass = this.fluid === true ? Luca.containers.Viewport.fluidWrapperClass : Luca.containers.Viewport.defaultWrapperClass;
      }
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      if (this.fullscreen === true) return this.enableFullscreen();
    },
    enableFluid: function() {
      return this.enableWrapper();
    },
    disableFluid: function() {
      return this.disableWrapper();
    },
    enableWrapper: function() {
      if (this.wrapperClass != null) {
        return this.$el.parent().addClass(this.wrapperClass);
      }
    },
    disableWrapper: function() {
      if (this.wrapperClass != null) {
        return this.$el.parent().removeClass(this.wrapperClass);
      }
    },
    enableFullscreen: function() {
      $('html,body').addClass('luca-ui-fullscreen');
      return this.$el.addClass('fullscreen-enabled');
    },
    disableFullscreen: function() {
      $('html,body').removeClass('luca-ui-fullscreen');
      return this.$el.removeClass('fullscreen-enabled');
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      if (this.topNav != null) this.renderTopNavigation();
      if (this.bottomNav != null) return this.renderBottomNavigation();
    },
    height: function() {
      return this.$el.height();
    },
    width: function() {
      return this.$el.width();
    },
    afterRender: function() {
      var _ref;
      if ((_ref = Luca.containers.CardView.prototype.after) != null) {
        _ref.apply(this, arguments);
      }
      if (Luca.config.enableBoostrap === true && this.containerClassName) {
        return this.$el.children().wrap('<div class="#{ containerClassName }" />');
      }
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

  Luca.containers.Viewport.defaultWrapperClass = 'row';

  Luca.containers.Viewport.fluidWrapperClass = 'row-fluid';

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
  var application,
    __slice = Array.prototype.slice;

  application = Luca.register("Luca.Application");

  application["extends"]("Luca.containers.Viewport");

  application.triggers("controller:change", "action:change");

  application.publicInterface({
    name: "MyApp",
    defaultState: {},
    autoBoot: false,
    autoStartHistory: "before:render",
    useCollectionManager: true,
    collectionManager: {},
    collectionManagerClass: "Luca.CollectionManager",
    plugin: false,
    useController: true,
    useKeyHandler: false,
    keyEvents: {},
    components: [
      {
        type: 'template',
        name: 'welcome',
        template: 'sample/welcome',
        templateContainer: "Luca.templates"
      }
    ],
    useSocketManager: false,
    socketManagerOptions: {},
    initialize: function(options) {
      var alreadyRunning, app, appName,
        _this = this;
      this.options = options != null ? options : {};
      app = this;
      appName = this.name;
      alreadyRunning = typeof Luca.getApplication === "function" ? Luca.getApplication() : void 0;
      Luca.Application.registerInstance(this);
      this.state = new Luca.Model(this.defaultState);
      this.setupCollectionManager();
      this.setupSocketManager();
      Luca.containers.Viewport.prototype.initialize.apply(this, arguments);
      if (this.useController === true) this.setupMainController();
      this.defer(function() {
        return app.render();
      }).until(this, "ready");
      this.setupRouter();
      if (this.useKeyRouter === true) {
        console.log("The useKeyRouter property is being deprecated. switch to useKeyHandler instead");
      }
      if ((this.useKeyHandler === true || this.useKeyRouter === true) && (this.keyEvents != null)) {
        this.setupKeyHandler();
      }
      if (!(this.plugin === true || alreadyRunning)) {
        Luca.getApplication = function(name) {
          if (name == null) return app;
          return Luca.Application.instances[name];
        };
      }
      if (this.autoBoot) {
        if (Luca.util.resolve(this.name)) {
          throw "Attempting to override window." + this.name + " when it already exists";
        }
        $(function() {
          window[appName] = app;
          return app.boot();
        });
      }
      return Luca.trigger("application:available", this);
    },
    activeView: function() {
      var active;
      if (active = this.activeSubSection()) {
        return this.view(active);
      } else {
        return this.view(this.activeSection());
      }
    },
    activeSection: function() {
      return this.get("active_section");
    },
    activeSubSection: function() {
      return this.get("active_sub_section");
    },
    activePages: function() {
      var _this = this;
      return this.$('.luca-ui-controller').map(function(index, element) {
        return $(element).data('active-section');
      });
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
    set: function(attribute, value, options) {
      return this.state.set.apply(this.state, arguments);
    },
    view: function(name) {
      return Luca.cache(name);
    },
    navigate_to: function(component_name, callback) {
      return this.getMainController().navigate_to(component_name, callback);
    }
  });

  application.privateInterface({
    keyHandler: function(e) {
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
        if ((this[keyEvent] != null) && _.isFunction(this[keyEvent])) {
          return (_ref = this[keyEvent]) != null ? _ref.call(this) : void 0;
        } else {
          return this.trigger(keyEvent, e, keyname);
        }
      }
    },
    setupControllerBindings: function() {
      var app, _ref, _ref2,
        _this = this;
      app = this;
      if ((_ref = this.getMainController()) != null) {
        _ref.bind("after:card:switch", function(previous, current) {
          _this.state.set({
            active_section: current.name
          });
          return app.trigger("controller:change", previous.name, current.name);
        });
      }
      return (_ref2 = this.getMainController()) != null ? _ref2.each(function(component) {
        var type;
        type = component.type || component.ctype;
        if (type.match(/controller$/)) {
          return component.bind("after:card:switch", function(previous, current) {
            _this.state.set({
              active_sub_section: current.name
            });
            return app.trigger("action:change", previous.name, current.name);
          });
        }
      }) : void 0;
    },
    setupMainController: function() {
      var definedComponents,
        _this = this;
      if (this.useController === true) {
        definedComponents = this.components || [];
        this.components = [
          {
            type: 'controller',
            name: "main_controller",
            role: "main_controller",
            components: definedComponents
          }
        ];
        this.getMainController = function() {
          return _this.findComponentByRole('main_controller');
        };
        return this.defer(this.setupControllerBindings, false).until("after:components");
      }
    },
    setupCollectionManager: function() {
      var collectionManagerOptions, _base, _ref, _ref2, _ref3;
      if (this.useCollectionManager !== true) return;
      if ((this.collectionManager != null) && (((_ref = this.collectionManager) != null ? _ref.get : void 0) != null)) {
        return;
      }
      if (_.isString(this.collectionManagerClass)) {
        this.collectionManagerClass = Luca.util.resolve(this.collectionManagerClass);
      }
      collectionManagerOptions = this.collectionManagerOptions || {};
      if (_.isObject(this.collectionManager) && !_.isFunction((_ref2 = this.collectionManager) != null ? _ref2.get : void 0)) {
        collectionManagerOptions = this.collectionManager;
        this.collectionManager = void 0;
      }
      if (_.isString(this.collectionManager)) {
        collectionManagerOptions = {
          name: this.collectionManager
        };
      }
      this.collectionManager = typeof (_base = Luca.CollectionManager).get === "function" ? _base.get(collectionManagerOptions.name) : void 0;
      if (!_.isFunction((_ref3 = this.collectionManager) != null ? _ref3.get : void 0)) {
        return this.collectionManager = new this.collectionManagerClass(collectionManagerOptions);
      }
    },
    setupSocketManager: function() {
      return this.socket = new Luca.SocketManager(this.socketManagerOptions);
    },
    setupRouter: function() {
      var action, endpoint, fn, page, routePattern, routerClass, routerConfig, _ref, _ref2;
      if (!(this.router != null) && !(this.routes != null)) return;
      routerClass = Luca.Router;
      if (_.isString(this.router)) routerClass = Luca.util.resolve(this.router);
      routerConfig = routerClass.prototype;
      routerConfig.routes || (routerConfig.routes = {});
      routerConfig.app = this;
      if (_.isObject(this.routes)) {
        _ref = this.routes;
        for (routePattern in _ref) {
          endpoint = _ref[routePattern];
          _ref2 = endpoint.split(' '), page = _ref2[0], action = _ref2[1];
          fn = _.uniqueId(page);
          routerConfig[fn] = Luca.Application.routeTo(page).action(action);
          routerConfig.routes[routePattern] = fn;
        }
      }
      this.router = new routerClass(routerConfig);
      if (this.router && this.autoStartHistory) {
        if (this.autoStartHistory === true) {
          this.autoStartHistory = "before:render";
        }
        return this.defer(Luca.Application.startHistory, false).until(this, this.autoStartHistory);
      }
    },
    setupKeyHandler: function() {
      var handler, keyEvent, _base, _i, _len, _ref, _results;
      if (!this.keyEvents) return;
      (_base = this.keyEvents).control_meta || (_base.control_meta = {});
      if (this.keyEvents.meta_control) {
        _.extend(this.keyEvents.control_meta, this.keyEvents.meta_control);
      }
      handler = _.bind(this.keyHandler, this);
      _ref = this.keypressEvents || ["keydown"];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        keyEvent = _ref[_i];
        _results.push($(document).on(keyEvent, handler));
      }
      return _results;
    }
  });

  application.classInterface({
    instances: {},
    registerInstance: function(app) {
      return Luca.Application.instances[app.name] = app;
    },
    routeTo: function() {
      var callback, first, last, pages, routeHelper, specifiedAction;
      pages = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      last = _(pages).last();
      first = _(pages).first();
      callback = void 0;
      specifiedAction = void 0;
      routeHelper = function() {
        var action, args, index, nextItem, page, path, target, _i, _len, _results;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        path = this.app || Luca();
        index = 0;
        if (pages.length === 1 && (target = Luca(first))) {
          pages = target.controllerPath();
        }
        _results = [];
        for (_i = 0, _len = pages.length; _i < _len; _i++) {
          page = pages[_i];
          if (!(_.isString(page))) continue;
          nextItem = pages[++index];
          target = Luca(page);
          if (page === last) {
            callback = (specifiedAction != null) && (target[specifiedAction] != null) ? _.bind(target[specifiedAction], target) : target.routeHandler != null ? target.routeHandler : void 0;
          }
          callback || (callback = _.isFunction(nextItem) ? _.bind(nextItem, target) : _.isObject(nextItem) ? (action = nextItem.action && (target[action] != null)) ? _.bind(target[action], target) : void 0 : void 0);
          _results.push(path = path.navigate_to(page, function() {
            return callback != null ? callback.apply(target, args) : void 0;
          }));
        }
        return _results;
      };
      routeHelper.action = function(action) {
        specifiedAction = action;
        return routeHelper;
      };
      return routeHelper;
    },
    startHistory: function() {
      return Backbone.history.start();
    }
  });

  application.afterDefinition(function() {
    return Luca.routeHelper = Luca.Application.routeTo;
  });

  application.register();

}).call(this);
(function() {
  var toolbar;

  _.def('Luca.components.Toolbar')["extends"]('Luca.core.Container')["with"];

  toolbar = Luca.register("Luca.components.Toolbar");

  toolbar["extends"]("Luca.core.Container");

  toolbar.defines({
    className: 'luca-ui-toolbar toolbar',
    position: 'bottom',
    prepareComponents: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        return component.container = _this.$el;
      });
    },
    render: function() {
      $(this.container).append(this.el);
      return this;
    }
  });

}).call(this);
(function() {
  var loaderView;

  loaderView = Luca.register("Luca.components.CollectionLoaderView");

  loaderView["extends"]("Luca.View");

  loaderView.defines({
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
  var collectionView, make;

  collectionView = Luca.register("Luca.components.CollectionView");

  collectionView["extends"]("Luca.components.Panel");

  collectionView.mixesIn("QueryCollectionBindings", "LoadMaskable", "Filterable", "Paginatable");

  collectionView.triggers("before:refresh", "after:refresh", "refresh", "empty:results");

  collectionView.publicConfiguration({
    tagName: "ol",
    bodyClassName: "collection-ui-panel",
    itemTagName: 'li',
    itemClassName: 'collection-item',
    itemTemplate: void 0,
    itemRenderer: void 0,
    itemProperty: void 0
  });

  collectionView.defines({
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "refresh");
      if (!((this.collection != null) || this.options.collection)) {
        console.log("Error on initialize of collection view", this);
        throw "Collection Views must specify a collection";
      }
      if (!((this.itemTemplate != null) || (this.itemRenderer != null) || (this.itemProperty != null))) {
        throw "Collection Views must specify an item template or item renderer function";
      }
      if (_.isString(this.collection)) {
        if (Luca.CollectionManager.get()) {
          this.collection = Luca.CollectionManager.get().getOrCreate(this.collection);
        } else {
          console.log("String Collection but no collection manager");
        }
      }
      if (!Luca.isBackboneCollection(this.collection)) {
        console.log("Missing Collection on " + (this.name || this.cid), this, this.collection);
        throw "Collection Views must have a valid backbone collection";
      }
      this.collection.on("before:fetch", function() {
        return _this.trigger("enable:loadmask");
      });
      this.collection.bind("reset", function() {
        _this.refresh();
        return _this.trigger("disable:loadmask");
      });
      this.collection.bind("remove", function() {
        return _this.refresh();
      });
      this.collection.bind("add", function() {
        return _this.refresh();
      });
      if (this.observeChanges === true) {
        this.collection.on("change", this.refreshModel, this);
      }
      Luca.components.Panel.prototype.initialize.apply(this, arguments);
      return this.on("refresh", this.refresh, this);
    },
    attributesForItem: function(item, model) {
      return _.extend({}, {
        "class": this.itemClassName,
        "data-index": item.index,
        "data-model-id": item.model.get('id')
      });
    },
    contentForItem: function(item) {
      var content, templateFn;
      if (item == null) item = {};
      if ((this.itemTemplate != null) && (templateFn = Luca.template(this.itemTemplate))) {
        return content = templateFn.call(this, item);
      }
      if ((this.itemRenderer != null) && _.isFunction(this.itemRenderer)) {
        return content = this.itemRenderer.call(this, item, item.model, item.index);
      }
      if (this.itemProperty && (item.model != null)) {
        return content = item.model.read(this.itemProperty);
      }
      return "";
    },
    makeItem: function(model, index) {
      var attributes, content, item;
      item = this.prepareItem != null ? this.prepareItem.call(this, model, index) : {
        model: model,
        index: index
      };
      attributes = this.attributesForItem(item, model);
      content = this.contentForItem(item);
      try {
        return make(this.itemTagName, attributes, content);
      } catch (e) {
        return console.log("Error generating DOM element for CollectionView", this, model, index);
      }
    },
    locateItemElement: function(id) {
      return this.$("." + this.itemClassName + "[data-model-id='" + id + "']");
    },
    refreshModel: function(model) {
      var index;
      index = this.collection.indexOf(model);
      this.locateItemElement(model.get('id')).empty().append(this.contentForItem({
        model: model,
        index: index
      }, model));
      return this.trigger("model:refreshed", index, model);
    },
    refresh: function(query, options, models) {
      var index, model, _i, _len;
      query || (query = this.getQuery());
      options || (options = this.getQueryOptions());
      models || (models = this.getModels(query, options));
      this.$bodyEl().empty();
      this.trigger("before:refresh", models, query, options);
      if (models.length === 0) this.trigger("empty:results");
      index = 0;
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        this.$append(this.makeItem(model, index++));
      }
      this.trigger("after:refresh", models, query, options);
      return this;
    },
    registerEvent: function(domEvent, selector, handler) {
      var eventTrigger;
      if (!(handler != null) && _.isFunction(selector)) {
        handler = selector;
        selector = void 0;
      }
      eventTrigger = _([domEvent, "" + this.itemTagName + "." + this.itemClassName, selector]).compact().join(" ");
      return Luca.View.prototype.registerEvent(eventTrigger, handler);
    },
    render: function() {
      this.refresh();
      if (this.$el.parent().length > 0 && (this.container != null)) this.$attach();
      return this;
    }
  });

  make = Luca.View.prototype.make;

}).call(this);
(function() {
  var controller;

  controller = Luca.register("Luca.components.Controller");

  controller["extends"]("Luca.containers.CardView");

  controller.publicInterface({
    "default": function(callback) {
      return this.navigate_to(this.defaultPage || this.defaultCard, callback);
    },
    activePage: function() {
      return this.activeSection();
    },
    navigate_to: function(section, callback) {
      var _this = this;
      section || (section = this.defaultCard);
      this.activate(section, false, function(activator, previous, current) {
        _this.state.set({
          active_section: current.name
        });
        if (_.isFunction(callback)) return callback.call(current);
      });
      return this.find(section);
    }
  });

  controller.classMethods({
    controllerPath: function() {
      var atBase, component, list;
      component = this;
      list = [component.name];
      atBase = false;
      while (component && !atBase) {
        component = typeof component.getParent === "function" ? component.getParent() : void 0;
        if ((component != null ? component.role : void 0) === "main_controller") {
          atBase = true;
        }
        if ((component != null) && !atBase) list.push(component.name);
      }
      return list.reverse();
    }
  });

  controller.defines({
    additionalClassNames: 'luca-ui-controller',
    activeAttribute: "active-section",
    stateful: true,
    initialize: function(options) {
      var _ref;
      this.options = options;
      this.defaultCard || (this.defaultCard = this.defaultPage || (this.defaultPage = ((_ref = this.components[0]) != null ? _ref.name : void 0) || 0));
      this.defaultPage || (this.defaultPage = this.defaultCard);
      this.defaultState || (this.defaultState = {
        active_section: this.defaultPage
      });
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      if (this.defaultCard == null) {
        throw "Controllers must specify a defaultCard property and/or the first component must have a name";
      }
      return this._().each(function(component) {
        return component.controllerPath = Luca.components.Controller.controllerPath;
      });
    },
    each: function(fn) {
      var _this = this;
      return _(this.components).each(function(component) {
        return fn.call(_this, component);
      });
    },
    activeSection: function() {
      return this.get("active_section");
    },
    pageControllers: function(deep) {
      if (deep == null) deep = false;
      return this.controllers.apply(this, arguments);
    },
    controllers: function(deep) {
      if (deep == null) deep = false;
      return this.select(function(component) {
        var type;
        type = component.type || component.ctype;
        return type === "controller" || type === "page_controller";
      });
    },
    availablePages: function() {
      return this.availableSections.apply(this, arguments);
    },
    availableSections: function() {
      var base,
        _this = this;
      base = {};
      base[this.name] = this.sectionNames();
      return _(this.controllers()).reduce(function(memo, controller) {
        memo[controller.name] = controller.sectionNames();
        return memo;
      }, base);
    },
    pageNames: function() {
      return this.sectionNames();
    },
    sectionNames: function(deep) {
      if (deep == null) deep = false;
      return this.pluck('name');
    }
  });

}).call(this);
(function() {
  var buttonField;

  buttonField = Luca.register("Luca.fields.ButtonField");

  buttonField["extends"]("Luca.core.Field");

  buttonField.triggers("button:click");

  buttonField.publicConfiguration({
    readOnly: true,
    input_value: void 0,
    input_type: "button",
    icon_class: void 0,
    input_name: void 0,
    white: void 0
  });

  buttonField.privateConfiguration({
    isButton: true,
    template: "fields/button_field",
    events: {
      "click input": "click_handler"
    }
  });

  buttonField.privateInterface({
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
  var checkboxArray, make;

  make = Luca.View.prototype.make;

  checkboxArray = Luca.register("Luca.fields.CheckboxArray");

  checkboxArray["extends"]("Luca.core.Field");

  checkboxArray.defines({
    version: 2,
    template: "fields/checkbox_array",
    className: "luca-ui-checkbox-array",
    events: {
      "click input": "clickHandler"
    },
    selectedItems: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.concerns.Deferrable);
      _.bindAll(this, "renderCheckboxes", "clickHandler", "checkSelected");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.valueField || (this.valueField = "id");
      return this.displayField || (this.displayField = "name");
    },
    afterInitialize: function(options) {
      var cbArray;
      this.options = options != null ? options : {};
      try {
        this.configure_collection();
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      cbArray = this;
      if (!Luca.isBackboneCollection(this.collection)) {
        throw "Checkbox Array Fields must specify a @collection property";
      }
      if (this.collection.length > 0) {
        return this.renderCheckboxes();
      } else {
        return this.defer("renderCheckboxes").until(this.collection, "reset");
      }
    },
    clickHandler: function(event) {
      var checkbox;
      checkbox = $(event.target);
      if (checkbox.prop('checked')) {
        return this.selectedItems.push(checkbox.val());
      } else {
        if (_(this.selectedItems).include(checkbox.val())) {
          return this.selectedItems = _(this.selectedItems).without(checkbox.val());
        }
      }
    },
    controls: function() {
      return this.$('.controls');
    },
    renderCheckboxes: function() {
      var _this = this;
      this.controls().empty();
      this.selectedItems = [];
      this.collection.each(function(model) {
        var element, inputElement, input_id, label, value;
        value = model.get(_this.valueField);
        label = model.get(_this.displayField);
        input_id = _.uniqueId("" + _this.cid + "_checkbox");
        inputElement = make("input", {
          type: "checkbox",
          "class": "array-checkbox",
          name: _this.input_name,
          value: value,
          id: input_id
        });
        element = make("label", {
          "for": input_id
        }, inputElement);
        $(element).append(" " + label);
        return _this.controls().append(element);
      });
      this.trigger("checkboxes:rendered", this.checkboxesRendered = true);
      return this;
    },
    uncheckAll: function() {
      return this.allFields().prop('checked', false);
    },
    allFields: function() {
      return this.controls().find("input[type='checkbox']");
    },
    checkSelected: function(items) {
      var checkbox, value, _i, _len, _ref;
      if (items != null) this.selectedItems = items;
      this.uncheckAll();
      _ref = this.selectedItems;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        checkbox = this.controls().find("input[value='" + value + "']");
        checkbox.prop('checked', true);
      }
      return this.selectedItems;
    },
    getValue: function() {
      var field, _i, _len, _ref, _results;
      _ref = this.allFields();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        if (this.$(field).prop('checked')) _results.push(this.$(field).val());
      }
      return _results;
    },
    setValue: function(items) {
      var cbArray;
      this.selectedItems = items;
      if (this.checkboxesRendered === true) {
        return this.checkSelected(items);
      } else {
        cbArray = this;
        return this.defer(function() {
          return cbArray.checkSelected(items);
        }).until("checkboxes:rendered");
      }
    },
    getValues: function() {
      return this.getValue();
    },
    setValues: function(items) {
      return this.setValue(items);
    }
  });

}).call(this);
(function() {
  var checkboxField;

  checkboxField = Luca.register("Luca.fields.CheckboxField");

  checkboxField["extends"]("Luca.core.Field");

  checkboxField.triggers("checked", "unchecked");

  checkboxField.publicConfiguration({
    send_blanks: true,
    input_value: 1
  });

  checkboxField.privateConfiguration({
    template: 'fields/checkbox_field',
    events: {
      "change input": "change_handler"
    }
  });

  checkboxField.privateInterface({
    change_handler: function(e) {
      var me, my;
      me = my = $(e.target);
      if (me.is(":checked")) {
        this.trigger("checked");
      } else {
        this.trigger("unchecked");
      }
      return this.trigger("on:change", this, e, me.is(":checked"));
    },
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.bindAll(this, "change_handler");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      return this.label || (this.label = this.name);
    }
  });

  checkboxField.publicInterface({
    setValue: function(checked) {
      return this.getInputElement().attr('checked', checked);
    },
    getValue: function() {
      return this.getInputElement().is(":checked");
    }
  });

  checkboxField.defines({
    version: 1
  });

}).call(this);
(function() {
  var fileUpload;

  fileUpload = Luca.register("Luca.fields.FileUploadField");

  fileUpload["extends"]("Luca.core.Field");

  fileUpload.defines({
    version: 1,
    template: 'fields/file_upload_field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      return this.helperText || (this.helperText = "");
    }
  });

}).call(this);
(function() {
  var hiddenField;

  hiddenField = Luca.register("Luca.fields.HiddenField");

  hiddenField["extends"]("Luca.core.Field");

  hiddenField.defines({
    template: 'fields/hidden_field',
    afterInitialize: function() {
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.input_value || (this.input_value = this.value);
      return this.label || (this.label = this.name);
    }
  });

}).call(this);
(function() {
  var labelField;

  labelField = Luca.register("Luca.components.LabelField");

  labelField["extends"]("Luca.core.Field");

  labelField.defines({
    formatter: function(value) {
      value || (value = this.getValue());
      return _.str.titleize(value);
    },
    setValue: function(value) {
      this.trigger("change", value, this.getValue());
      this.getInputElement().attr('value', value);
      return this.$('.value').html(this.formatter(value));
    }
  });

}).call(this);
(function() {
  var selectField;

  selectField = Luca.register("Luca.fields.SelectField");

  selectField["extends"]("Luca.core.Field");

  selectField.triggers("after:select");

  selectField.defines({
    events: {
      "change select": "change_handler"
    },
    template: "fields/select_field",
    includeBlank: true,
    blankValue: '',
    blankText: 'Select One',
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      _.extend(this, Luca.concerns.Deferrable);
      _.bindAll(this, "change_handler", "populateOptions", "beforeFetch");
      Luca.core.Field.prototype.initialize.apply(this, arguments);
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      if (_.isUndefined(this.retainValue)) return this.retainValue = true;
    },
    afterInitialize: function() {
      var _ref, _ref2, _ref3;
      if ((_ref = this.collection) != null ? _ref.data : void 0) {
        this.valueField || (this.valueField = "id");
        this.displayField || (this.displayField = "name");
        this.parseData();
      }
      try {
        this.configure_collection(this.setAsDeferrable);
      } catch (e) {
        console.log("Error Configuring Collection", this, e.message);
      }
      if ((_ref2 = this.collection) != null) {
        _ref2.bind("before:fetch", this.beforeFetch);
      }
      return (_ref3 = this.collection) != null ? _ref3.bind("reset", this.populateOptions) : void 0;
    },
    parseData: function() {
      var _this = this;
      return this.collection.data = _(this.collection.data).map(function(record) {
        var hash;
        if (!_.isArray(record)) return record;
        hash = {};
        hash[_this.valueField] = record[0];
        hash[_this.displayField] = record[1] || record[0];
        return hash;
      });
    },
    getInputElement: function() {
      return this.input || (this.input = this.$('select').eq(0));
    },
    afterRender: function() {
      var _ref, _ref2, _ref3;
      if (((_ref = this.collection) != null ? (_ref2 = _ref.models) != null ? _ref2.length : void 0 : void 0) > 0) {
        return this.populateOptions();
      } else {
        return (_ref3 = this.collection) != null ? _ref3.trigger("reset") : void 0;
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
      this.getInputElement().html('');
      if (this.includeBlank) {
        return this.getInputElement().append("<option value='" + this.blankValue + "'>" + this.blankText + "</option>");
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
          return _this.getInputElement().append(option);
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
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      this.input_value || (this.input_value = "");
      this.inputStyles || (this.inputStyles = "height:" + this.height + ";width:" + this.width);
      this.placeHolder || (this.placeHolder = "");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
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
  var textField;

  textField = Luca.register('Luca.fields.TextField');

  textField["extends"]('Luca.core.Field');

  textField.defines({
    events: {
      "blur input": "blur_handler",
      "focus input": "focus_handler",
      "change input": "change_handler"
    },
    template: 'fields/text_field',
    autoBindEventHandlers: true,
    send_blanks: true,
    keyEventThrottle: 300,
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.enableKeyEvents) this.registerEvent("keyup input", "keyup_handler");
      this.input_id || (this.input_id = _.uniqueId('field'));
      this.input_name || (this.input_name = this.name);
      this.label || (this.label = this.name);
      this.input_class || (this.input_class = this["class"]);
      this.input_value || (this.input_value = this.value || "");
      if (this.prepend) {
        this.$el.addClass('input-prepend');
        this.addOn = this.prepend;
      }
      if (this.append) {
        this.$el.addClass('input-append');
        this.addOn = this.append;
      }
      this.placeHolder || (this.placeHolder = "");
      return Luca.core.Field.prototype.initialize.apply(this, arguments);
    },
    keyup_handler: function(e) {
      return this.trigger("on:keyup", this, e);
    },
    blur_handler: function(e) {
      return this.trigger("on:blur", this, e);
    },
    focus_handler: function(e) {
      return this.trigger("on:focus", this, e);
    },
    change_handler: function(e) {
      return this.trigger("on:change", this, e);
    }
  });

}).call(this);
(function() {
  var typeAheadField;

  typeAheadField = Luca.register("Luca.fields.TypeAheadField");

  typeAheadField["extends"]("Luca.fields.TextField");

  typeAheadField.defines({
    getSource: function() {
      return Luca.util.read(this.source) || [];
    },
    matcher: function(item) {
      return true;
    },
    beforeRender: function() {
      Luca.fields.TextField.prototype.beforeRender.apply(this, arguments);
      return this.getInputElement().attr('data-provide', 'typeahead');
    },
    afterRender: function() {
      Luca.fields.TextField.prototype.afterRender.apply(this, arguments);
      return this.getInputElement().typeahead({
        matcher: this.matcher,
        source: this.getSource()
      });
    }
  });

}).call(this);
(function() {
  var toolbar;

  toolbar = Luca.register("Luca.components.FormButtonToolbar");

  toolbar["extends"]("Luca.components.Toolbar");

  toolbar.defines({
    className: 'luca-ui-form-toolbar form-actions',
    position: 'bottom',
    includeReset: false,
    render: function() {
      $(this.container).append(this.el);
      return this;
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
  var formView;

  formView = Luca.register("Luca.components.FormView");

  formView["extends"]("Luca.core.Container");

  formView.triggers("before:submit", "before:reset", "before:load", "before:load:new", "before:load:existing", "after:submit", "after:reset", "after:load", "after:load:new", "after:load:existing", "after:submit:success", "after:submit:fatal_error", "after:submit:error");

  formView.defines({
    tagName: 'form',
    className: 'luca-ui-form-view',
    events: {
      "click .submit-button": "submitHandler",
      "click .reset-button": "resetHandler"
    },
    toolbar: true,
    legend: "",
    bodyClassName: "form-view-body",
    version: 1,
    initialize: function(options) {
      this.options = options != null ? options : {};
      if (this.loadMask == null) this.loadMask = Luca.config.enableBoostrap;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.components || (this.components = this.fields);
      _.bindAll(this, "submitHandler", "resetHandler", "renderToolbars");
      this.state || (this.state = new Backbone.Model);
      this.setupHooks(this.hooks);
      this.applyStyleClasses();
      if (this.toolbar !== false && (!this.topToolbar && !this.bottomToolbar)) {
        if (this.toolbar === "both" || this.toolbar === "top") {
          this.topToolbar = this.getDefaultToolbar();
        }
        if (this.toolbar !== "top") {
          return this.bottomToolbar = this.getDefaultToolbar();
        }
      }
    },
    getDefaultToolbar: function() {
      return Luca.components.FormView.defaultFormViewToolbar;
    },
    applyStyleClasses: function() {
      if (Luca.config.enableBoostrap) this.applyBootstrapStyleClasses();
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
      me = my = $(e != null ? e.target : void 0);
      this.trigger("before:reset", this);
      this.reset();
      return this.trigger("after:reset", this);
    },
    submitHandler: function(e) {
      var me, my;
      me = my = $(e != null ? e.target : void 0);
      this.trigger("before:submit", this);
      if (this.loadMask === true) this.trigger("enable:loadmask", this);
      if (this.hasModel()) return this.submit();
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
      var passOne;
      passOne = _(this.getFields('name', name)).first();
      if (passOne != null) return passOne;
      return _(this.getFields('input_name', name)).first();
    },
    getFields: function(attr, value) {
      var fields;
      fields = this.selectByAttribute("isField", true, true);
      if ((attr != null) && (value != null)) {
        fields = _(fields).select(function(field) {
          var property;
          property = field[attr];
          if (_.isFunction(property)) property = property.call(field);
          return property === value;
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
      var values,
        _this = this;
      if (options == null) options = {};
      if (options.reject_blank == null) options.reject_blank = true;
      if (options.skip_buttons == null) options.skip_buttons = true;
      if (options.blanks === false) options.reject_blank = true;
      values = _(this.getFields()).inject(function(memo, field) {
        var allowBlankValues, key, skip, value, valueIsBlank;
        value = field.getValue();
        key = field.input_name || field.name;
        valueIsBlank = !!(_.str.isBlank(value) || _.isUndefined(value));
        allowBlankValues = !options.reject_blank && !field.send_blanks;
        if (options.debug) {
          console.log("" + key + " Options", options, "Value", value, "Value Is Blank?", valueIsBlank, "Allow Blanks?", allowBlankValues);
        }
        if (options.skip_buttons && field.isButton) {
          skip = true;
        } else {
          if (valueIsBlank && allowBlankValues === false) skip = true;
          if (field.input_name === "id" && valueIsBlank === true) skip = true;
        }
        if (options.debug) console.log("Skip is true on " + key);
        if (skip !== true) memo[key] = value;
        return memo;
      }, options.defaults || {});
      return values;
    },
    submit_success_handler: function(model, response, xhr) {
      this.trigger("after:submit", this, model, response);
      if (this.loadMask === true) this.trigger("disable:loadmask", this);
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
    hasModel: function() {
      return this.current_model != null;
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
    },
    flash: function(message) {
      if (this.$('.toolbar-container.top').length > 0) {
        return this.$('.toolbar-container.top').after(message);
      } else {
        return this.$bodyEl().prepend(message);
      }
    },
    successFlashDelay: 1500,
    successMessage: function(message) {
      var _this = this;
      this.$('.alert.alert-success').remove();
      this.flash(Luca.template("components/form_alert", {
        className: "alert alert-success",
        message: message
      }));
      return _.delay(function() {
        return _this.$('.alert.alert-success').fadeOut();
      }, this.successFlashDelay || 0);
    },
    errorMessage: function(message) {
      this.$('.alert.alert-error').remove();
      return this.flash(Luca.template("components/form_alert", {
        className: "alert alert-error",
        message: message
      }));
    }
  });

  Luca.components.FormView.defaultFormViewToolbar = {
    buttons: [
      {
        icon: "remove-sign",
        label: "Reset",
        eventId: "click:reset",
        className: "reset-button",
        align: 'right'
      }, {
        icon: "ok-sign",
        white: true,
        label: "Save Changes",
        eventId: "click:submit",
        color: "success",
        className: 'submit-button',
        align: 'right'
      }
    ]
  };

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
      _.extend(this, Luca.concerns.Deferrable);
      if (this.loadMask == null) this.loadMask = Luca.config.enableBoostrap;
      if (this.loadMask === true) {
        this.loadMaskEl || (this.loadMaskEl = ".luca-ui-g-view-body");
      }
      Luca.components.Panel.prototype.initialize.apply(this, arguments);
      this.configure_collection(true);
      this.collection.bind("before:fetch", function() {
        if (_this.loadMask === true) return _this.trigger("enable:loadmask");
      });
      this.collection.bind("reset", function(collection) {
        _this.refresh();
        if (_this.loadMask === true) _this.trigger("disable:loadmask");
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
          return $(rowEl).html(cells.join(" "));
        } catch (error) {
          return console.log("Error in change handler for GridView.collection", error, _this, model);
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
      if (Luca.config.enableBoostrap) this.table.addClass('table');
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

  _.def("Luca.components.LoadMask")["extends"]("Luca.View")["with"]({
    className: "luca-ui-load-mask",
    bodyTemplate: "components/load_mask"
  });

}).call(this);
(function() {
  var multiView, propagateCollectionComponents, validateComponent;

  multiView = Luca.register("Luca.components.MultiCollectionView");

  multiView["extends"]("Luca.containers.CardView");

  multiView.mixesIn("QueryCollectionBindings", "LoadMaskable", "Filterable", "Paginatable");

  multiView.triggers("before:refresh", "after:refresh", "refresh", "empty:results");

  multiView.defines({
    version: 1,
    stateful: true,
    defaultState: {
      activeView: 0
    },
    viewContainerClass: "luca-ui-multi-view-container",
    initialize: function(options) {
      var view, _i, _len, _ref;
      this.options = options != null ? options : {};
      this.components || (this.components = this.views);
      _ref = this.components;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        validateComponent(view);
      }
      Luca.containers.CardView.prototype.initialize.apply(this, arguments);
      this.on("refresh", this.refresh, this);
      this.on("after:card:switch", this.refresh, this);
      return this.on("after:components", propagateCollectionComponents, this);
    },
    relayAfterRefresh: function(models, query, options) {
      return this.trigger("after:refresh", models, query, options);
    },
    refresh: function() {
      var _ref;
      return (_ref = this.activeComponent()) != null ? _ref.trigger("refresh") : void 0;
    }
  });

  propagateCollectionComponents = function() {
    var component, container, _i, _len, _ref, _results,
      _this = this;
    container = this;
    _ref = this.components;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      component.on("after:refresh", function(models, query, options) {
        _this.debug("collection member after refresh");
        return _this.trigger("after:refresh", models, query, options);
      });
      _results.push(_.extend(component, {
        collection: container.getCollection(),
        getQuery: function() {
          return container.getQuery.call(container);
        },
        getQueryOptions: function() {
          return container.getQueryOptions.call(container);
        }
      }));
    }
    return _results;
  };

  validateComponent = function(component) {
    var type;
    type = component.type || component.ctype;
    if (type === "collection" || type === "collection_view" || type === "table" || type === "table_view") {
      return;
    }
    throw "The MultiCollectionView expects to contain multiple collection views";
  };

}).call(this);
(function() {

  _.def("Luca.components.NavBar")["extends"]("Luca.View")["with"]({
    fixed: true,
    position: 'top',
    className: 'navbar',
    brand: "Luca.js",
    bodyTemplate: 'nav_bar',
    bodyClassName: 'luca-ui-navbar-body',
    beforeRender: function() {
      if (this.fixed) this.$el.addClass("navbar-fixed-" + this.position);
      if (this.brand != null) {
        this.content().append("<a class='brand' href='#'>" + this.brand + "</a>");
      }
      if (this.template) {
        return this.content().append(Luca.template(this.template, this));
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

  _.def("Luca.PageController")["extends"]("Luca.components.Controller")["with"]({
    version: 2
  });

}).call(this);
(function() {
  var paginationControl;

  paginationControl = Luca.register("Luca.components.PaginationControl");

  paginationControl["extends"]("Luca.View");

  paginationControl.defines({
    template: "components/pagination",
    stateful: true,
    autoBindEventHandlers: true,
    events: {
      "click a[data-page-number]": "selectPage",
      "click a.next": "nextPage",
      "click a.prev": "previousPage"
    },
    afterInitialize: function() {
      var _ref,
        _this = this;
      _.bindAll(this, "updateWithPageCount");
      return (_ref = this.state) != null ? _ref.on("change", function(state, numberOfPages) {
        return _this.updateWithPageCount(state.get('numberOfPages'));
      }) : void 0;
    },
    limit: function() {
      var _ref;
      return parseInt(this.state.get('limit') || ((_ref = this.collection) != null ? _ref.length : void 0));
    },
    page: function() {
      return parseInt(this.state.get('page') || 1);
    },
    nextPage: function() {
      if (!this.nextEnabled()) return;
      return this.state.set('page', this.page() + 1);
    },
    previousPage: function() {
      if (!this.previousEnabled()) return;
      return this.state.set('page', this.page() - 1);
    },
    selectPage: function(e) {
      var me, my;
      me = my = this.$(e.target);
      if (!me.is('a.page')) me = my = my.closest('a.page');
      my.siblings().removeClass('is-selected');
      me.addClass('is-selected');
      return this.setPage(my.data('page-number'));
    },
    setPage: function(page, options) {
      if (page == null) page = 1;
      if (options == null) options = {};
      return this.state.set('page', page, options);
    },
    setLimit: function(limit, options) {
      if (limit == null) limit = 1;
      if (options == null) options = {};
      return this.state.set('limit', limit, options);
    },
    pageButtonContainer: function() {
      return this.$('.group');
    },
    previousEnabled: function() {
      return this.page() > 1;
    },
    nextEnabled: function() {
      return this.page() < this.totalPages();
    },
    previousButton: function() {
      return this.$('a.page.prev');
    },
    nextButton: function() {
      return this.$('a.page.next');
    },
    pageButtons: function() {
      return this.$('a[data-page-number]', this.pageButtonContainer());
    },
    updateWithPageCount: function(pageCount, models) {
      var modelCount,
        _this = this;
      this.pageCount = pageCount;
      if (models == null) models = [];
      modelCount = models.length;
      this.pageButtonContainer().empty();
      _(this.pageCount).times(function(index) {
        var button, page;
        page = index + 1;
        button = _this.make("a", {
          "data-page-number": page,
          "class": "page"
        }, page);
        return _this.pageButtonContainer().append(button);
      });
      this.toggleNavigationButtons();
      this.selectActivePageButton();
      return this;
    },
    toggleNavigationButtons: function() {
      this.$('a.next, a.prev').addClass('disabled');
      if (this.nextEnabled()) this.nextButton().removeClass('disabled');
      if (this.previousEnabled()) {
        return this.previousButton().removeClass('disabled');
      }
    },
    selectActivePageButton: function() {
      return this.activePageButton().addClass('is-selected');
    },
    activePageButton: function() {
      return this.pageButtons().filter("[data-page-number='" + (this.page()) + "']");
    },
    totalPages: function() {
      return this.pageCount;
    },
    totalItems: function() {
      var _ref;
      return parseInt(((_ref = this.collection) != null ? _ref.length : void 0) || 0);
    },
    itemsPerPage: function(value, options) {
      if (options == null) options = {};
      if (value != null) this.state.set("limit", value, options);
      return parseInt(this.state.get("limit"));
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
      var _ref,
        _this = this;
      this.options = options;
      _.extend(this, this.options);
      this.routeHandlers = _(this.routes).values();
      _(this.routeHandlers).each(function(route_id) {
        return _this.bind("route:" + route_id, function() {
          return _this.trigger.apply(_this, ["change:navigation", route_id].concat(_(arguments).flatten()));
        });
      });
      return (_ref = Backbone.Router.initialize) != null ? _ref.apply(this, arguments) : void 0;
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
  var make;

  _.def("Luca.components.TableView")["extends"]("Luca.components.CollectionView")["with"]({
    additionalClassNames: "table",
    tagName: "table",
    bodyTemplate: "table_view",
    bodyTagName: "tbody",
    bodyClassName: "table-body",
    itemTagName: "tr",
    stateful: true,
    observeChanges: true,
    widths: [],
    columns: [],
    emptyText: "There are no results to display",
    itemRenderer: function(item, model) {
      return Luca.components.TableView.rowRenderer.call(this, item, model);
    },
    initialize: function(options) {
      var column, index, width,
        _this = this;
      this.options = options != null ? options : {};
      Luca.components.CollectionView.prototype.initialize.apply(this, arguments);
      index = 0;
      this.columns = (function() {
        var _i, _len, _ref, _results;
        _ref = this.columns;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          if (width = this.widths[index]) column.width = width;
          if (_.isString(column)) {
            column = {
              reader: column
            };
          }
          if (!(column.header != null)) {
            column.header = _.str.titleize(_.str.humanize(column.reader));
          }
          index++;
          _results.push(column);
        }
        return _results;
      }).call(this);
      return this.defer(function() {
        return Luca.components.TableView.renderHeader.call(_this, _this.columns, _this.$('thead'));
      }).until("after:render");
    }
  });

  make = Backbone.View.prototype.make;

  Luca.components.TableView.renderHeader = function(columns, targetElement) {
    var column, content, index, _i, _len, _results;
    index = 0;
    content = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        column = columns[_i];
        _results.push("<th data-col-index='" + (index++) + "'>" + column.header + "</th>");
      }
      return _results;
    })();
    this.$(targetElement).append("<tr>" + (content.join('')) + "</tr>");
    index = 0;
    _results = [];
    for (_i = 0, _len = columns.length; _i < _len; _i++) {
      column = columns[_i];
      if (column.width != null) {
        _results.push(this.$("th[data-col-index='" + (index++) + "']", targetElement).css('width', column.width));
      }
    }
    return _results;
  };

  Luca.components.TableView.rowRenderer = function(item, model, index) {
    var colIndex, columnConfig, _i, _len, _ref, _results;
    colIndex = 0;
    _ref = this.columns;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      columnConfig = _ref[_i];
      _results.push(Luca.components.TableView.renderColumn.call(this, columnConfig, item, model, colIndex++));
    }
    return _results;
  };

  Luca.components.TableView.renderColumn = function(column, item, model, index) {
    var cellValue;
    cellValue = model.read(column.reader);
    if (_.isFunction(column.renderer)) {
      cellValue = column.renderer.call(this, cellValue, model, column);
    }
    return make("td", {
      "data-col-index": index
    }, cellValue);
  };

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



}).call(this);
(function() {



}).call(this);



