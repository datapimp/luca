BuffersModel = Luca.Model.extend
  defaults:
    _current: "default"
    _namespace: "default"
    _compiled: []

  initialize: (@attributes={})->
    Luca.Model::initialize.apply(@, arguments)
    @fetch(silent:true)

  requireCompilation: ()->
    @get("_compiled")

  bufferKeys: ()->
    return @bufferNames if @bufferNames?

    for key, value of @attributes when !key.match(/_/)
      key

  namespacedBuffer: (key)->
    "#{ @get('_namespace') }:#{ key }"

  bufferValues: ()->
    _( @attributes ).pick( @bufferKeys() )

  fetch: (options={})->
    options.silent ||= true

    _( @bufferKeys() ).each (key)=>
      value = localStorage?.getItem( @namespacedBuffer(key) )
      @set(key, value, silent: options.silent is true) if value?

    @

  persist: ()->
    _( @bufferKeys() ).each (key)=>
      value = @get(key)
      localStorage?.setItem( @namespacedBuffer(key), value)

    @

  currentContent: ()->
    current = @get("_current")
    @get(current)

compilers =
  coffeescript: (code)->
    CoffeeScript.compile code, bare: true
  default: (code)->
    code

_.def("Luca.tools.CodeEditor").extends("Luca.components.Panel").with
  name: "code_editor"

  id: "editor_container"

  autoBindEventHandlers: true

  bodyClassName: "codemirror-wrapper"

  defaultValue: ''

  compilationEnabled: false

  bufferNamespace: "luca:code"

  namespace: (set, options={})->
    if set?
      @bufferNamespace = set
      @buffers?.set("_namespace", set, silent: (options.silent is true) )

    @bufferNamespace

  initialize: (@options)->
    @_super("initialize", @, arguments)

    _.bindAll @, "onCompiledCodeChange", "onBufferChange", "onEditorChange"

    @mode ||= "coffeescript"
    @theme ||= "monokai"
    @keyMap ||= "vim"
    @lineWrapping ||= true

    @compiler = compilers[@mode] || compilers.default

    @setupBuffers()

  setWrap: (@lineWrapping)->
    @editor.setOption("lineWrapping", @lineWrapping)

  setMode: (@mode)->
    @editor.setOption("mode", @mode)
    @

  setKeyMap: (@keyMap)->
    @editor.setOption("keyMap", @keyMap)
    @

  setTheme: (@theme)->
    @editor.setOption("theme",@theme)
    @

  setupBuffers: ()->
    attributes = _.extend(@currentBuffers || {},_compiled:@compiledBuffers,_namespace:@namespace())
    @buffers = new BuffersModel(attributes)

    editor = @

    _( @buffers.bufferKeys() ).each (key)=>
      @buffers.bind "change:#{ key }", ()=>
        @onBufferChange.apply(@, arguments)

    _( @buffers.requireCompilation() ).each (key)=>
      @buffers.bind "change:compiled_#{ key }", @onCompiledCodeChange

    # handle switching of the buffers.  when the editor
    # is told to switch buffers, we will get the current content
    # in that buffer, and update the code mirror instance
    @buffers.bind "change:_current", (model,value)=>
      editor.trigger "buffer:change"
      editor.editor.setValue( @buffers.currentContent() || "" )

    @monitorChanges = true

  currentBuffer: ()->
    @buffers.get("_current")

  loadBuffer: (bufferName, autoSave=true)->
    @saveBuffer() if autoSave
    @buffers.set("_current", bufferName)

  saveBuffer: ()->
    localStorage.setItem( @buffers.namespacedBuffer( @currentBuffer() ), @editor.getValue())
    @buffers.set( @currentBuffer(), @editor.getValue() )

  getBuffer: (buffer, compiled=false)->
    buffer ||= @currentBuffer()
    code = @buffers.get( buffer )

    return code unless compiled is true

    compiledCode = @buffers.get("compiled_#{ buffer }")

    if _.string.isBlank(compiledCode)
      compiledCode = @compileCode(code, buffer)

    return compiledCode

  editorOptions: ()->
    mode: @mode
    theme: @theme
    keyMap: @keyMap
    lineNumbers: true
    gutter: true
    autofocus: true
    onChange: @onEditorChange
    passDelay: 50
    autoClearEmptyLines: true
    smartIndent: false
    tabSize: 2
    electricChars: false


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

  save: ()->
    @saveBuffer()

  restore: ()->
    @editor.setValue("")
    @editor.refresh()

  onEditorChange: ()->
    if @monitorChanges
      @save()

  onBufferChange: (model, newValue, changes)->
    previous = model.previousAttributes()

    _( @buffers.bufferKeys() ).each (key)=>
      if previous[key] isnt @buffers.get(key)

        if _( @buffers.requireCompilation() ).include(key)
          result = @compileCode( @buffers.get(key), key )
          if result.success is true
            @buffers.persist(key)
            @buffers.set("compiled_#{ key }", result.compiled, silent: true)
        else
          @trigger "code:change:#{ key }", @buffers.get(key)
          @buffers.persist(key)

    @buffers.change()

  onCompiledCodeChange: (model, newValue, changes)->
    changedBuffers = _( model.changedAttributes() ).keys()
    @trigger "code:change", changedBuffers
    for changed in changedBuffers
      @trigger "code:change:#{ changed }", changed

  compileCode: (code, buffer)->
    buffer ||= @currentBuffer()
    code ||= @getBuffer(buffer, false)

    compiled = ""

    result =
      success: true
      compiled: ""

    try
      compiled = @compiler.call(@, code)
      @trigger "compile:success", code, compiled
      result.compiled = compiled
    catch error
      @trigger "compile:error", error, code
      result.success = false
      result.compiled = @buffers.get("compiled_#{ buffer }")

    result

  getCompiledCode: (buffer)->
    buffer = @getBuffer(buffer)
    _.string.strip( @compileCode(buffer) )

  getValue: ()->
    @editor.getValue()

  setValue: (value)->
    @editor.setValue( value )