_.def("Sandbox.views.BuilderEditor").extends("Luca.tools.CoffeeEditor").with
  name: "builder_editor"


  toggleSource:()->
    @_super("toggleMode", @, arguments)
