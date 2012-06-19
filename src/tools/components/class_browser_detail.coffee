_.def("Luca.tools.ClassBrowserDetail").extends('Luca.core.Container').with

  components:[
    ctype: "code_editor"
  ]

  loadComponent: (model)->
    @components[0].compiled = undefined
    @components[0].editor.setValue( model.get('source') )

