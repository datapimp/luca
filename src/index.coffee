_.def("Luca.tools.ComponentBuilder").extends("Luca.components.FormView").with
  name: "component_builder"
  components:[
    ctype: "split_view"
    components:[
      className: "span6"x.e: "text_area_field"
        label: "Here is your code"
        name : "codemirror_output"
        afterRender: ()-> @enableEditor()
        enableEditor: (@editor_config={})->
          return if @editor_enabled
          _.defer ()=>
            @codeMirrorInstance = window.CodeMirror.fromTextArea( @$('textarea')[0], @editorOptions())

            @editor_enabled = true

            value = @getValue()

            _.defer ()=>
              @setValue( value )

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
          lineWrapping: true
      ]
    ]
  ]