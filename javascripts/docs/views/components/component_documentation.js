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

  view = Docs.register("Docs.views.ComponentDocumentation");

  view["extends"]("Luca.View");

  view.privateConfiguration({
    bodyTemplate: "component_documentation",
    displaySource: false,
    displayHeader: false
  });

  view.publicMethods({
    loadComponent: function(component) {
      var section, _i, _len, _ref;
      this.component = component;
      this.reset();
      _ref = ["private", "public"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
        this.renderMethodGroup(section);
        this.renderPropertyGroup(section);
      }
      this.$('.source').hide();
      if (this.displayHeader === true) {
        this.$('.header-documentation').show();
        this.$('.header-documentation').html(this.component.get("header_documentation"));
      }
      if (this.displaySource === true) {
        this.$('.source').show();
        this.$('pre.source').html(this.component.contentsWithoutHeader());
      }
      return this.$('pre').addClass('prettyprint');
    }
  });

  view.privateMethods({
    reset: function() {
      this.$('.table tbody').empty();
      this.$('.properties,.methods').hide();
      return this.$('.header-documentation').hide();
    },
    renderMethodGroup: function(group) {
      var arg_details, details, list, method, prototype, source, _ref, _ref1, _ref2, _results;
      if (group == null) {
        group = "public";
      }
      source = (_ref = this.component) != null ? (_ref1 = _ref.documentation()) != null ? _ref1.details["" + group + "Methods"] : void 0 : void 0;
      if (_.isEmpty(source)) {
        return;
      }
      prototype = (_ref2 = Luca.util.resolve(this.component.get("class_name"))) != null ? _ref2.prototype : void 0;
      list = this.$(".methods." + group).show().find('.table tbody');
      _results = [];
      for (method in source) {
        details = source[method];
        if (!(_.isFunction(prototype[method]))) {
          continue;
        }
        details || (details = {});
        arg_details = _(details["arguments"]).reduce(function(memo, pair) {
          memo += "" + pair.argument;
          if (pair.value != null) {
            memo += "= " + (pair.value || 'undefined');
          }
          return memo += "<br/>";
        }, "");
        _results.push(list.append("<tr><td>" + method + "</td><td>" + arg_details + "</td><td>" + (details.documentation || "") + "</td></tr>"));
      }
      return _results;
    },
    renderPropertyGroup: function(group) {
      var details, list, method, prototype, source, _ref, _ref1, _ref2, _results;
      if (group == null) {
        group = "public";
      }
      source = (_ref = this.component) != null ? (_ref1 = _ref.documentation()) != null ? _ref1.details["" + group + "Properties"] : void 0 : void 0;
      if (_.isEmpty(source)) {
        return;
      }
      prototype = (_ref2 = Luca.util.resolve(this.component.get("class_name"))) != null ? _ref2.prototype : void 0;
      list = this.$(".properties." + group).show().find('.table tbody');
      _results = [];
      for (method in source) {
        details = source[method];
        if (!(!_.isFunction(prototype[method]))) {
          continue;
        }
        details || (details = {});
        _results.push(list.append("<tr><td>" + method + "</td><td>" + (details["default"] || "") + "</td><td>" + (details.documentation || "") + "</td></tr>"));
      }
      return _results;
    }
  });

  view.register();

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
