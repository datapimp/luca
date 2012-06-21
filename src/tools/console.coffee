codeMirrorOptions =
  readOnly: true
  autoFocus: false
  theme: "monokai"
  mode: "javascript"

Luca.define("Luca.tools.DevelopmentConsole").extends("Luca.core.Container").with
  className: "luca-ui-console"
  name: "console"
  history: []
  historyIndex: 0

  componentEvents:
    "code_input key:keyup" : "historyUp"
    "code_input key:keydown" : "historyDown"
    "code_input key:enter" : "runCommand"

  compileOptions:
    bare: true

  components:[
    ctype: "code_mirror_field"
    name: "code_output"
    readOnly: true
    lineNumbers: false
    mode: "javascript"
    height:"621px"
    maxHeight:"621px"
    lineWrapping: true
    gutter: false
  ,
    ctype: "text_field"
    name: "code_input"
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

  show: (options={})->
    @$el.addClass('modal').modal(options)

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

    currentValue = Luca("code_input").getValue()
    Luca("code_input").setValue( @history[ @historyIndex ] || currentValue )

  historyDown: ()->
    @historyIndex += 1
    @historyIndex = @history.length - 1 if @historyIndex > @history.length - 1

    currentValue = Luca("code_input").getValue()

    Luca("code_input").setValue( @history[ @historyIndex ] || currentValue)

  append: (code, result, skipFormatting=false)->
    output = Luca("code_output")
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
    dump = JSON.stringify(result, null, "\t")
    dump ||= result.toString?()

    @append(js, dump || "undefined")

  onError: (error, js, coffee)->
    @append(js, "// ERROR: #{ error.message }")

  evaluateCode: (code, raw)->
    return unless code?.length > 0

    raw = _.string.strip(raw)
    output = Luca("code_output")
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
      @onSuccess(result, code, raw) unless raw.match(/^console\.log/)
    catch error
      @onError(error, code, raw)

  runCommand: ()->
    dev     = @
    compile = _.bind(Luca.tools.CoffeeEditor::compile, @)
    raw = Luca("code_input").getValue()
    compiled = compile raw, (compiled)->
      dev.evaluateCode(compiled, raw)