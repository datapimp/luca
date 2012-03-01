(function() {

  Luca.Application = Luca.containers.Viewport.extend({
    components: [
      {
        ctype: 'controller',
        name: 'main_controller',
        defaultCard: 'welcome',
        components: [
          {
            ctype: 'template',
            name: 'welcome',
            template: 'sample/welcome',
            templateContainer: "Luca.templates"
          }
        ]
      }
    ],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.containers.Viewport.prototype.initialize.apply(this, arguments);
      this.collectionManager = new Luca.CollectionManager();
      this.state = new Backbone.Model(this.defaultState);
      return this.bind("ready", function() {
        return _this.render();
      });
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
    beforeRender: function() {
      var _ref;
      return (_ref = Luca.containers.Viewport.prototype.beforeRender) != null ? _ref.apply(this, arguments) : void 0;
    },
    boot: function() {
      console.log("Sup?");
      return this.trigger("ready");
    },
    collection: function() {
      return this.collectionManager.getOrCreate.apply(this.collectionManager, arguments);
    },
    get: function(attribute) {
      return this.state.get(attribute);
    },
    getMainController: function() {
      return this.view("main_controler");
    },
    set: function(attributes) {
      return this.state.set(attributes);
    },
    view: function(name) {
      return Luca.cache(name);
    }
  });

}).call(this);
