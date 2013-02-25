<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<html class='no-js'>
  <head>
    <meta charset='utf-8'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'>
    <title>Better Backbone.js Apps with Luca</title>
    <meta content='Set your site description in /helpers/site_helpers.rb' name='description'>
    <meta content='width=device-width' name='viewport'>
    <script src="../../app/assets/javascripts/vendor/modernizr-2.6.1.min.js" type="text/javascript"></script>
    <link href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css' rel='stylesheet'>
    <link href='//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css' rel='stylesheet'>
    <link href='//datapimp.github.com/luca/vendor/assets/stylesheets/luca-ui.css' rel='stylesheet'>
    <link href="../../app/assets/stylesheets/site.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <div class='navbar navbar-inverse navbar-fixed-top' id='main-nav'>
      <div class='navbar-inner'>
        <div class='container-fluid'>
          <button class='btn btn-navbar' data-target='.nav-collapse' data-toggle='collapse' type='button'>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
            <span class='icon-bar'></span>
          </button>
          <a class='brand' href='#'>Luca</a>
          <div class='nav-collapse collapse'>
            <ul class='nav'>
              <li data-page='home'>
                <a class='active' href='#'>Home</a>
              </li>
              <li data-page='getting_started'>
                <a href='#get-started'>Get Started</a>
              </li>
              <li data-page='browse_source'>
                <a href='#docs'>Documentation</a>
              </li>
              <li data-page='examples_browser'>
                <a href='#examples'>Examples</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class='container-fluid' style='padding-top:40px;'>
      (function() {
  var app;

  app = Docs.register("Docs.Application");

  app["extends"]("Luca.Application");

  app.configuration({
    version: 1,
    el: "#viewport",
    fluid: true,
    fullscreen: true,
    applyWrapper: false,
    name: "DocsApp"
  });

  app.configuration({
    collectionManager: {
      initialCollections: ["luca_documentation", "docs_documentation"]
    },
    router: "Docs.Router",
    routes: {
      "": "home#index",
      "docs": "browse_source#index",
      "docs/:component_name": "browse_source#show",
      "get-started": "getting_started#index",
      "examples": "examples_browser#index",
      "examples/:example_name/:section": "examples_browser#show",
      "examples/:example_name": "examples_browser#show",
      "component_editor": "component_editor#index"
    },
    stateChangeEvents: {
      "page": "onPageChange"
    }
  });

  app.privateMethods({
    mainNavElement: function() {
      return this._mainNavEl || (this._mainNavEl = $('#main-nav ul.nav'));
    },
    onPageChange: _.debounce(function(state, newPage) {
      $('li', this.mainNavElement()).removeClass('active');
      return $("li[data-page='" + newPage + "']", this.mainNavElement()).addClass('active');
    }, 10)
  });

  app.contains({
    component: "home"
  }, {
    component: "browse_source"
  }, {
    component: "examples_browser"
  }, {
    component: "component_editor"
  }, {
    name: "getting_started",
    type: "page",
    layout: "pages/getting_started",
    index: _.once(function() {
      this.$('pre').addClass('prettyprint');
      return window.prettyPrint();
    })
  });

  app.register();

}).call(this);
    </div>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca-dependencies.min.js' type='text/javascript'></script>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.4.0/coffee-script.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js' type='text/javascript'></script>
    <script src="../../app/assets/javascripts/dependencies.js" type="text/javascript"></script>
    <script src="../../app/assets/javascripts/site.js" type="text/javascript"></script>
  </body>
</html>
