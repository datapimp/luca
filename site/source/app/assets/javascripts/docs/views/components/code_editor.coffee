view = Luca.register      "Docs.views.CodeEditor"
view.extends              "Luca.View"

view.publicMethods
  # gets the value of the code mirror instance 
  getValue: ()->

  # runs the value of the editor through the appropriate
  # compiler for the current mode of the editor
  getCompiledValue: ()->

view.publicConfiguration
  # CodeMirror option.  This will control which theme is applied
  # to the editor.  Make sure the CSS for this theme has been loaded.
  theme: "twilight"

  # How many spaces a block should be indented.
  indentUnit: 2

  # Whether to use the context-sensitive indentation that the mode provides 
  smartIndent: true

  # Which language will we be editing? Support for coffeescript, 
  # html, javascript, css, sass, less come out of the box
  mode: "coffeescript" 

  # which keymap to use? default, or vim 
  keyMap: "default"

  # whether or not to wrap lines when they reach past the set limit
  lineWrapping: false

  # display the line numbers in the gutter
  lineNumbers: true

view.privateConfiguration
  # used to debounce the editor change event.  ensures that the callback
  # will only be called once every N milliseconds.
  changeThrottle: 250
  bindMethods:[
    "onEditorChange"
  ]
  codeMirrorOptions: {}
  codeMirrorConfigKeys:[
    "theme"
    "indentUnit"
    "smartIndent"
    "mode"
    "keyMap"
    "lineWrapping"
  ]

view.privateMethods  
  onEditorChange: ()->

  afterRender: ()->
    @$el.append("<div class'editor-toolbar'>#{@name}</div>")
    @$el.append("<div class'editor-el' />")    
    defaults = _(@).pick( @codeMirrorConfigKeys... )
    options = _(@codeMirrorOptions).defaults(defaults)
    replacementEl = @$('div').eq(1)[0]
    @codeMirror = window.CodeMirror(replacementEl, options)
    @codeMirror.on "change", _.debounce(@onEditorChange, @changeThrottle)

view.register()
