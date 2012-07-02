_.def("Sandbox.views.Builder").extends("Luca.core.Container").with
  name: "builder"
  id: "builder"

  activation: ()->
    $('body .navbar').toggle()

  deactivation: ()->
    $('body .navbar').toggle()

  components:[
    ctype: "builder_canvas"
    ctype: "builder_editor"  
  ]

  bottomToolbar:
    buttons:[
      label: "Views"
    ,
      label: "Collections"
    ,
      label: "Models"
    ,
      label: "Templates"
    ]
