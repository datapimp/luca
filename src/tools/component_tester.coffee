_.def("Luca.tools.ComponentTester").extends("Luca.core.Container").with
  name: "component_tester"
  bodyTemplate: "code_tester"
  bottomToolbar:
    buttons:[
      label: "Mode"
    ]
  components:[
    id: 'output'
    className:'span12'
    ctype: 'view'
    wrapWith: 'row'
    minHeight:'300px'
  ,
    ctype: "code_editor"
    className: 'font-small span8 offset2'
    wrapWith: 'row'
    minHeight:'300px'
  ]