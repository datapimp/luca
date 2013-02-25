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
    <script src="../../../../app/assets/javascripts/vendor/modernizr-2.6.1.min.js" type="text/javascript"></script>
    <link href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css' rel='stylesheet'>
    <link href='//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css' rel='stylesheet'>
    <link href='//datapimp.github.com/luca/vendor/assets/stylesheets/luca-ui.css' rel='stylesheet'>
    <link href="../../../../app/assets/stylesheets/site.css" media="screen" rel="stylesheet" type="text/css" />
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
        var page;
      
        page = Docs.register("Docs.views.ExamplesBrowser");
      
        page["extends"]("Luca.containers.TabView");
      
        page.contains({
          title: "API Browser",
          type: "api_browser",
          name: "api_browser"
        }, {
          title: "Basic FormView",
          type: "basic_form_view",
          name: "basic_form_view"
        }, {
          title: "Complex Layout FormView",
          type: "complex_layout_form",
          name: "complex_layout_form"
        }, {
          title: "Scrollable Table",
          type: "table_view_example",
          name: "table_view_example"
        }, {
          title: "Grid Layout CollectionView",
          type: "grid_layout_view_example",
          name: "grid_layout_view_example"
        });
      
        page.privateConfiguration({
          activeCard: 0,
          tab_position: "left",
          defaults: {
            activation: function() {
              return Docs().router.navigate("#examples/" + this.name + "/component", false);
            }
          }
        });
      
        page.privateMethods({
          afterSelect: _.debounce(function() {
            var active, _ref;
            if (active = this.activeComponent()) {
              return typeof active.findComponentByName === "function" ? (_ref = active.findComponentByName("component")) != null ? typeof _ref.runExample === "function" ? _ref.runExample() : void 0 : void 0 : void 0;
            }
          }, 10),
          wrapExampleComponents: function() {
            var wrapped;
            wrapped = [];
            wrapped = _(this.components).map(function(component, index) {
              return {
                title: component.title,
                name: component.name,
                autoBindEventHandlers: true,
                events: {
                  "click a.link[data-navigate-to]": "selectPanel"
                },
                selectPanel: function(e) {
                  var $target, link;
                  $target = this.$(e.target);
                  link = $target.data("navigate-to");
                  index = $target.data("index");
                  this.$('.panel-selector li').removeClass("active");
                  $target.parent('li').addClass("active");
                  this.getViewSelector().activate(index);
                  return Docs().router.navigate(link, false);
                },
                components: [
                  {
                    type: "card",
                    role: "view_selector",
                    afterInitialize: function() {
                      return this.$el.append("<h3>" + component.title + " Example</h3>");
                    },
                    components: [
                      {
                        type: component.type,
                        name: "component",
                        activation: function() {
                          return typeof this.runExample === "function" ? this.runExample() : void 0;
                        }
                      }, {
                        type: "example_source",
                        example: component.name,
                        name: "source"
                      }, {
                        type: "example_docs",
                        example: component.name,
                        name: "documentation"
                      }
                    ]
                  }, {
                    bodyTemplate: "examples_browser/selector",
                    bodyTemplateVars: function() {
                      return {
                        example_name: component.name
                      };
                    }
                  }
                ]
              };
            });
            this.components = wrapped;
            return this.components.unshift({
              title: "Overview",
              bodyTemplate: "examples_browser/overview"
            });
          },
          afterInitialize: function() {
            return this.wrapExampleComponents();
          }
        });
      
        page.publicMethods({
          show: function(exampleName, view) {
            if (exampleName == null) {
              exampleName = 0;
            }
            if (view == null) {
              view = "component";
            }
            return this.activate(exampleName, false, function() {
              this.getViewSelector().activate(view);
              this.$("li").removeClass("active");
              return this.$("li." + view).addClass("active");
            });
          },
          index: function() {
            return this.show();
          }
        });
      
        page.register();
      
      }).call(this);
    </div>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca-dependencies.min.js' type='text/javascript'></script>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.4.0/coffee-script.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js' type='text/javascript'></script>
    <script src="../../../../app/assets/javascripts/dependencies.js" type="text/javascript"></script>
    <script src="../../../../app/assets/javascripts/site.js" type="text/javascript"></script>
  </body>
</html>
