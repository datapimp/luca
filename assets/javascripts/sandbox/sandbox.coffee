Sandbox.Application = Luca.Application.extend
  name: 'sandbox_application'
  el: '#viewport'
  components:[
    ctype: 'controller'
    name: 'main_controller'
    components:[
      ctype: 'pages_controller'
      name: 'pages_controller'
    ]
  ]

$ do ->
  (window || global).SandboxApp = new Sandbox.Application()
  SandboxApp.boot()
  prettyPrint()