_.def("Luca.components.CodeEditor").extends("Luca.containers.BasicPanel").with
  name: "code_editor"
  initialize: (@options={})->
    Luca.containers.BasicPanel::initialize.apply(@, arguments)
