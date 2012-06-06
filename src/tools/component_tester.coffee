# TODO
#
# Developed this component for use with the component tester.
#
# The editor which compiles coffeescript code should be extracted into a separate component
# and all of the buffers / specifics etc should be moved into a more specific component for
# this purpose

defaults = {}

defaults.setup = """
# the setup tab contains code which is run every time
# prior to the 'implementation' run
"""

defaults.component = """
# the component tab is where you handle the definition of the component
# that you are trying to test.  it will render its output into the
# output panel of the code tester
#
# example definition:
#
# _.def('MyComponent').extends('Luca.View').with
#   bodyTemplate: 'sample/welcome'
"""

defaults.teardown = """
# the teardown tab is where you undo / cleanup any of the operations
# from setup / implementation
"""

defaults.implementation = """
# the implementation tab is where you specify options for your component.
#
# NOTE: the component tester uses whatever is returned from evalulating
# the code in this tab.  if it responds to render(), it will append
# render().el to the output panel.  if it is an object, then we will attempt
# to create an instance of the component you defined with the object as
"""

bufferNames = ["setup","implementation","component","teardown"]

_.def("Luca.tools.ComponentTester").extends("Luca.core.Container").with
  name: "component_tester"

  className:"span11"

  autoEvaluateCode: false

  components:[
    ctype: 'card_view'
    name: "component_detail"
    activeCard: 0
    components:[
      ctype: 'panel'
      name: "component_tester_output"
      bodyTemplate: "component_tester/help"
    ]
  ,
    ctype: "code_editor"
    name: "component_tester_editor"
    className: 'font-small'
    minHeight:'350px'

    styles:
      "position" : "absolute"
      "bottom" : "0px"
      "width" : "90%"

    currentBuffers: defaults

    bufferNames: ["component","setup","implementation","teardown"]

    topToolbar:
      buttons:[
        icon: "refresh"
        align: "right"
        description: "refresh the output of your component setup"
        eventId: "click:refresh"
      ,
        icon: "play"
        align: "right"
        description: "Enable auto-evaluation of test script on code change"
        eventId: "click:autoeval"
      ,
        icon: "plus"
        description: "add a new component to test"
        eventId: "click:add"
      ,
        icon: "folder-open"
        description: "open an existing component's definition"
        eventId: "click:open"
      ]

    bottomToolbar:
      buttons:[
        group: true
        wrapper: "span4"
        buttons:[
          label: "Coffeescript"
          description: "Switch between compiled JS and Coffeescript"
          eventId: "toggle:mode"
        ,
          label: "VIM"
          description: "Switch between VIM and normal keybindings"
          eventId: "toggle:keymap"
        ]
      ,
        group: true
        wrapper: "span4 offset4"
        buttons:[
          label: "Component"
          eventId: "edit:component"
          description: "Edit the component itself"
        ,
          label: "Setup"
          eventId: "edit:setup"
          description: "Edit the setup for your component test"
        ,
          label: "Implementation"
          eventId: "edit:implementation"
          description: "Implement your component"
        ,
          label: "Teardown"
          eventId: "edit:teardown"
          description: "Edit the teardown for your component test"
        ]
      ,
        group: true
        align: "right"
        buttons:[
          icon:"question-sign"
          align: "right"
          eventId: "click:help"
          description: "Help"
        ,
          icon: "cog"
          align: 'right'
          eventId: "click:settings"
          description : "component tester settings"
        ,
          icon: "eye-close"
          align: "right"
          eventId: "click:hide"
          description: "hide the tester controls"
        ,
          icon: "heart"
          eventId: "click:console"
          description: "Coffeescript Console"
          align: "right"
        ]
      ]
  ]

  debugMode: true

  componentEvents:
    "component_tester_editor click:autoeval" : "toggleAutoeval"
    "component_tester_editor click:refresh" : "refreshCode"
    "component_tester_editor click:hide" : "toggleControls"
    "component_tester_editor click:settings" : "toggleSettings"
    "component_tester_editor click:add" : "addComponent"
    "component_tester_editor click:open" : "openComponent"
    "component_tester_editor click:help" : "showHelp"
    "component_tester_editor click:console" : "toggleConsole"
    "component_tester_editor eval:error" : "onError"
    "component_tester_editor eval:success" : "onSuccess"
    "component_tester_editor edit:setup" : "editSetup"
    "component_tester_editor edit:teardown" : "editTeardown"
    "component_tester_editor edit:component" : "editComponent"
    "component_tester_editor edit:implementation" : "editImplementation"
    "component_tester_editor toggle:keymap" : "toggleKeymap"
    "component_tester_editor toggle:mode" : "toggleMode"

  initialize: ()->
    Luca.core.Container::initialize.apply(@, arguments)

    for key, value of @componentEvents
      @[ value ] = _.bind(@[value], @)

    @defer("editComponent").until("after:render")

    @bind "change:editor:mode",

  afterRender: ()->
    @getOutput().applyStyles('min-height':'400px')

    # TEMP
    # Visual hacks
    @$('.toolbar-container').css('padding-right','12px')
    @$('.luca-ui-toolbar.toolbar-bottom').css('margin','0px')

    changeHandler = _.idleMedium ()=>
      if @autoEvaluateCode is true
        @refreshCode()
    , 1500

    @getEditor().bind "code:change", changeHandler

  getEditor: ()->
    Luca("component_tester_editor")

  getDetail: ()->
    Luca("component_detail")

  getOutput: ()->
    @getDetail().findComponentByName("component_tester_output")

  onError: (error, bufferId)->
    console.log "Error in #{ bufferId }", error, error.message, error.stack

  onSuccess: (result, bufferId)->
    if bufferId is "component"
      @componentDefinition = result

    if bufferId is "implementation"
      if Luca.isBackboneView(result)
        object = result
      else if _.isObject(result) and result.ctype?
        object = Luca(result)
      else if _.isObject(result) and _.isFunction(@componentDefinition)
        object = ( new @componentDefinition(result) )

      if Luca.isBackboneView(object)
        @getOutput().$html( object.render().el )

  refreshCode: ()->
    @getOutput().$html('')

    for bufferId, code of @getTestRun()
      @evaluateCode(code, bufferId)

  toggleConsole: (button)->
    @developmentConsole = Luca "coffeescript-console", ()-> new Luca.tools.DevelopmentConsole(name:"coffeescript-console")

    unless @consoleContainerAppended
      container = @make("div",{id:"devtools-console-wrapper",class:"devtools-console-container modal",style:"width:850px"}, @developmentConsole.el)
      $('body').append( container )
      @consoleContainerAppended = true
      @developmentConsole.render()

    $('#devtools-console-wrapper').modal('show')

  toggleAutoeval: (button)->
    @autoEvaluateCode = !(@autoEvaluateCode is true)

    if not @started and @autoEvaluateCode is true
      @started = true
      @refreshCode()

    iconHolder = button.children('i').eq(0)
    buttonClass = if @autoEvaluateCode then "icon-pause" else "icon-play"
    iconHolder.removeClass()
    iconHolder.addClass(buttonClass)

    @

  showEditor: (options)->
    @getEditor().$('.toolbar-container.top').toggle(options)
    @getEditor().$('.codemirror-wrapper').toggle(options)
    @trigger "controls:toggled"

  toggleKeymap: (button)->
    newMode = if @getEditor().keyMap is "vim" then "basic" else "vim"
    @getEditor().setKeyMap(newMode)
    button.html( _.string.capitalize(newMode) )

  toggleMode: (button)->
    newMode = if @getEditor().mode is "coffeescript" then "javascript" else "coffeescript"
    @getEditor().setMode(newMode)
    button.html _.string.capitalize(newMode)
    @editBuffer @currentBufferName, (newMode is "javascript")

  toggleControls: (button)->
    @bind "controls:toggled", ()=>
      iconHolder = button.children('i').eq(0)
      iconHolder.removeClass()

      buttonClass = if @getEditor().$('.toolbar-container.top').is(":visible") then "icon-eye-close" else "icon-eye-open"
      iconHolder.addClass(buttonClass)

    @showEditor()

    @

  toggleSettings: ()->
    @

  editBuffer: (@currentBufferName, compiled=false, autoSave=true)->
    @showEditor(true)
    @highlight(@currentBufferName)

    buffer = if compiled then "compiled_#{ @currentBufferName }" else @currentBufferName
    @getEditor().loadBuffer(buffer,autoSave)
    @

  editComponent: ()->
    @editBuffer("component")

  editTeardown: ()->
    @editBuffer("teardown")

  editSetup: ()->
    @editBuffer("setup")

  editImplementation: ()->
    @editBuffer("implementation")

  getTestRun: ()->
    editor = @getEditor()

    testRun = {}

    for buffer in ["component","setup","implementation","teardown"]
      testRun[buffer] = editor.getBuffer(buffer, true)

    testRun

  getContext: ()->
    Luca.util.resolve(@context||="window")

  evaluateCode: (code, bufferId, compile=false)->
    code ||= @getEditor().getValue()
    compiled = if compile is true then @getEditor().compileCode(code) else code

    evaluator = ()-> eval( compiled )

    try
      result = evaluator.call( @getContext() )
      @onSuccess(result, bufferId, code)
    catch error
      @onError( error, bufferId, code)

  showHelp: ()->
    @getOutput().$html( Luca.template("component_tester/help",@) )

  addComponent: ()->
    @debug "add components"

  openComponent: ()->
    @debug "open component"
    @trigger "open:component"

  highlight: (section)->
    @$("a.btn[data-eventid='edit:#{ section }']").siblings().css('font-weight','normal')
    @$("a.btn[data-eventid='edit:#{ section }']").css('font-weight','bold')
