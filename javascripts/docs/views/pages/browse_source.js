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
        var view;
      
        view = Docs.register("Docs.views.BrowseSource");
      
        view["extends"]("Luca.Container");
      
        view.configuration({
          autoBindEventHandlers: true,
          events: {
            "click .docs-component-list a.link": "selectComponent"
          }
        });
      
        view.contains({
          component: "component_list"
        }, {
          component: "component_details"
        });
      
        view.privateMethods({
          index: function() {
            return this.selectComponent(this.getComponentList().getCollection().at(0));
          },
          show: function(componentName) {
            var component;
            component = this.getComponentList().getCollection().detect(function(model) {
              return model.get("class_name") === componentName;
            });
            if (component == null) {
              return this.index();
            }
            return this.selectComponent(component);
          },
          selectComponent: function(e) {
            var $target, details, index, list, model, row;
            list = this.getComponentList();
            details = this.getComponentDetails();
            if (Luca.isBackboneModel(e)) {
              model = e;
              index = list.getCollection().indexOf(model);
              row = list.$("tr[data-index='" + index + "']");
            } else {
              $target = this.$(e.target);
              row = $target.parents('tr').eq(0);
              index = row.data('index');
              model = list.getCollection().at(index);
            }
            list.$('tr').removeClass('info');
            row.addClass('info');
            return details.load(model);
          }
        });
      
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
