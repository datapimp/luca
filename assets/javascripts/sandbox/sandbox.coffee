$ do ->
  main = new Luca.containers.Viewport
    el: '#viewport'
    name: 'viewport'
    fullscreen: false
    components:[
      name: 'form_view'
      ctype: 'form_view'
      fieldLayoutClass: 'column-layout'
      components:[
        name: 'column_view'
        debugMode: true
        ctype: 'column_view'
        components:[
          name: 'column_one'
          components:[
            ctype: 'text_field'
            label: 'Field One'
            name: 'field_one'
          ,
            ctype: 'text_field'
            label: 'Field THree'
            name: 'Field THree'
          ]
        ,
          name: 'column_two'
          components:[
            ctype: 'text_field'
            label: 'Field Two'
            name: 'field_two'
          ]
        ]
      ]
    ]

  main.render()
