(function() {

  _.def("<%= javascript_namespace %>.views.Main")["extends"]("Luca.core.Container")["with"]({
    name: "main",
    bodyTemplate: "main"
  });

}).call(this);