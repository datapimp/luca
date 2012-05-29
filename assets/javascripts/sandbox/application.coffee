Sandbox.Application = Luca.Application.extend
  name: 'sandbox_application'
  el: '#viewport'
  fluid: false

  topNav:'top_navigation'

  keyEvents:
    meta:
      forwardslash: "developmentConsole"

  initialize: (@options={})->
    Luca.Application::initialize.apply @, arguments
    @router = new Sandbox.Router(app: @)


  beforeRender: ()->
    @applyStyles("margin-top":"25px")
    Luca.Application::beforeRender?.apply @, arguments

  components:[
    ctype: 'pages_controller'
    name: 'pages'
  ]

  developmentConsole: ()->
    @_developmentConsole ||= new Luca.tools.DevelopmentConsole()
    @_developmentConsole.render().toggle()


$ do ->
  (window || global).SandboxApp = new Sandbox.Application()
  SandboxApp.boot()
  prettyPrint()