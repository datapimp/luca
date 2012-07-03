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

    _.bindAll(@, "editorChange", "toggleSource")

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

    @state.bind "change:currentMode", (model)->
      if model.get('currentMode') is "javascript"
        editor.setValue model.get('javascript')
      else 
        editor.setValue model.get('coffeescript')

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

  toggleMode: ()->
    if @currentMode() is "coffeescript"
      @state.set('currentMode', 'javascript')
    else if @currentMode() is "javascript"
      @state.set('currentMode', 'coffeescript')

  currentMode: ()->
    @state.get("currentMode")

  getCoffeescript: ()->
    @state.get("coffeescript")
      
  getJavascript: (recompile=false)->
    js = @state.get("javascript")

    if recompile is true or js?.length is 0
      results = @compile( @getCoffeescript() ) 
      js = results?.compiled

    js

  editorChange: ()->
    if @autoCompile is true
      @state.set( @currentMode(), @getValue() )
