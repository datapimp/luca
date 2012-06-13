codeMirrorOptions =
  readOnly: true
  autoFocus: false
  theme: "monokai"
  mode: "javascript"

Luca.define("Luca.tools.Console").extends("Luca.core.Container").with
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
    maxHeight: '250px'
    height: '250px'
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

  onSuccess: (result, js, coffee)->
    @saveHistory(coffee)
    input = Luca("code_input")
    output = Luca("code_output")
    inspected = JSON.stringify(result, null, "\t")  || "undefined"
    display = _.compact([output.getValue(),"// #{ _.string.strip(js) }", inspected]).join("\n")
    output.setValue( display )
    output.getCodeMirror().scrollTo(0,90000)

  onError: (error)->
    output = Luca("code_output")
    display = _.compact([output.getValue(),"// #{ _.string.strip(js) }", "// ERROR: #{ error.message }"]).join("\n")
    output.setValue( display )

  evaluateCode: (code, raw )->
    console.log "evaluating", code, raw
    return unless code?.length > 0

    evaluator = ()-> eval( code )

    try
      result = evaluator.call( @getContext() )
      @onSuccess(result, code, raw)
    catch error
      @onError(error, code, raw)

  runCommand: ()->
    dev     = @
    compile = _.bind(Luca.tools.CoffeeEditor::compile, @)
    raw = Luca("code_input").getValue()
    compiled = compile raw, (compiled)->
      console.log dev.evaluateCode
      dev.evaluateCode(compiled, raw)