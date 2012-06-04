compilers =
  coffeescript: (code)->
    CoffeeScript.compile code, bare: true

_.def("Luca.tools.CodeEditor").extends("Luca.components.Panel").with
  name: "code_editor"
  id: "editor_container"
  autoBindEventHandlers: true

  bodyClassName: "codemirror-wrapper"

  defaultValue: ''

  initialize: (@options)->
    Luca.components.Panel::initialize.apply(@, arguments)

    _.bindAll @, "onEditorChange", "onCodeChange"

    @mode ||= "coffeescript"
    @theme ||= "monokai"
    @keyMap ||= "vim"
    @compiler = compilers[@mode] || @compile

    @bind "code:change", @onCodeChange

    @setupBuffers()

  setupBuffers: ()->
    @buffers = new Luca.Model
      defaults:
        _current: "default"

      currentContent: ()->
        current = @get("_current")
        @get(current)

    editor = @

    @buffers.bind "change:_current", (model,value)->
      editor.setValue( @buffers.currentContent() || "" )

  currentBuffer: ()->
    @buffers.get("_current")

  loadBuffer: (bufferName)->
    @buffers.set("_current", bufferName)

  saveBuffer: ()->
    @buffers.set( @currentBuffer(), @editor.getValue() )

  editorOptions: ()->
    mode: @mode
    theme: @theme
    keyMap: @keyMap
    lineNumbers: true
    gutter: true
    autofocus: true
    onChange: @onEditorChange

  beforeRender: ()->
    Luca.components.Panel::beforeRender?.apply(@, arguments)

    styles =
      "min-height": @minHeight
      background:'#272822'
      color:'#f8f8f2'

    @$bodyEl().css(styles)

    @$html "<textarea></textarea>"

  afterRender: ()->
    _.defer ()=>
      @editor = window.CodeMirror.fromTextArea( @$('textarea')[0], @editorOptions())
      @restore()

  # if we don't have a special compiler for
  # this mode, then we will just return the code
  compile: (code)-> code

  save: ()->
    @saveBuffer()

  restore: ()->
    @editor.setValue("")
    @editor.refresh()

  onEditorChange: ()->
    @trigger "editor:change"

    try
      compiled = @compiler.apply(@, [@getValue()])

      if @compiled and compiled != @compiled
        @trigger "code:change", compiled
        @


    catch error
      #console.log "Error Compiling Coffeescript"
      #console.log error.message

  onCodeChange: (compiled)->
    @save()

  getContext: ()->
    Luca.util.resolve(@context||="window")

  evaluateCode: ()->
    compiled = @compiled

    evaluator = ()-> eval( compiled )

    try
      result = evaluator.call( @getContext() )
      @trigger "eval:success", result
    catch error
      @trigger "eval:error", error

  getValue: ()->
    @editor.getValue()


