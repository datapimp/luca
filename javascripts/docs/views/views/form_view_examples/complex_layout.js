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
    <script src="../../../../../app/assets/javascripts/vendor/modernizr-2.6.1.min.js" type="text/javascript"></script>
    <link href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css' rel='stylesheet'>
    <link href='//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css' rel='stylesheet'>
    <link href='//datapimp.github.com/luca/vendor/assets/stylesheets/luca-ui.css' rel='stylesheet'>
    <link href="../../../../../app/assets/stylesheets/site.css" media="screen" rel="stylesheet" type="text/css" />
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
        var form;
      
        form = Docs.register("Docs.views.ComplexLayoutForm");
      
        form["extends"]("Luca.components.FormView");
      
        form.privateConfiguration({
          rowFluid: true,
          componentEvents: {
            "group_selector on:change": "selectGroup"
          }
        });
      
        form.privateMethods({
          selectGroup: function() {
            var desiredGroup, selector;
            desiredGroup = this.getGroupSelector().getValue();
            selector = this.getGroupDisplaySelector();
            return selector.activate(desiredGroup);
          }
        });
      
        form.contains({
          type: "container",
          span: 6,
          components: [
            {
              type: "text",
              label: "Field One"
            }, {
              type: "text",
              label: "Field Two"
            }, {
              type: "text",
              label: "Field Three"
            }
          ]
        }, {
          type: "container",
          span: 6,
          components: [
            {
              label: "Select a Group",
              type: "select",
              role: "group_selector",
              includeBlank: false,
              valueType: "string",
              collection: {
                data: [["alpha", "Alpha Group"], ["bravo", "Bravo Group"], ["charlie", "Charlie Group"]]
              }
            }, {
              type: "card",
              role: "group_display_selector",
              components: [
                {
                  name: "alpha",
                  defaults: {
                    type: "text"
                  },
                  components: [
                    {
                      type: "view",
                      tagName: "h4",
                      bodyTemplate: function() {
                        return "Group One";
                      }
                    }, {
                      label: "Alpha"
                    }, {
                      label: "Bravo"
                    }, {
                      label: "Charlie"
                    }
                  ]
                }, {
                  name: "bravo",
                  defaults: {
                    type: "checkbox_field"
                  },
                  components: [
                    {
                      type: "view",
                      tagName: "h4",
                      bodyTemplate: function() {
                        return "Group Two";
                      }
                    }, {
                      label: "One"
                    }, {
                      label: "Two"
                    }
                  ]
                }, {
                  name: "charlie",
                  defaults: {
                    type: "button_field"
                  },
                  components: [
                    {
                      type: "view",
                      tagName: "h4",
                      bodyTemplate: function() {
                        return "Group Three";
                      }
                    }, {
                      input_value: "Button One",
                      icon_class: "chevron-up"
                    }, {
                      input_value: "Button Two",
                      icon_class: "pencil"
                    }
                  ]
                }
              ]
            }
          ]
        });
      
      }).call(this);
    </div>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca-dependencies.min.js' type='text/javascript'></script>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.4.0/coffee-script.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js' type='text/javascript'></script>
    <script src="../../../../../app/assets/javascripts/dependencies.js" type="text/javascript"></script>
    <script src="../../../../../app/assets/javascripts/site.js" type="text/javascript"></script>
  </body>
</html>
