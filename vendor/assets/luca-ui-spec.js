(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {

  describe("Luca.Collection", function() {
    return it("should accept my better method signature", function() {
      var collection;
      collection = new Luca.Collection({
        registerAs: "yesyesyall"
      });
      return expect(collection.registerAs).toEqual("yesyesyall");
    });
  });

  describe("Registering with the collection manager", function() {
    window.mgr = new Luca.CollectionManager();
    it("should automatically register with the manager if I specify a name", function() {
      var collection;
      collection = new Luca.Collection({
        name: "auto_register"
      });
      return expect(mgr.get("auto_register")).toEqual(collection);
    });
    it("should register with a specific manager", function() {
      var collection;
      window.other_manager = new Luca.CollectionManager();
      collection = new Luca.Collection({
        name: "other_collection",
        manager: window.other_manager
      });
      return expect(window.other_manager.get("other_collection")).toEqual(collection);
    });
    return it("should find a collection manager by string", function() {
      var collection;
      window.find_mgr_by_string = new Luca.CollectionManager();
      return collection = new Luca.Collection({
        manager: "find_mgr_by_string"
      });
    });
  });

}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {

  describe("Luca.View", function() {
    return it("should be defined", function() {
      return expect(Luca.View).toBeDefined();
    });
  });

}).call(this);
(function() {
  var EventMatchers, ModelMatchers, eventBucket, json, msg, triggerSpy;

  json = function(object) {
    return JSON.stringify(object);
  };

  msg = function(list) {
    if (list.length !== 0) {
      return list.join(";");
    } else {
      return "";
    }
  };

  eventBucket = function(model, eventName) {
    var bucket, spiedEvents;
    spiedEvents = model.spiedEvents;
    if (!spiedEvents) spiedEvents = model.spiedEvents = {};
    bucket = spiedEvents[eventName];
    if (!bucket) bucket = spiedEvents[eventName] = [];
    return bucket;
  };

  triggerSpy = function(constructor) {
    var trigger;
    trigger = constructor.prototype.trigger;
    return constructor.prototype.trigger = function(eventName) {
      var bucket;
      bucket = eventBucket(this, eventName);
      bucket.push(Array.prototype.slice.call(arguments, 1));
      return trigger.apply(this, arguments);
    };
  };

  triggerSpy(Backbone.Model);

  triggerSpy(Backbone.Collection);

  EventMatchers = {
    toHaveTriggered: function(eventName) {
      var bucket, triggeredWith;
      bucket = eventBucket(this.actual, eventName);
      triggeredWith = Array.prototype.slice.call(arguments, 1);
      this.message = function() {
        return ["expected model or collection to have received '" + eventName + "' with " + json(triggeredWith), "expected model not to have received event '" + eventName + "', but it did"];
      };
      return _.detect(bucket, function(args) {
        if (triggeredWith.length === 0) {
          return true;
        } else {
          return jasmine.getEnv().equals_(triggeredWith, args);
        }
      });
    }
  };

  ModelMatchers = {
    toHaveAttributes: function(attributes) {
      var i, keys, message, missing, values;
      keys = [];
      values = [];
      jasmine.getEnv().equals_(this.actual.attributes, attributes, keys, values);
      missing = [];
      i = 0;
      while (i < keys.length) {
        message = keys[i];
        if (message.match(/but missing from/)) missing.push(keys[i]);
        i++;
      }
      this.message = function() {
        return ["model should have at least these attributes(" + json(attributes) + ") " + msg(missing) + " " + msg(values), "model should have none of the following attributes(" + json(attributes) + ") " + msg(keys) + " " + msg(values)];
      };
      return missing.length === 0 && values.length === 0;
    },
    toHaveExactlyTheseAttributes: function(attributes) {
      var equal, keys, values;
      keys = [];
      values = [];
      equal = jasmine.getEnv().equals_(this.actual.attributes, attributes, keys, values);
      this.message = function() {
        return ["model should match exact attributes, but does not. " + msg(keys) + " " + msg(values), "model has exactly these attributes, but shouldn't :" + json(attributes)];
      };
      return equal;
    }
  };

  beforeEach(function() {
    this.addMatchers(ModelMatchers);
    return this.addMatchers(EventMatchers);
  });

}).call(this);
(function() {

  describe("The Luca Framework", function() {
    it("should specify a version", function() {
      return expect(Luca.VERSION).toBeDefined();
    });
    it("should define Luca in the global space", function() {
      return expect(Luca).toBeDefined();
    });
    it("should enable bootstrap by default", function() {
      return expect(Luca.enableBootstrap).toBeTruthy();
    });
    it("should have classes in the registry", function() {
      return expect(Luca.registry.classes).toBeDefined();
    });
    it("should be able to lookup classes in the registry by ctype", function() {
      return expect(Luca.registry.lookup("form_view")).toBeTruthy();
    });
    it("should allow me to add view namespaces to the registry", function() {
      Luca.registry.addNamespace("Test.namespace");
      return expect(Luca.registry.namespaces).toContain("Test.namespace");
    });
    it("should resolve a value.string to the object", function() {
      var value;
      window.nested = {
        value: {
          string: "haha"
        }
      };
      value = Luca.util.nestedValue("nested.value.string", window);
      return expect(value).toEqual("haha");
    });
    it("should create an instance of a class by ctype", function() {
      var component, object;
      object = {
        ctype: "template",
        template: "components/form_view"
      };
      component = Luca.util.lazyComponent(object);
      return expect(_.isFunction(component.render)).toBeTruthy();
    });
    return it("should find a created view in the cache", function() {
      var template;
      template = new Luca.components.Template({
        template: "components/form_view",
        name: 'test_template'
      });
      return expect(Luca.cache("test_template")).toBeDefined();
    });
  });

  describe;

}).call(this);
(function() {

  describe("The Collection Manager", function() {
    it("should be defined", function() {
      return expect(Luca.CollectionManager).toBeDefined();
    });
    it("should make the latest instance accessible by class function", function() {
      var manager;
      manager = new Luca.CollectionManager();
      return expect(Luca.CollectionManager.get()).toEqual(manager);
    });
    return it("should be scopable", function() {
      var babyone, babytwo, manager, scope;
      scope = "one";
      manager = new Luca.CollectionManager({
        getScope: function() {
          return scope;
        }
      });
      babyone = new Luca.Collection({
        name: "baby"
      });
      manager.add("baby");
      scope = "two";
      return babytwo = new Luca.Collection({
        name: "baby"
      });
    });
  });

}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
