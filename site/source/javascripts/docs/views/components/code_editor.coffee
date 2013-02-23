view = Luca.register      "Docs.views.CodeEditor"
view.extends              "Luca.View"

view.privateConfiguration
  tagName: "textarea"

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

view.privateConfiguration
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
  afterRender: ()->
    defaults = _(@).pick( @codeMirrorConfigKeys... )
    options = _(@codeMirrorOptions).defaults(defaults)
    @codeMirror = window.CodeMirror.fromTextArea( @$el[0], options)

view.register()
