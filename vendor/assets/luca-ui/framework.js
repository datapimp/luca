(function() {

  _.mixin(_.string);

  window.Luca = {
    VERSION: "0.5.0",
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

  Luca.util.LazyObject = function(config) {
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

  Luca.util.is_renderable = function(component) {
    if (component == null) component = {};
    if (Luca.registry.lookup(component.ctype)) return true;
    if (_.isFunction(component.render)) return true;
  };

  $((function() {
    return $('body').addClass('luca-ui-enabled');
  })());

}).call(this);
