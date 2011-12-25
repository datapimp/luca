(function() {

  _.mixin(_.string);

  window.Luca = {
    core: {},
    containers: {},
    components: {},
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

  Luca.registry.lookup = function(ctype) {
    var c, className, nestedLookup, parents;
    c = Luca.registry.classes[ctype];
    if (c != null) return c;
    nestedLookup = function(namespace) {
      var parent;
      return parent = _(namespace.split(/\./)).inject(function(obj, key) {
        return obj = obj[key];
      }, window);
    };
    className = _.camelize(_.capitalize(ctype));
    parents = _(Luca.registry.namespaces).map(function(namespace) {
      return nestedLookup(namespace);
    });
    return _.first(_.compact(_(parents).map(function(parent) {
      return parent[className];
    })));
  };

  Luca.util.LazyObject = function(config) {
    var component_class, constructor, ctype;
    ctype = config.ctype;
    component_class = Luca.registry.lookup(ctype);
    if (!component_class) throw "Invalid Component Type: " + ctype;
    constructor = eval(component_class);
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

}).call(this);
(function() {

  Luca.View = Backbone.View;

  Luca.View.original_extend = Luca.View.extend;

  Luca.View.extend = function(definition) {
    var __original_render;
    __original_render = definition.render || (function() {});
    definition.render = function() {
      var _this = this;
      if (this.deferrable) {
        return this.deferrable.bind(this.deferrable_event, function() {
          _this.trigger("before:render", _this);
          __original_render.apply(_this, arguments);
          return _this.trigger("after:render", _this);
        });
      } else {
        this.trigger("before:render", this);
        __original_render.apply(this, arguments);
        return this.trigger("after:render", this);
      }
    };
    return Luca.View.original_extend.apply(this, [definition]);
  };

  _.extend(Luca.View.prototype, {
    hooks: ["after:initialize", "before:render", "after:render"],
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.cache(this.cid, this);
      if (this.options.hooks) this.setupHooks(this.options.hooks);
      this.setupHooks(Luca.View.prototype.hooks);
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
    }
  });

}).call(this);
(function() {

  Luca.core.Container = Luca.View.extend({
    hooks: ["before:components", "before:layout", "after:components", "after:layout"],
    className: 'luca-ui-container',
    rendered: false,
    deferredRender: true,
    components: [],
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.setupHooks(Luca.core.Container.prototype.hooks);
      Luca.View.prototype.initialize.apply(this, arguments);
      if (!this.deferredRender) return this.render();
    },
    do_layout: function() {
      this.trigger("before:layout", this);
      this.prepare_layout();
      return this.trigger("after:layout", this);
    },
    do_components: function() {
      this.trigger("before:components", this, this.components);
      this.prepare_components();
      this.create_components();
      this.render_components();
      return this.trigger("after:components", this, this.components);
    },
    prepare_layout: function() {
      return true;
    },
    prepare_components: function() {
      return true;
    },
    create_components: function() {
      return this.components = _(this.components).map(function(object, index) {
        var component;
        return component = _.isObject(object) && (object.ctype != null) ? Luca.util.LazyObject(object) : object;
      });
    },
    render_components: function() {
      var _this = this;
      return _(this.components).each(function(component) {
        component.getParent = function() {
          return _this;
        };
        return component.render();
      });
    },
    beforeRender: function() {
      this.do_layout();
      return this.do_components();
    },
    getComponent: function(needle) {
      return this.components[needle];
    },
    root_component: function() {
      return !(this.getParent != null);
    },
    getRootComponent: function() {
      if (this.root_component()) {
        return this;
      } else {
        return this.getParent().getRootComponent();
      }
    }
  });

}).call(this);
(function() {

  Luca.containers.CardView = Luca.core.Container.extend({
    component_type: 'card_view',
    className: 'luca-ui-card-view',
    activeCard: 0,
    components: [],
    hooks: ['before:card:switch', 'after:card:switch'],
    initialize: function(options) {
      this.options = options;
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      return this.setupHooks(this.hooks);
    },
    prepare_layout: function() {
      var _this = this;
      return this.cards = _(this.components).map(function(card, cardIndex) {
        card = {
          cssClass: 'luca-ui-card',
          cssStyles: "display:" + (cardIndex === _this.activeCard ? 'block' : 'none'),
          cardIndex: cardIndex,
          cssId: "" + _this.cid + "-" + cardIndex
        };
        $(_this.el).append(JST["luca-ui/templates/containers/card"](card));
        return card;
      });
    },
    prepare_components: function() {
      return this.assignToCards();
    },
    assignToCards: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        var card;
        card = _this.cards[index];
        object.el = object.renderTo = "#" + card.cssId;
        object.parentEl = _this.el;
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
    activate: function(index) {
      var nowActive, previous;
      if (index === this.activeCard) return;
      previous = this.activeComponent();
      nowActive = this.getComponent(index);
      this.trigger("before:card:switch", previous, nowActive);
      if (previous != null) {
        if (typeof previous.trigger === "function") {
          previous.trigger("deactivation", previous, nowActive);
        }
      }
      this.activeCard = index;
      $('.luca-ui-card', this.el).hide();
      $(nowActive.el).show();
      this.trigger("after:card:switch", previous, nowActive);
      return nowActive != null ? typeof nowActive.trigger === "function" ? nowActive.trigger("activation", previous) : void 0 : void 0;
    }
  });

  Luca.register('card_view', "Luca.containers.CardView");

}).call(this);
(function() {

  Luca.containers.ColumnView = Luca.core.Container.extend({
    component_type: 'column_view',
    className: 'luca-ui-column-view',
    components: [],
    initialize: function(options) {
      this.options = options;
      return Luca.core.Container.prototype.initialize.apply(this, arguments);
    },
    layout: void 0,
    prepare_layout: function() {
      var _this = this;
      this.columnWidths = this.layout != null ? _(this.layout.split('/')).map(function(v) {
        return parseInt(v);
      }) : this.autoLayout();
      return this.columns = _(this.columnWidths).map(function(width, columnIndex) {
        var column;
        column = {
          cssClass: 'luca-ui-column',
          cssStyles: 'float:left;',
          width: width,
          columnIndex: columnIndex,
          cssId: "" + _this.cid + "-" + columnIndex
        };
        $(_this.el).append(JST["luca-ui/templates/containers/column"](column));
        return column;
      });
    },
    autoLayout: function() {
      var _this = this;
      return _(this.components.length).times(function() {
        return parseInt(100 / _this.components.length);
      });
    },
    prepare_components: function() {
      return this.assignColumns();
    },
    assignColumns: function() {
      var _this = this;
      this.components = _(this.components).map(function(object, index) {
        var column;
        column = _this.columns[index];
        object.el = object.renderTo = "#" + column.cssId;
        object.parentEl = _this.el;
        return object;
      });
      return this.trigger("after:components", this, this.components);
    }
  });

  Luca.register('column_view', "Luca.containers.ColumnView");

}).call(this);
(function() {

  Luca.containers.ModalView = Luca.core.Container.extend({
    component_type: 'modal_view',
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
      console.log(arguments);
      return $.modal.close();
    },
    prepare_layout: function() {
      return $('body').append($(this.el));
    },
    prepare_components: function() {
      var _this = this;
      return this.components = _(this.components).map(function(object, index) {
        object.el = _this.el;
        return object;
      });
    },
    afterInitialize: function() {
      $(this.el).hide();
      if (this.renderOnInitialize) return this.render();
    },
    afterRender: function() {
      if (this.showOnRender) return this.show();
    },
    wrapper: function() {
      return $($(this.el).parent());
    },
    show: function() {
      this.trigger("before:show", this);
      return $(this.el).modal(this.modalOptions);
    },
    hide: function() {
      return this.trigger("before:hide", this);
    }
  });

  Luca.register("modal_view", "Luca.containers.ModalView");

}).call(this);
(function() {

  Luca.components.FilterableCollection = function(config, initial_set) {
    var Collection, base;
    if (initial_set == null) initial_set = [];
    base = {
      model: config.model,
      url: function() {
        return config.base_url;
      }
    };
    Collection = Backbone.Collection.extend(base);
    return new Collection(config, initial_set);
  };

  Luca.components.GridRow = function(columns) {
    var defaultRenderer, public,
      _this = this;
    this.columns = columns != null ? columns : [];
    defaultRenderer = function(model, column, index) {
      return "Value";
    };
    return public = {
      render: function(model, index, grid) {
        return _(_this.columns).each(function(column, index) {
          return console.log(_this.columns);
        });
      }
    };
  };

  Luca.components.GridView = Luca.View.extend({
    initialize: function(options) {
      this.options = options != null ? options : {};
      _.extend(this, this.options);
      this.configure_store();
      return this.render_columns();
    },
    configure_store: function() {
      return this.deferrable = this.collection = Luca.components.FilterableCollection(this.store, this.store.initial_set);
    },
    render: function() {
      var grid;
      grid = this;
      return this.collection.each(function(model, index) {
        return this.column_renderer.render.apply(this.column_renderer, [model, index, grid]);
      });
    },
    refresh: function() {
      return this.render();
    },
    render_columns: function() {
      return this.column_renderer = Luca.components.GridRow(this.columns);
    }
  });

  Luca.register("grid_view", "Luca.components.GridView");

}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-ui/templates/containers/card"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'', cssClass ,'\' id=\'', cssId ,'\' style=\'', cssStyles ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-ui/templates/containers/column"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'', cssClass ,'\' id=\'', cssId ,'\' style=\'width:', width ,'%;', cssStyles ,'\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  this.JST || (this.JST = {});
  this.JST["luca-ui/templates/containers/sample"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(''); for(var i=0; i < 5; i++) { __p.push('\n<div>\n  ', i ,'\n</div>\n'); } __p.push('\n');}return __p.join('');};
}).call(this);



//



;
