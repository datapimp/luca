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

defaults.style = """
/*
 * customize the styles that effect this component
 * note, all styles here will be scoped to only effect
 * the output panel :)
*/
"""

defaults.html = ""

bufferNames = ["setup","implementation","component","style","html"]
compiledBuffers = ["setup","implementation","component"]

ComponentPicker = Luca.fields.TypeAheadField.extend
  name: "component_picker"

  label: "Choose a component to edit"

  initialize: ()->
    @collection = new Luca.collections.Components()
    @collection.fetch()

    @_super("initialize", @, arguments)

  getSource: ()->
    @collection.classes()

  change_handler: ()->
    componentDefinition = @getValue()

    component = @collection.find (model)->
      model.get("className") is componentDefinition

    component.fetch success: (model, response)=>
      if response?.source.length > 0
        @trigger "component:fetched", response.source, response.className

    @hide()

  createWrapper: ()->
    @make "div",
      class: "component-picker span4 well"
      style:
        "position: absolute; z-index:12000"

  show: ()->
    @$el.parent().show()

  hide: ()->
    @$el.parent().hide()

  toggle: ()->
    @$el.parent().toggle()



_.def("Luca.tools.ComponentTester").extends("Luca.core.Container").with
  name: "component_tester"

  className:"span11"

  autoEvaluateCode: true

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
    name: "ctester_edit"
    className: 'font-large fixed-height'
    minHeight:'350px'

    styles:
      "position" : "absolute"
      "bottom" : "0px"
      "width" : "96%"

    currentBuffers: defaults

    compiledBuffers:["component","setup","implementation"]

    topToolbar:
      buttons:[
        icon: "resize-full"
        align: "right"
        description: "change the size of the component tester editor"
        eventId: "toggle:size"
      ,
        icon: "pause"
        align: "right"
        description: "Toggle auto-evaluation of test script on code change"
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
          label: "View Javascript"
          description: "Switch between compiled JS and Coffeescript"
          eventId: "toggle:mode"
        ]
      ,
        group: true
        wrapper: "span6 offset4"
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
          label: "Markup",
          eventId: "edit:markup"
          description: "Edit the HTML produced by the component"
        ,
          label: "CSS"
          eventId: "edit:style"
          description: "Edit CSS"
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
    "ctester_edit click:autoeval" : "toggleAutoeval"
    "ctester_edit click:refresh" : "refreshCode"
    "ctester_edit click:hide" : "toggleControls"
    "ctester_edit click:settings" : "toggleSettings"
    "ctester_edit click:add" : "addComponent"
    "ctester_edit click:open" : "openComponent"
    "ctester_edit click:help" : "showHelp"
    "ctester_edit click:console" : "toggleConsole"
    "ctester_edit eval:error" : "onError"
    "ctester_edit eval:success" : "onSuccess"
    "ctester_edit edit:setup" : "editSetup"
    "ctester_edit edit:teardown" : "editTeardown"
    "ctester_edit edit:component" : "editComponent"
    "ctester_edit edit:style" : "editStyle"
    "ctester_edit edit:markup" : "editMarkup"
    "ctester_edit edit:implementation" : "editImplementation"
    "ctester_edit toggle:keymap" : "toggleKeymap"
    "ctester_edit toggle:mode" : "toggleMode"
    "ctester_edit code:change:html" : "onMarkupChange"
    "ctester_edit code:change:style" : "onStyleChange"
    "ctester_edit toggle:size" : "toggleSize"


  initialize: ()->
    Luca.core.Container::initialize.apply(@, arguments)

    for key, value of @componentEvents
      @[ value ] = _.bind(@[value], @)

    @defer("editComponent").until("after:render")

  afterRender: ()->
    @getOutput().applyStyles('min-height':'400px')

    # TEMP
    # Visual hacks
    @$('.toolbar-container').css('padding-right','12px')
    @$('.luca-ui-toolbar.toolbar-bottom').css('margin','0px')

    changeHandler = _.idleMedium ()=>
      if @autoEvaluateCode is true
        @applyTestRun()
    , 500

    @getEditor().bind "code:change", changeHandler

  getEditor: ()->
    Luca("ctester_edit")

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

  applyTestRun: ()->
    @getOutput().$html('')

    for bufferId, code of @getTestRun()
      @evaluateCode(code, bufferId)

  toggleConsole: (button)->
    @developmentConsole = Luca "coffeescript-console", ()-> new Luca.tools.DevelopmentConsole(name:"coffeescript-console")

    unless @consoleContainerAppended
      container = @make("div",{id:"devtools-console-wrapper",class:"devtools-console-container modal",style:"width:900px;height:650px;"}, @developmentConsole.el)
      $('body').append( container )
      @consoleContainerAppended = true
      @developmentConsole.render()

    $('#devtools-console-wrapper').modal(backdrop:false,show:true)

  toggleAutoeval: (button)->
    @autoEvaluateCode = !(@autoEvaluateCode is true)

    if not @started and @autoEvaluateCode is true
      @started = true
      @applyTestRun()

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
    button.html _.string.capitalize((if newMode is "coffeescript" then "View Javascript" else "View Coffeescript"))
    @editBuffer @currentBufferName, (newMode is "javascript")


  currentSize: 1
  sizes:[
    icon: "resize-full"
    value: ()-> $(window).height() * 0.3
  ,
    icon: "resize-small"
    value: ()-> $(window).height() * 0.6
  ]

  toggleSize: (button)->
    index = @currentSize++ % @sizes.length
    newSize = @sizes[ index ].value()
    newIcon = @sizes[ index ].icon

    if button?
      iconHolder = button.children('i').eq(0)
      iconHolder.removeClass().addClass("icon-#{ newIcon }")

    @$('.codemirror-wrapper').css('height', "#{ parseInt(newSize) }px")
    @getEditor().refresh()

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

  setValue: (value, buffer="component")->
    compiled = @getEditor().editor.getOption('mode') is "javascript"
    @editBuffer(buffer, compiled, false).getEditor().setValue( value )

  editBuffer: (@currentBufferName, compiled=false, autoSave=true)->
    @showEditor(true)
    @highlight(@currentBufferName)

    buffer = if compiled then "compiled_#{ @currentBufferName }" else @currentBufferName
    @getEditor().loadBuffer(buffer,autoSave)
    @

  editMarkup: ()->
    @getEditor().setMode('htmlmixed')
    @getEditor().setWrap(true)
    @editBuffer("html").setValue(@getOutput().$html(), 'html')

  editStyle: ()->
    @getEditor().setMode('css')
    @editBuffer("style")

  editComponent: ()->
    @getEditor().setMode('coffeescript')
    @editBuffer("component")

  editTeardown: ()->
    @getEditor().setMode('coffeescript')
    @editBuffer("teardown")

  editSetup: ()->
    @getEditor().setMode('coffeescript')
    @editBuffer("setup")

  editImplementation: ()->
    @getEditor().setMode('coffeescript')
    @editBuffer("implementation")

  getTestRun: ()->
    editor = @getEditor()

    testRun = {}

    for buffer in ["component","setup","implementation"]
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

  onMarkupChange: ()->
    if @autoEvaluateCode is true
      @getOutput().$html @getEditor().getValue()

  onStyleChange: ()->
    if @autoEvaluateCode is true
      $('#component-tester-stylesheet').remove()

      style = @getEditor()?.getValue()

      if style
        styleTag = @make "style", type:"text/css", id: "component-tester-stylesheet"
        $('head').append( styleTag )
        $(styleTag).append(style)

  showHelp: ()->
    @getOutput().$html( Luca.template("component_tester/help",@) )

  addComponent: (button)->

  openComponent: (button)->
    @componentPicker ||= new ComponentPicker()

    @componentPicker.bind "component:fetched", (source, component)=>
      @setEditorNamespace(component).setValue( source, "component")

    if !@getEditor().$('.component-picker').length > 0
      @getEditor().$('.codemirror-wrapper').before(@componentPicker.createWrapper())
      @getEditor().$('.component-picker').html( @componentPicker.render().el )
      @componentPicker.show()
      return

    @componentPicker.toggle()

  highlight: (section)->
    @$("a.btn[data-eventid='edit:#{ section }']").siblings().css('font-weight','normal')
    @$("a.btn[data-eventid='edit:#{ section }']").css('font-weight','bold')

  setEditorNamespace: (namespace)->
    @getEditor().namespace( namespace )
    @getEditor().buffers.fetch()
    @