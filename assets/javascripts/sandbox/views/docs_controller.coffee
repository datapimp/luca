_.def("Sandbox.views.DocsController").extends("Luca.components.Controller").with
  name: "docs"
  defaultCard: "docs_index"
  components:[
    name: "docs_index"
    bodyTemplate: "sandbox/docs_index"
  ]