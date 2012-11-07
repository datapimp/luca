(function() {

  _.def('<%= javascript_namespace %>.Application')["extends"]('Luca.Application')["with"]({
    name: 'FoobarApp',
    autoBoot: false,
    router: "<%= javascript_namespace %>.Router",
    el: '#viewport',
    components: [
      {
        ctype: 'controller',
        name: 'pages',
        components: [
          {
            type: "main",
            name: "main"
          }
        ]
      }
    ]
  });

  $(function() {
    Luca.Collection.bootstrap(window.<%= javascript_namespace %>Bootstrap);
    window.<%= javascript_namespace %>App = new <%= javascript_namespace %>.Application();
    return <%= javascript_namespace %>App.boot();
  });

}).call(this);