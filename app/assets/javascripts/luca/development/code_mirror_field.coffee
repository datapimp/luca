defaultOptions =
  readOnly: false
  lineNumbers: true
  gutter: true
  autofocus: false
  passDelay: 50
  autoClearEmptyLines: true
  smartIndent: false
  tabSize: 2
  electricChars: false

Luca.define("Luca.tools.CodeMirrorField").extends("Luca.components.Panel").with
  bodyClassName: "codemirror-wrapper"
  preProcessors: []
  postProcessors: []

  codemirrorOptions: ()->
    options = _.clone( defaultOptions )

    customOptions =
      mode: @mode || "coffeescript"
      theme: @theme || "monokai"
      keyMap: @keyMap || "basic"
      lineNumbers: if @lineNumbers? then @lineNumbers else defaultOptions.lineNumbers
      readOnly: if @readOnly? then @readOnly else defaultOptions.readOnly
      gutter: if @gutter? then @gutter else defaultOptions.gutter
      lineWrapping: @lineWrapping is true
      onChange: ()=>
        @trigger "editor:change", @
        @onEditorChange?.call(@)

    customOptions.onKeyEvent = _.bind(@onKeyEvent,@) if @onKeyEvent?

    _.extend(options, customOptions)

  getCodeMirror: ()->
    @instance

  getValue: (processed=true)->
    value = @getCodeMirror().getValue()

  setValue: (value="", processed=true)->
    @getCodeMirror().setValue( value )

  afterRender: ()->
    @instance = CodeMirror( @$bodyEl()[0], @codemirrorOptions() )
    console.log "After Render On Code Mirror Field"
    @setMaxHeight()
    @setHeight()

  setMaxHeight: (maxHeight=undefined, grow=true)->
    maxHeight ||= @maxHeight
    return unless maxHeight?
    @$('.CodeMirror-scroll').css('max-height', maxHeight)
    @$('.CodeMirror-scroll').css('height', maxHeight) if grow is true

  setHeight: (height=undefined)->
    @$('.CodeMirror-scroll').css('height', height) if height?