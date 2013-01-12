application = Tools.register      "Tools.Application"
application.extends               "Luca.Application" 

application.configuration
  el: '#viewport'
  bodyClassName: "viewport-body"

  bindMethods:[
    "toggleLayout"
  ]

  topToolbar:
    buttons:[
      label: "Toggle Layout"
      eventId: "toggle:layout"
    ]

  bottomToolbar:
    buttons:[]

  fluid: false
  applyWrapper: false
  autoBoot: false
  useController: false
  name: 'ToolsApp'
  router:             "Tools.Router"
  collectionManager:  "ToolsCollectionManager"

application.contains
  type: "component_inspector"
  role: "component_inspector"
  className: "work-area row-fluid"

application.publicMethods
  currentApplication: ()->
    "tools"
    
  toggleLayout: ()->
    Tools().getComponentInspector().cycleLayout()

application.privateMethods
  boundaries: ()->
    [0,60,400,460]

application.register()
