developmentConsole = Luca.register    "Luca.tools.DevelopmentConsole"

developmentConsole.extends            "Luca.core.Container"

developmentConsole.defines
  className: "luca-ui-console"
  name: "console"
  history: []
  historyIndex: 0
  width: 1000

  componentEvents:
    "input key:keyup"    : "historyUp"
    "input key:keydown"  : "historyDown"
    "input key:enter"    : "runCommand"

  compileOptions:
    bare: true

  components:[
    type: "code_mirror_field"
    role: "code_mirror"
    additionalClassNames: "clearfix"
    name: "code_output"
    readOnly: true
    lineNumbers: false
    mode: "javascript"
    lineWrapping: true
    gutter: false
  ,
    type: "text_field"
    name: "code_input"
    role: "input"
    lineNumbers: false
    height: '30px'
    maxHeight: '30px'
    gutter: false
    autoBindEventHandlers: true
    hideLabel: true
    prepend: "Coffee>"
    events:
      "keypress input" : "onKeyEvent"
      "keydown input" : "onKeyEvent"

    onKeyEvent: (keyEvent)->
      if keyEvent.type is "keypress" and keyEvent.keyCode is Luca.keys.ENTER
        @trigger("key:enter", @getValue())

      if keyEvent.type is "keydown" and keyEvent.keyCode is Luca.keys.KEYUP
        @trigger("key:keyup")

      if keyEvent.type is "keydown" and keyEvent.keyCode is Luca.keys.KEYDOWN
        @trigger("key:keydown")

    afterRender: ()->
      @$('input').focus()
  ]

  afterRender: ()->
    @$container().modal(backdrop: false)

    if @width?
      marginLeft = parseInt(@width) * 0.5 * -1
      @$container().css("width", @width).css('margin-left', parseInt(marginLeft) )

  show: (options={})->
    @$container().modal('show')
    @

  getContext: ()->
    window

  initialize: ()->
    @_super("initialize", @, arguments)
    _.bindAll @, "historyUp", "historyDown", "onSuccess", "onError", "runCommand"

  saveHistory: (command)->
    @history.push( command ) if command?.length > 0
    @historyIndex = 0

  historyUp: ()->
    @historyIndex -= 1
    @historyIndex = 0 if @historyIndex < 0

    currentValue = @getInput().getValue()
    @getInput().setValue( @history[ @historyIndex ] || currentValue )

  historyDown: ()->
    @historyIndex += 1
    @historyIndex = @history.length - 1 if @historyIndex > @history.length - 1

    currentValue = @getInput().getValue()

    @getInput().setValue( @history[ @historyIndex ] || currentValue)

  append: (code, result, skipFormatting=false)->
    output = @getCodeMirror()
    current = output.getValue()

    source = "// #{ code }" if code?

    payload = if skipFormatting or code.match(/^console\.log/)
      [current,result]
    else
      [current,source, result]

    output.setValue( _.compact(payload).join("\n") )
    output.getCodeMirror().scrollTo(0,90000)

  onSuccess: (result, js, coffee)->
    @saveHistory(coffee)

    dump = ""

    if _.isArray( result ) or _.isObject( result ) or _.isString( result ) or _.isNumber(result)
      dump = JSON.stringify(result, null, "\t")

    dump ||= result.toString?()

    @append(js, dump || "undefined")

  onError: (error, js, coffee)->
    @append(js, "// ERROR: #{ error.message }")

  evaluateCode: (code, raw)->
    return unless code?.length > 0

    raw = _.string.strip(raw)
    output = @getCodeMirror()
    dev = @

    evaluator = ()->
      old_console = window.console

      console =
        log: ()->
          for arg in arguments
            dev.append(undefined, arg, true)

      log = console.log

      try
        result = eval( code )
      catch error
        window.console = old_console
        throw(error)

      window.console = old_console

      result

    try
      result = evaluator.call( @getContext() )

      # capture luca objects for special inspection 
      if Luca.isComponent( result )
        result = Luca.util.inspectComponent( result )
      else if Luca.isComponentPrototype( result )
        result = Luca.util.inspectComponentPrototype( result )

      @onSuccess(result, code, raw) unless raw.match(/^console\.log/)
    catch error
      @onError(error, code, raw)

  runCommand: ()->
    dev     = @
    compile = _.bind(Luca.tools.CoffeeEditor::compile, @)
    raw = @getInput().getValue()
    compiled = compile raw, (compiled)->
      dev.evaluateCode(compiled, raw)

Luca.util.launchers ||= {}

Luca.util.inspectComponentPrototype = (componentPrototype)->
  liveInstances = Luca.registry.findInstancesByClass( componentPrototype )

Luca.util.inspectComponent = (component)->
  component = Luca(component) if _.isString(component)

  {
    name:         component.name  
    instanceOf:   component.displayName 
    subclassOf:   component._superClass()::displayName
    inheritsFrom: Luca.parentClasses( component )
  }

Luca.util.launchers.developmentConsole = (name="luca-development-console")->
  @_lucaDevConsole = Luca name, ()=>
    @$el.append Backbone.View::make("div", id: "#{ name }-wrapper", class: "modal fade large")

    dconsole = new Luca.tools.DevelopmentConsole
      name: name
      container: "##{ name }-wrapper"

    dconsole.render()
    dconsole.getCodeMirror().setHeight(602)

  @_lucaDevConsole.show()
  Luca(name)
