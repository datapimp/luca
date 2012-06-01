Sandbox.Application = Luca.Application.extend
  name: 'sandbox_application'
  el: '#viewport'
  fluid: true

  topNav:'top_navigation'

  useKeyRouter: true

  keyEvents:
    meta:
      forwardslash: "developmentConsole"

  components:[
    ctype: 'controller'
    name: 'pages'
    components:[
      name: "main"
      template: 'main'
    ,
      name :"class_browser"
      ctype: "class_browser"
    ,
      name: "component_tester"
      ctype: "component_tester"
    ]
  ]

  initialize: (@options={})->
    Luca.Application::initialize.apply @, arguments
    @router = new Sandbox.Router(app: @)

  developmentConsole: ()->
    @_developmentConsole ||= new Luca.tools.DevelopmentConsole()
    @_developmentConsole.render().toggle()

$ do ->
  (window || global).SandboxApp = new Sandbox.Application()
  SandboxApp.boot()
  prettyPrint()