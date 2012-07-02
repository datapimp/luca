_.def("Luca.tools.CoffeeEditor").extends("Luca.tools.CodeMirrorField").with
  name : "coffeescript_editor"

  autoCompile: true

  compileOptions:
    bare: true

  hooks:[
    "editor:change"
  ]

  initialize: (@options)->
    Luca.tools.CodeMirrorField::initialize.apply(@, arguments)

    _.bindAll(@, "editorChange")

    editor = @

    @state = new Luca.Model
      currentMode: "coffeescript"
      coffeescript:""
      javascript:""

    @state.bind "change:coffeescript", (model)->
      editor.trigger("change:coffeescript")
      code = model.get("coffeescript")

      editor.compile code, (compiled)->
        model.set('javascript',compiled)

    @state.bind "change:javascript", (model)->
      editor.onJavascriptChange?.call(editor, model.get('javascript') )

  compile: (code, callback)->
    response = {}
    code ||= @getValue()

    try
      compiled = CoffeeScript.compile(code, @compileOptions)
      callback?.call(@, compiled)
      response =
        success: true
        compiled: compiled
    catch error
      @trigger("compile:error", error, code)

      response =
        success: false
        compiled: ''
        message: error.message

  currentMode: ()->
    @state.get("currentMode")

  editorChange: ()->
    if @autoCompile is true
      @state.set( @currentMode(), @getValue() )
