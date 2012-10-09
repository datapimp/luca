(function() {

  window.Sandbox = {
    views: {},
    collections: {},
    models: {}
  };

  Luca.registry.addNamespace('Sandbox.views');

  Luca.Collection.namespace = Sandbox.collections;

}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["builder"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Luca.JS Component Builder</h1>\n<p>This is coming soon.  The Luca.JS sandbox application will provide interactive examples of various components and explain the architectural pieces that go into a well designed single page application.</p>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["builder/component_list"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'component\'></div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["main"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'container\'>\n  <div class=\'hero-unit\'>\n    <h1>Want to build apps with Backbone?</h1>\n    <p>This is a collection of application design components that you should use to build your next large backbone.js application.</p>\n    <p>It combines the elegance and simplicity of backbone.js and bootstrap.css, with the experience of developers who have been building single page javascript apps since you were a baby.</p>\n    <a class=\'btn btn-large btn-primary\' href=\'https://github.com/datapimp/luca/zipball/master\'>\n      Download\n    </a>\n    <a class=\'btn btn-success btn-large\' href=\'#build\'>\n      Build an App\n    </a>\n  </div>\n  <hr />\n  <div id=\'information\'>\n    <div class=\'row heading\'>\n      <div class=\'span12\'>\n        <h2>Composite Application Architecture</h2>\n      </div>\n    </div>\n    <div class=\'row\'>\n      <div class=\'span4\'>\n        <h3>Component Driven Design</h3>\n        <p>Luca is a collection of common components needed to build large single page applications. Luca provides base classes for Model, View, and Collection classes which you can choose to extend where needed.  Luca also provides an extensive library of application building components and UI elements which you can piece together in a variety of ways to build responsive, and snappy single page apps.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Backbone and Luca work together</h3>\n        <p>Luca is not a replacement for Backbone, it is a smart use of Backbone\'s core classes.  Large apps require layers of abstraction and patterns for communication between various components, Luca provides these for you.</p>\n        <p>Like Backbone, you only have to use what you need.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Well Tested Patterns</h3>\n        <p>We have extracted all of the common patterns and optimizations we have learned over the course of a year developing several large applications. Using Luca allows you to leverage the power of Backbone.js but only focus on what makes your app unique.</p>\n      </div>\n      <a href=\'https://github.com/datapimp/luca\'>\n        <img alt=\'Fork me on GitHub\' src=\'https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png\' style=\'position: absolute; top: 0; right: 0; border: 0; z-index:9000;\' />\n      </a>\n    </div>\n    <div class=\'row heading\'>\n      <div class=\'span12\'>\n        <h2>Develop Apps Faster</h2>\n      </div>\n    </div>\n    <div class=\'row\'>\n      <div class=\'span4\'>\n        <h3>Development Tools</h3>\n        <p>Luca\'s development tools include an in-browser Coffeescript console, a CodeMirror based IDE which performs live updates in the browser.</p>\n        <p>Live reloading of your code changes is also supported if you use the ruby gem and make changes in your favorite editor.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Experimentation and Debugging</h3>\n        <p>The Luca framework was designed encourage developers to define apps mostly using JSON configuration, The structural components and style rules are generated for us,  events get bound, and things just work.</p>\n        <p>\n          <a href=\'#application\'>Take a look at this application in the inspector.</a>\n        </p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Not only for Ruby Developers</h3>\n        <p>Luca is just javascript and css, and will work with any server backend.</p>\n        <p>That being said, Luca was developed against Rails and Sinatra apps and comes with many development helpers which work in these environments.  The development environment and sandbox is a Sinatra app, but like everything else in the framework you can only use what you need.</p>\n      </div>\n    </div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Hi</h1>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/docs_index"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Documentation</h1>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/navigation"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul class=\'nav\'>\n  <li>\n    <a href=\'#intro\'>Intro</a>\n  </li>\n  <li>\n    <a href=\'#build\'>Component Builder</a>\n  </li>\n  <li>\n    <a href=\'#docs\'>Documentation</a>\n  </li>\n</ul>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/readme"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'container\'>\n  <h1>Component Driven Architecture with Luca.JS</h1>\n  <p>Luca is a component architecture framework based on Backbone.js, which includes</p>\n  many development helpers, classes, patterns, and tools needed to build scalable\n  and clean single page applications.\n  <p>It uses twitter bootstrap compatible markup and css naming conventions,</p>\n  making it possible to generate completely styled user interfaces with JSON alone.\n  <p>Luca combines the functionality of other open source libraries as well, but you are not</p>\n  required to use any of them if you don\'t like.\n  <h3>Dependencies</h3>\n  <ul>\n    <li>\n      <a href=\'https://twitter.github.com/bootstrap\'>Bootstrap by Twitter</a>\n    </li>\n    <li>\n      <a href=\'https://github.com/davidgtonge/backbone_query\'>Backbone-Query by David Tonge</a>\n    </li>\n    <li>\n      <a href=\'https://github.com/epeli/underscore.string\'>Underscore String by Esa-Matti Suuronen</a>\n    </li>\n  </ul>\n  <h3>Development Tool Dependencies</h3>\n  <ul>\n    <li>\n      <a href=\'https://codemirror.net\'>CodeMirror IDE</a>\n    </li>\n    <li>\n      <a href=\'https://coffeescript.org\'>CoffeeScript Compiler</a>\n    </li>\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {

  _.def("Sandbox.views.Builder")["extends"]("Luca.core.Container")["with"]({
    name: "builder",
    id: "builder",
    defaultCanvasPosition: 'below',
    componentEvents: {
      "editor_container toggle:search:option": "toggleSearchOption"
    },
    components: [
      {
        ctype: "container",
        name: "editor_container",
        additionalClassNames: 'row-fluid',
        className: "builder-editor-container",
        styles: {
          position: "absolute"
        },
        bottomToolbar: {
          buttons: [
            {
              group: true,
              align: "left",
              buttons: [
                {
                  eventId: "toggle:search:option",
                  icon: "search",
                  classes: "search-options component-search"
                }, {
                  eventId: "toggle:search:option",
                  icon: "list-alt",
                  classes: "search-options saved-components"
                }
              ]
            }, {
              eventId: "toggle:settings",
              icon: "cog",
              align: 'right'
            }
          ]
        },
        components: [
          {
            ctype: "builder_editor",
            name: "builder_editor",
            className: "builder-editor",
            styles: {
              position: "relative",
              width: "100%",
              top: "0",
              left: "0"
            }
          }, {
            type: "project_browser",
            className: "project-browser",
            name: "project_browser",
            styles: {
              position: "relative",
              width: "30%",
              top: "0",
              left: "0"
            }
          }
        ]
      }
    ],
    initialize: function(options) {
      var canvas,
        _this = this;
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      _.bindAll(this, "toggleSearchOption");
      canvas = {
        type: "builder_canvas",
        className: "builder-canvas"
      };
      this.state = new Backbone.Model({
        canvasLayout: "horizontal-split",
        canvasPosition: this.defaultCanvasPosition || "above",
        ratio: 0.4
      });
      this.state.bind("change:canvasLayout", function() {
        return _this.$el.removeClass().addClass(_this.state.get("canvasLayout"));
      });
      if (this.state.get('canvasPosition') === "above") {
        return this.components.unshift(canvas);
      } else {
        return this.components.push(canvas);
      }
    },
    canvas: function() {
      return Luca("builder_canvas");
    },
    editor: function() {
      return Luca("builder_editor");
    },
    componentList: function() {
      return Luca("component_list");
    },
    toggleSearchOption: function(button) {
      return button.toggleClass('active');
    },
    fitToScreen: function() {
      var filterHeight, half, toolbarHeight, viewportHeight;
      this.$el.addClass("canvas-position-" + (this.state.get('canvasPosition')));
      viewportHeight = $(window).height();
      half = viewportHeight * this.state.get('ratio');
      toolbarHeight = 0;
      toolbarHeight += this.$('.toolbar-container.top').height() * this.$('.toolbar-container.top').length;
      filterHeight = 0;
      filterHeight += this.$('.component-list-filter-form').height();
      this.canvas().$el.height(half - toolbarHeight - 40);
      this.componentList().$el.height(half - filterHeight - 50);
      this.editor().$el.height(half);
      return this.editor().setHeight(half);
    },
    activation: function() {
      return this.fitToScreen();
    },
    deactivation: function() {},
    afterRender: function() {
      var componentList;
      this._super("afterRender", this, arguments);
      componentList = Luca("component_list");
      componentList.on("selected", function(component) {
        Luca("builder_editor").setValue(component.get('source'));
        return Luca("builder_editor").state.set('currentMode', 'coffeescript');
      });
      this.$('.component-list-filter-form input[type="text"]').on("keydown", function() {
        return componentList.filterByName($(this).val());
      });
      return this.$('.component-list-filter-form input[type="text"]').on("keyup", function() {
        var val;
        val = $(this).val();
        if (val.length === 0) return componentList.filterByName('');
      });
    },
    beforeRender: function() {
      var _ref;
      if ((_ref = Luca.core.Container.prototype.beforeRender) != null) {
        _ref.apply(this, arguments);
      }
      return this.$el.removeClass().addClass(this.state.get("canvasLayout"));
    }
  });

}).call(this);
(function() {

  _.def("Sandbox.views.BuilderCanvas")["extends"]("Luca.View")["with"]({
    name: "builder_canvas",
    bodyTemplate: "builder"
  });

}).call(this);
(function() {

  _.def("Sandbox.views.BuilderEditor")["extends"]("Luca.tools.CoffeeEditor")["with"]({
    name: "builder_editor",
    toggleSource: function() {
      return this._super("toggleMode", this, arguments);
    }
  });

}).call(this);
(function() {

  _.def("Sandbox.views.ComponentList")["extends"]("Luca.components.CollectionView")["with"]({
    name: "component_list",
    id: "component_list",
    collection: "components",
    itemTagName: "div",
    autoBindEventHandlers: true,
    events: {
      "click div.collection-item a": "clickHandler"
    },
    itemRenderer: function(item, model, index) {
      return Luca.util.make("a", {
        "data-index": index
      }, model.className());
    },
    filterByName: function(name) {
      var models;
      models = this.collection.query({
        className: {
          $likeI: name
        }
      });
      this.collection.reset(models, {
        silent: true
      });
      this.refresh();
      if ((name != null ? name.length : void 0) === 0) {
        return this.resetToDefault();
      }
    },
    resetToDefault: function() {
      this.collection.reset(this.initialComponents, {
        silent: true
      });
      return this.refresh();
    },
    beforeRender: function() {
      var success,
        _this = this;
      success = function(collection, response) {
        return _this.initialComponents = response;
      };
      return this.collection.fetch({
        success: success
      });
    },
    clickHandler: function(e) {
      var component, me, my;
      e.preventDefault();
      me = my = $(e.target);
      component = this.collection.at(my.data('index'));
      return this.trigger("selected", component);
    }
  });

}).call(this);
(function() {

  _.def("Sandbox.views.ProjectBrowser")["extends"]("Luca.core.Container")["with"]({
    className: "project-browser",
    components: [
      {
        type: "text_field",
        name: "component_list_filter",
        additionalClassNames: "well",
        className: "component-list-filter-form",
        placeHolder: "Find a component",
        hideLabel: true,
        prepend: "?"
      }, {
        type: "component_list",
        name: "component_list"
      }
    ]
  });

}).call(this);
(function() {

  _.def("Sandbox.views.DocsController")["extends"]("Luca.components.Controller")["with"]({
    name: "docs",
    defaultCard: "docs_index",
    components: [
      {
        name: "docs_index",
        bodyTemplate: "sandbox/docs_index"
      }
    ]
  });

}).call(this);
(function() {

  _.def("Sandbox.views.ApplicationInspector")["extends"]("Luca.tools.ApplicationInspector")["with"]({
    name: "application_inspector",
    additionalClassNames: ["modal"],
    toggle: function(options) {
      if (options == null) {
        options = {
          backdrop: false
        };
      }
      if (this.rendered !== true) this.render();
      return this.$el.modal(options);
    },
    components: [
      {
        ctype: "instance_filter"
      }
    ]
  });

}).call(this);
(function() {

  _.def("Sandbox.views.InstanceFilter")["extends"]("Luca.components.FormView")["with"]({
    name: "instance_filter",
    well: true,
    horizontal: true,
    inline: true,
    toolbar: false,
    components: [
      {
        ctype: "type_ahead_field",
        label: "Find by name",
        source: function() {
          var names;
          names = _(Luca.registry.instances()).pluck('name');
          return _.uniq(_(names).compact());
        }
      }, {
        ctype: "type_ahead_field",
        label: "Find by class",
        source: function() {
          return Luca.registry.classes(true);
        }
      }
    ]
  });

}).call(this);
(function() {



}).call(this);
(function() {

  _.def("Sandbox.views.TopNavigation")["extends"]("Luca.components.NavBar")["with"]({
    brand: "Luca",
    name: "top_navigation",
    template: "sandbox/navigation"
  });

}).call(this);
(function() {

  Sandbox.Router = Luca.Router.extend({
    routes: {
      "": "default",
      "build": "build",
      "intro": "intro",
      "application": "inspector",
      "docs": "docs",
      "docs/:section": "docs"
    },
    "default": function() {
      return this.app.navigate_to("pages").navigate_to("main");
    },
    build: function() {
      return this.app.navigate_to("pages").navigate_to("build");
    },
    docs: function(section) {
      if (section == null) section = "docs_index";
      return this.app.navigate_to("docs").navigate_to(section);
    },
    intro: function() {
      return this.app.navigate_to("pages").navigate_to("intro");
    },
    inspector: function() {
      var inspector;
      inspector = Luca("application_inspector", new Sandbox.views.ApplicationInspector());
      return inspector.toggle();
    }
  });

}).call(this);
(function() {

  _.def('Sandbox.Application')["extends"]('Luca.Application')["with"]({
    autoBoot: true,
    name: 'SandboxApp',
    router: "Sandbox.Router",
    el: '#viewport',
    fluid: true,
    topNav: 'top_navigation',
    useKeyHandler: false,
    keyEvents: {
      meta: {
        forwardslash: "developmentConsole"
      }
    },
    collectionManager: {
      initialCollections: ["components"]
    },
    components: [
      {
        ctype: 'controller',
        name: 'pages',
        components: [
          {
            name: "main",
            className: "marketing-content",
            bodyTemplate: 'main'
          }, {
            name: "intro",
            className: "marketing-content",
            bodyTemplate: "readme"
          }, {
            name: "build",
            ctype: "builder"
          }, {
            name: "docs",
            ctype: "docs_controller"
          }
        ]
      }
    ],
    developmentConsole: function() {
      var container;
      this.developmentConsole = Luca("coffeescript-console", function() {
        return new Luca.tools.DevelopmentConsole({
          name: "coffeescript-console"
        });
      });
      if (!this.consoleContainerAppended) {
        container = this.make("div", {
          id: "devtools-console-wrapper",
          "class": "devtools-console-container modal",
          style: "width:1000px"
        }, this.developmentConsole.el);
        $('body').append(container);
        this.consoleContainerAppended = true;
        this.developmentConsole.render();
      }
      return $('#devtools-console-wrapper').modal({
        backdrop: false,
        show: true
      });
    }
  });

  $(function() {
    return new Sandbox.Application();
  });

}).call(this);
(function() {



}).call(this);
