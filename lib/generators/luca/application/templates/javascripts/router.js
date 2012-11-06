(function() {

  _.def('<%= javascript_namespace %>.Router')["extends"]('Luca.Router')["with"]({
    routes: {
      "": "default"
    },
    "default": function() {
      return this.app.navigate_to("pages").navigate_to("main");
    }
  });

}).call(this);