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
  Luca.templates["main"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'container\'>\n  <div class=\'hero-unit\'>\n    <h1>Want to build apps with Backbone?</h1>\n    <p>This is a collection of application design components that you should use to build your next large backbone.js application.</p>\n    <p>It combines the elegance and simplicity of backbone.js and bootstrap.css, with the experience of developers who have been building single page javascript apps since you were a baby.</p>\n    <a class=\'btn btn-large btn-primary\' href=\'https://github.com/datapimp/luca/zipball/master\'>\n      Download\n    </a>\n    <a class=\'btn btn-success btn-large\' href=\'#build\'>\n      Build an App\n    </a>\n  </div>\n  <hr />\n  <div id=\'information\'>\n    <div class=\'row heading\'>\n      <div class=\'span12\'>\n        <h2>Composite Application Architecture</h2>\n      </div>\n    </div>\n    <div class=\'row\'>\n      <div class=\'span4\'>\n        <h3>Component Driven Design</h3>\n        <p>Luca is a collection of common components needed to build large single page applications. Luca provides base classes for Model, View, and Collection classes which you can choose to extend where needed.  Luca also provides an extensive library of application building components and UI elements which you can piece together in a variety of ways to build responsive, and snappy single page apps.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Backbone and Luca work together</h3>\n        <p>Luca is not a replacement for Backbone, it is a smart use of Backbone\'s core classes.  Large apps require layers of abstraction and patterns for communication between various components, Luca provides these for you.</p>\n        <p>Like Backbone, you only have to use what you need.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Well Tested Patterns</h3>\n        <p>We have extracted all of the common patterns and optimizations we have learned over the course of a year developing several large applications. Using Luca allows you to leverage the power of Backbone.js but only focus on what makes your app unique.</p>\n      </div>\n      <a href=\'https://github.com/datapimp/luca\'>\n        <img alt=\'Fork me on GitHub\' src=\'https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png\' style=\'position: absolute; top: 0; right: 0; border: 0; z-index:9000;\' />\n      </a>\n    </div>\n    <div class=\'row heading\'>\n      <div class=\'span12\'>\n        <h2>Develop Apps Faster</h2>\n      </div>\n    </div>\n    <div class=\'row\'>\n      <div class=\'span4\'>\n        <h3>Development Tools</h3>\n        <p>If you enable the Luca development tools, you have access to things like an in browser Coffeescript console, a CodeMirror based IDE to edit and test your components which live reloads javascript prototype changes and re-renders your components, so that you can experiment directly in the browser.</p>\n        <p>Live reloading of your code changes is also supported if you use the ruby gem and make changes in your favorite editor.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Experimentation and Debugging</h3>\n        <p>The way the Luca framework was designed encourages us to define our apps mostly using JSON configuration, which then gets interpreted, and structural components and style rules are generated for us.  Events get binded, and things just work.</p>\n        <p>Because large parts of the application\'s code are just configuration strings, it is very easy to provide you with a suite of development tools that allow you to inspect what is going on behind the scenes and make changes directly in the environment if you want to experiment with some ideas.</p>\n      </div>\n      <div class=\'span4\'>\n        <h3>Not only for Ruby Developers</h3>\n        <p>Luca is just javascript and css, and will work with any server backend.</p>\n        <p>That being said, Luca was developed against Rails and Sinatra apps and comes with many development helpers which work in these environments.  The development environment and sandbox is a Sinatra app, but like everything else in the framework you can only use what you need.</p>\n      </div>\n    </div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Hi</h1>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/navigation"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul class=\'nav\'>\n  <li>\n    <a href=\'#intro\'>Intro</a>\n  </li>\n  <li>\n    <a href=\'#build\'>Component Builder</a>\n  </li>\n</ul>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/readme"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'container\'>\n  <h1>Component Driven Architecture with Luca.JS</h1>\n  <p>Luca is a component architecture framework based on Backbone.js, which includes</p>\n  many development helpers, classes, patterns, and tools needed to build scalable\n  and clean single page applications.\n  <p>It uses twitter bootstrap compatible markup and css naming conventions,</p>\n  making it possible to generate completely styled user interfaces with JSON alone.\n  <p>Luca combines the functionality of other open source libraries as well, but you are not</p>\n  required to use any of them if you don\'t like.\n  <h3>Dependencies</h3>\n  <ul>\n    <li>\n      <a href=\'https://twitter.github.com/bootstrap\'>Bootstrap by Twitter</a>\n    </li>\n    <li>\n      <a href=\'https://github.com/davidgtonge/backbone_query\'>Backbone-Query by David Tonge</a>\n    </li>\n    <li>\n      <a href=\'https://github.com/epeli/underscore.string\'>Underscore String by Esa-Matti Suuronen</a>\n    </li>\n  </ul>\n  <h3>Development Tool Dependencies</h3>\n  <ul>\n    <li>\n      <a href=\'https://codemirror.net\'>CodeMirror IDE</a>\n    </li>\n    <li>\n      <a href=\'https://coffeescript.org\'>CoffeeScript Compiler</a>\n    </li>\n  </ul>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {

  _.def("Sandbox.views.Builder")["extends"]("Luca.core.Container")["with"]({
    name: "builder",
    id: "builder",
    components: [
      {
        ctype: "builder_canvas",
        className: "builder-canvas"
      }, {
        ctype: "container",
        components: [
          {
            ctype: "builder_editor",
            className: "builder-editor fixed-height",
            topToolbar: {
              buttons: [
                {
                  label: "Views"
                }, {
                  label: "Collections"
                }, {
                  label: "Models"
                }, {
                  label: "Templates"
                }
              ]
            }
          }
        ]
      }
    ],
    initialize: function(options) {
      var _this = this;
      this.options = options != null ? options : {};
      Luca.core.Container.prototype.initialize.apply(this, arguments);
      this.state = new Backbone.Model({
        canvasLayout: "horizontal-split"
      });
      return this.state.bind("change:canvasLayout", function() {
        return _this.$el.removeClass().addClass(_this.state.get("canvasLayout"));
      });
    },
    canvas: function() {
      return Luca("builder_canvas");
    },
    editor: function() {
      return Luca("builder_editor");
    },
    fitToScreen: function() {
      var half, toolbarHeight, viewportHeight;
      viewportHeight = $(window).height();
      half = viewportHeight * 0.5;
      toolbarHeight = 0;
      toolbarHeight += this.$('.toolbar-container.top').height() * this.$('.toolbar-container.top').length;
      this.canvas().$el.height(half - toolbarHeight);
      this.editor().$el.height(half);
      return this.editor().setHeight(half);
    },
    activation: function() {
      $('body .navbar').toggle();
      return this.fitToScreen();
    },
    deactivation: function() {
      return $('body .navbar').toggle();
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
    name: "builder_editor"
  });

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
      "intro": "intro"
    },
    "default": function() {
      return this.app.navigate_to("pages").navigate_to("main");
    },
    build: function() {
      return this.app.navigate_to("pages").navigate_to("build");
    },
    intro: function() {
      return this.app.navigate_to("pages").navigate_to("intro");
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
    useKeyRouter: true,
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
