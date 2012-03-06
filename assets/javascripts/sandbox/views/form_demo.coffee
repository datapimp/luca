Sandbox.views.FormDemo = Luca.components.FormView.extend
  afterRender: ()->
    @$el.parent().append Luca.templates["features/form_demo_code"]()
    prettyPrint()
  components:[
    markup: '<h3>Form View with Nested Column Container</h3>'
  ,
    ctype: 'column_view'
    layout: '33/33/33'
    components:[
      components:[
        ctype: 'text_field'
        name: 'textfield3'
        label: 'Sup baby?'
        placeHolder: 'Bootstrapped'
      ]
    ,
      components:[
        ctype: 'checkbox_field'
        label: 'Checkbox Field'
        name: 'checkbox1'
        state: 'success'
      ,
        ctype: 'select_field'
        label: 'Select Field'
        displayField: 'name'
        valueField: 'id'
        state: 'warning'
        collection:
          url: '/sandbox/api.js'
      ]
    ,
      components:[
        ctype: 'text_field'
        label: 'Text Field'
        name: 'textfield1'
        state: 'error'
        placeHolder: 'This is a placeholder'
        helperText : 'This is helper text'
      ,
        ctype: 'text_area_field'
        label: 'Text Area'
        name: 'textarea',
        width: 125
      ]
    ]
  ]
