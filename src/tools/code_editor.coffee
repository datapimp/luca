compilers =
  coffeescript: (code)->
    CoffeeScript.compile code, bare: true

_.def("Luca.tools.CodeEditor").extends("Luca.View").with
  name: "code_editor"
  id: "editor_container"
  autoBindEventHandlers: true
  initialize: (@options)->
    Luca.View::initialize.apply(@, arguments)

    _.bindAll @, "onEditorChange", "onCodeChange"

    @mode ||= "coffeescript"
    @theme ||= "monokai"
    @keyMap ||= "vim"
    @compiler = compilers[@mode] || @compile

    @bind "code:change", @onCodeChange

  beforeRender: ()->
    @$html "<textarea></textarea>"

  afterRender: ()->
    _.defer ()=>
      @editor = window.CodeMirror.fromTextArea( @$('textarea')[0], @editorOptions())
      @restore()

  # if we don't have a special compiler for
  # this mode, then we will just return the code
  compile: (code)-> code

  save: ()->
    # implement

  restore: ()->
    @editor.refresh()

  onEditorChange: ()->
    @trigger "editor:change"
    @save()

    try
      compiled = @compiler.apply(@, [@getValue()])

      if compiled != @compiled
        @trigger "code:change", compiled
        @compiled = compiled
    catch error
      #console.log "Error Compiling Coffeescript"
      #console.log error.message

  onCodeChange: (compiled)->
    return unless compiled isnt @oldCompiled

    console.log "Evaluating Code Change"
    evaluator = ()->
      eval( compiled )

    evaluator.call( window )
    @oldCompiled = compiled
  getValue: ()->
    @editor.getValue()

  editorOptions: ()->
    mode: @mode
    theme: @theme
    keyMap: @keyMap
    lineNumbers: true
    gutter: true
    autofocus: true
    onChange: @onEditorChange
