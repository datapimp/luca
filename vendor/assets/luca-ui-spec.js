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
      var nested, value;
      nested = {
        value: {
          string: "haha"
        }
      };
      value = Luca.util.nestedValue("value.string", nested);
      return expect(value).toEqual("haha");
    });
    it("should resolve a nested.value.string to the object", function() {
      var value;
      window.nested = {
        value: {
          string: "haha"
        }
      };
      value = Luca.util.nestedValue("nested.value.string");
      return expect(value).toEqual("haha");
    });
    it("should know if a component is renderable or not", function() {
      var renderable;
      renderable = Luca.util.is_renderable({});
      return expect(renderable).toBeFalsy();
    });
    it("should know if a component is renderable or not", function() {
      var renderable, view;
      view = {
        render: function() {
          return true;
        }
      };
      renderable = Luca.util.is_renderable(view);
      return expect(renderable).toBeTruthy();
    });
    return it("should know if core component is renderable or not", function() {
      var renderable;
      renderable = Luca.util.is_renderable("form_view");
      return expect(renderable).toBeTruthy();
    });
  });

}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
(function() {



}).call(this);
