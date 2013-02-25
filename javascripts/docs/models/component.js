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
    <script src="../../../app/assets/javascripts/vendor/modernizr-2.6.1.min.js" type="text/javascript"></script>
    <link href='//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css' rel='stylesheet'>
    <link href='//netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css' rel='stylesheet'>
    <link href='//datapimp.github.com/luca/vendor/assets/stylesheets/luca-ui.css' rel='stylesheet'>
    <link href="../../../app/assets/stylesheets/site.css" media="screen" rel="stylesheet" type="text/css" />
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
        var model,
          __slice = [].slice;
      
        model = Docs.register("Docs.models.Component");
      
        model["extends"]("Luca.Model");
      
        model.configuration({
          defaults: {
            class_name: void 0,
            superClass: void 0,
            asset_id: void 0,
            source_file_contents: "",
            defined_in_file: ""
          }
        });
      
        model.defines({
          idAttribute: "class_name",
          contentsWithoutHeader: function() {
            var contents, count, startsAt;
            startsAt = this.get("starts_on_line") || 0;
            contents = this.get("source_file_contents").split("\n");
            count = contents.length;
            if (startsAt > 0) {
              startsAt = startsAt - 1;
            }
            return contents.slice(startsAt, count).join("\n");
          },
          documentation: function() {
            var base;
            base = _(this.toJSON()).pick('header_documentation', 'class_name', 'defined_in_file');
            return _.extend(base, this.metaData(), {
              componentGroup: this.componentGroup(),
              componentType: this.componentType(),
              componentTypeAlias: this.componentTypeAlias(),
              details: {
                publicMethods: this.methodDocumentationFor("publicMethods"),
                privateMethods: this.methodDocumentationFor("privateMethods"),
                privateProperties: this.propertyDocumentationFor("privateProperties", "privateConfiguration"),
                publicProperties: this.propertyDocumentationFor("publicProperties", "publicConfiguration")
              }
            });
          },
          methodDocumentationFor: function() {
            var documentationSource, group, groups, list, result, _i, _len, _ref;
            groups = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            documentationSource = _.extend({}, this.get("defines_methods"));
            result = {};
            for (_i = 0, _len = groups.length; _i < _len; _i++) {
              group = groups[_i];
              if (list = (_ref = this.metaData()) != null ? typeof _ref[group] === "function" ? _ref[group]() : void 0 : void 0) {
                _.extend(result, _(list).reduce(function(memo, methodOrProperty) {
                  memo[methodOrProperty] = documentationSource[methodOrProperty];
                  return memo;
                }, {}));
              }
            }
            return result;
          },
          propertyDocumentationFor: function() {
            var documentationSource, group, groups, list, result, _i, _len, _ref;
            groups = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            documentationSource = _.extend({}, this.get("defines_properties"));
            result = {};
            for (_i = 0, _len = groups.length; _i < _len; _i++) {
              group = groups[_i];
              if (list = (_ref = this.metaData()) != null ? typeof _ref[group] === "function" ? _ref[group]() : void 0 : void 0) {
                _.extend(result, _(list).reduce(function(memo, methodOrProperty) {
                  memo[methodOrProperty] = documentationSource[methodOrProperty];
                  return memo;
                }, {}));
              }
            }
            return result;
          },
          url: function() {
            return "/project/components/" + Luca.namespace + "/" + (this.classNameId());
          },
          metaData: function() {
            var _ref;
            return (_ref = Luca.util.resolve(this.get("class_name"))) != null ? _ref.prototype.componentMetaData() : void 0;
          },
          classNameId: function() {
            return this.get("class_name").replace(/\./g, '__');
          },
          componentGroup: function() {
            var parts;
            parts = this.get('class_name').split('.');
            return parts.slice(0, 2).join('.');
          },
          componentType: function() {
            var componentPrototype, group, parts, type;
            type = "view";
            parts = this.get('class_name').split('.');
            switch (group = parts[1]) {
              case "collections":
                "collection";
      
                break;
              case "models":
                "model";
      
                break;
              case "views" || "components" || "pages":
                "view";
      
            }
            if (group != null) {
              return;
            }
            if (componentPrototype = Luca.util.resolve(this.get("class_name"))) {
              if (Luca.isViewPrototype(componentPrototype.prototype)) {
                return "view";
              }
              if (Luca.isCollectionPrototype(componentPrototype.prototype)) {
                return "collection";
              }
              if (Luca.isModelProtoype(componentPrototype.prototype)) {
                return "model";
              }
            }
            return "view";
          },
          componentTypeAlias: function() {
            var name, parts;
            parts = this.get('class_name').split('.');
            name = parts.pop();
            return _.str.underscored(name);
          }
        });
      
      }).call(this);
    </div>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca-dependencies.min.js' type='text/javascript'></script>
    <script src='//datapimp.github.com/luca/vendor/assets/javascripts/luca.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.4.0/coffee-script.min.js' type='text/javascript'></script>
    <script src='//cdnjs.cloudflare.com/ajax/libs/less.js/1.3.3/less.min.js' type='text/javascript'></script>
    <script src="../../../app/assets/javascripts/dependencies.js" type="text/javascript"></script>
    <script src="../../../app/assets/javascripts/site.js" type="text/javascript"></script>
  </body>
</html>
