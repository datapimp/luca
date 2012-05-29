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
    @compiler = compilers[@mode] || @compile

    @bind "code:change", @onCodeChange

  afterRender: ()->
    _.defer ()=>
      width = 700
      height = 600

      console.log "Setting Dimensions", height, width
      @$el.height( height )
      @$el.width( width )

      @editor = window.CodeMirror( @$el[0], @editorOptions())

      console.log @editor
      @restore()

  # if we don't have a special compiler for
  # this mode, then we will just return the code
  compile: (code)-> code

  save: ()->
    localStorage.setItem("editor-value", @getValue())

  restore: ()->
    @editor.setValue localStorage.getItem("editor-value") || ""
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
      console.log "Error Compiling Coffeescript"
      console.log error.message

  onCodeChange: ()->
    # Implement

  getValue: ()->
    @editor.getValue()

  editorOptions: ()->
    mode: @mode
    lineNumbers: true
    gutter: true
    autofocus: true
    onChange: @onEditorChange
