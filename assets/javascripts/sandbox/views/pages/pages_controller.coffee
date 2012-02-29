Sandbox.views.PagesController = Luca.components.Controller.extend
  components:[
    ctype: 'tab_view'
    name: 'pages_tab_view'
    components:[
      ctype: 'template'
      name: 'introduction'
      title: 'Luca.js Introduction'
      template: 'features/introduction'
    ,
      ctype: 'template'
      name: 'view_helpers'
      title: 'View Helpers'
      template: 'features/view_helpers'
    ]
  ]

