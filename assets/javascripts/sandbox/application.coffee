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
      bodyTemplate: 'main'
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
    @developmentConsole = Luca "coffeescript-console", ()->
      new Luca.tools.DevelopmentConsole(name:"coffeescript-console")

    unless @consoleContainerAppended
      container = @make("div",{id:"devtools-console-wrapper",class:"devtools-console-container modal",style:"width:1000px"}, @developmentConsole.el)
      $('body').append( container )
      @consoleContainerAppended = true
      @developmentConsole.render()

    $('#devtools-console-wrapper').modal(backdrop:false,show:true)

  afterRender: ()->
    @_super("afterRender", @, arguments)

$ do ->
  (window || global).SandboxApp = new Sandbox.Application()
  SandboxApp.boot()
  prettyPrint()