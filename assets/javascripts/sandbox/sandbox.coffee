Sandbox.Application = Luca.Application.extend
  name: 'sandbox_application'
  el: '#viewport'
  fluid: false

  topNav:'top_navigation'

  initialize: (@options={})->
    Luca.Application::initialize.apply @, arguments
    @router = new Sandbox.Router(app: @)

  components:[
    ctype: 'pages_controller'
    name: 'pages'
  ]

$ do ->
  (window || global).SandboxApp = new Sandbox.Application()
  SandboxApp.boot()
  prettyPrint()