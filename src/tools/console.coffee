codeMirrorOptions =
  readOnly: true
  autoFocus: false
  theme: "monokai"
  mode: "javascript"

Luca.define("Console").extends("Luca.core.Container").with
  className: "luca-ui-console"
  components:[
    ctype: "code_mirror_field"
    name: "code_output"
    readOnly: true
    lineNumbers: true
    mode: "javascript"
    maxHeight: '200px'
    height: '200px'
  ,
    ctype: "code_mirror_field"
    name: "code_input"
    lineNumbers: false
    height: '50px'
    maxHeight: '50px'
    gutter: false
    topToolbar:
      buttons:[
        align: 'right'
        label: "Hi"
      ]
  ]