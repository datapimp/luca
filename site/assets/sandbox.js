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
  Luca.templates["main"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class=\'hero-unit\'>\n  <h1>Want to build apps with Backbone?</h1>\n  <p>This is a collection of application design components that you should use to build your next large backbone.js application.</p>\n  <p>It combines the elegance and simplicity of backbone.js and bootstrap.css, with the experience of developers who have been building single page javascript apps since you were a baby.</p>\n  <a class=\'btn btn-large btn-primary\' href=\'#class_browser\'>\n    Download\n  </a>\n  <a class=\'btn btn-success btn-large\' href=\'#component_tester\'>\n    Build a component\n  </a>\n</div>\n<hr />\n<div id=\'information\'>\n  <div class=\'row heading\'>\n    <div class=\'span12\'>\n      <h2>Composite Application Architecture</h2>\n    </div>\n  </div>\n  <div class=\'row\'>\n    <div class=\'span4\'>\n      <h3>Component Driven Design</h3>\n      <p>Luca is a collection of common components needed to build large single page applications. Luca provides base classes for Model, View, and Collection classes which you can choose to extend where needed.  Luca also provides an extensive library of application building components and UI elements which you can piece together in a variety of ways to build responsive, and snappy single page apps.</p>\n    </div>\n    <div class=\'span4\'>\n      <h3>Backbone and Luca work together</h3>\n      <p>Luca is not a replacement for Backbone, it is a smart use of Backbone\'s core classes.  Large apps require layers of abstraction and patterns for communication between various components, Luca provides these for you.</p>\n      <p>Like Backbone, you only have to use what you need.</p>\n    </div>\n    <div class=\'span4\'>\n      <h3>Relies on good patterns</h3>\n      <p>We have extracted all of the common patterns and optimizations we have learned over the course of a year developing several large applications. Using Luca allows you to leverage the power of Backbone.js but only focus on what makes your app unique.</p>\n    </div>\n    <a href=\'https://github.com/datapimp/luca\'>\n      <img alt=\'Fork me on GitHub\' src=\'https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png\' style=\'position: absolute; top: 0; right: 0; border: 0; z-index:9000;\' />\n    </a>\n  </div>\n  <div class=\'row heading\'>\n    <div class=\'span12\'>\n      <h2>Develop Apps Faster</h2>\n    </div>\n  </div>\n  <div class=\'row\'>\n    <div class=\'span4\'>\n      <h3>Development Tools</h3>\n      <p>If you enable the Luca development tools, you have access to things like an in browser Coffeescript console, a CodeMirror based IDE to edit and test your components which live reloads javascript prototype changes and re-renders your components, so that you can experiment directly in the browser.</p>\n      <p>Live reloading of your code changes is also supported if you use the ruby gem and make changes in your favorite editor.</p>\n    </div>\n    <div class=\'span4\'>\n      <h3>Experimentation and Debugging</h3>\n      <p>The way the Luca framework was designed encourages us to define our apps mostly using JSON configuration, which then gets interpreted, and structural components and style rules are generated for us.  Events get binded, and things just work.</p>\n      <p>Because large parts of the application\'s code are just configuration strings, it is very easy to provide you with a suite of development tools that allow you to inspect what is going on behind the scenes and make changes directly in the environment if you want to experiment with some ideas.</p>\n    </div>\n    <div class=\'span4\'>\n      <h3>Not only for Ruby Developers</h3>\n      <p>Luca is just javascript and css, and will work with any server backend.</p>\n      <p>That being said, Luca was developed against Rails and Sinatra apps and comes with many development helpers which work in these environments.  The development environment and sandbox is a Sinatra app, but like everything else in the framework you can only use what you need.</p>\n    </div>\n  </div>\n</div>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<h1>Hi</h1>\n');}return __p.join('');};
}).call(this);
(function() {
  Luca.templates || (Luca.templates = {});
  Luca.templates["sandbox/navigation"] = function(obj){var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<ul class=\'nav\'>\n  <li>\n    <a href=\'#\'>Intro</a>\n  </li>\n</ul>\n');}return __p.join('');};
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
      "class_browser": "class_browser",
      "component_tester": "component_tester"
    },
    "default": function() {
      return this.app.navigate_to("pages").navigate_to("main");
    },
    class_browser: function() {
      return this.app.navigate_to("pages").navigate_to("class_browser");
    },
    component_tester: function() {
      return this.app.navigate_to("pages").navigate_to("component_tester");
    }
  });

}).call(this);
(function() {

  Sandbox.Application = Luca.Application.extend({
    name: 'sandbox_application',
    el: '#viewport',
    fluid: true,
    topNav: 'top_navigation',
    useKeyRouter: true,
    keyEvents: {
      meta: {
        forwardslash: "developmentConsole"
      }
    },
    components: [
      {
        ctype: 'controller',
        name: 'pages',
        components: [
          {
            name: "main",
            bodyTemplate: 'main'
          }, {
            name: "class_browser",
            ctype: "class_browser"
          }, {
            name: "component_tester",
            ctype: "component_tester"
          }
        ]
      }
    ],
    initialize: function(options) {
      this.options = options != null ? options : {};
      Luca.Application.prototype.initialize.apply(this, arguments);
      return this.router = new Sandbox.Router({
        app: this
      });
    },
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
    },
    afterRender: function() {
      return this._super("afterRender", this, arguments);
    }
  });

  $((function() {
    (window || global).SandboxApp = new Sandbox.Application();
    SandboxApp.boot();
    return prettyPrint();
  })());

}).call(this);
(function() {



}).call(this);
