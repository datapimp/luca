_.def("Sandbox.views.ApplicationInspector").extends("Luca.tools.ApplicationInspector").with
  name: "application_inspector"
  additionalClassNames: ["modal"]

  toggle:(options=backdrop:false)->
    @render() unless @rendered is true
    @$el.modal(options)

  components:[
    ctype:"instance_filter"
  ]