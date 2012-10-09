_.def("Sandbox.views.ProjectBrowser").extends("Luca.core.Container").with
  className: "project-browser"
  components:[
    type: "text_field"
    name: "component_list_filter"
    additionalClassNames: "well"
    className: "component-list-filter-form"
    placeHolder: "Find a component"
    hideLabel: true
    prepend: "?"
  ,
    type: "component_list"
    name: "component_list"
  ]
