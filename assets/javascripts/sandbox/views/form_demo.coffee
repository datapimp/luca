Sandbox.views.FormDemo = Luca.containers.SplitView.extend
  components:[
    ctype: 'template'
    markup: '<h3>Form View with nested Column View</h3>'
  ,
    ctype: 'form_view'
    components:[
      ctype: 'column_view'
      layout: '50,50'
      components:[
        ctype: 'panel_view'
        components:[
          ctype: 'checkbox_field'
          label: 'Checkbox Field'
          name: 'checkbox1'
        ,
          ctype: 'select_field'
          label: 'Select Field'
          displayField: 'name'
          valueField: 'id'
          collection:
            url: '/sandbox/api'
        ]
      ,
        ctype: 'panel_view'
        components:[
          ctype: 'text_field'
          label: 'Text Field'
          name: 'textfield1'
        ,
          ctype: 'text_area_field'
          label: 'Text Area'
          name: 'textarea',
          width: 125
        ]
      ]      
    ]
  ]

