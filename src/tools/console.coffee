codeMirrorOptions =
  readOnly: true
  autoFocus: false
  theme: "monokai"
  mode: "javascript"

Luca.define("Luca.tools.Console").extends("Luca.core.Container").with
  className: "luca-ui-console"
  name: "console"
  components:[
    ctype: "code_mirror_field"
    name: "code_output"
    readOnly: true
    lineNumbers: true
    mode: "javascript"
    maxHeight: '200px'
    height: '200px'
    lineWrapping: true
  ,
    ctype: "text_field"
    name: "code_input"
    lineNumbers: false
    height: '30px'
    maxHeight: '30px'
    gutter: false
    autoBindEventHandlers: true
    hideLabel: true
    events:
      "keypress input" : "onKeyEvent"
    onKeyEvent: (keyEvent)->
      if keyEvent.keyCode is 13
        @trigger("command", @getValue())
        @setValue('')
    afterRender: ()->
      @$('input').focus()
  ]

  getContext: ()->
    window

  onSuccess: (result)->
    input = Luca("code_input")
    output = Luca("code_output")

    output.setValue( JSON.stringify(result, null, "\t") )

  onError: (error)->

  evaluateCode: (code, bufferId, compile=false)->
    return unless code?.length > 0

    evaluator = ()-> eval( code )

    try
      result = evaluator.call( @getContext() )
      @onSuccess(result, bufferId, code)
    catch error
      @onError( error, bufferId, code)

  compileOptions:
    bare: true

  afterRender: ()->
    Luca.core.Container::afterRender?.apply(@, arguments)
    dev = @

    compile = _.bind(Luca.tools.CoffeeEditor::compile, @)

    Luca("code_input").bind "command", ()->
      compiled = compile @getValue(), (compiled)->
        dev.evaluateCode(compiled)