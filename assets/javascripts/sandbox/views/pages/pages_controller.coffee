Sandbox.views.PagesController = Luca.components.Controller.extend
  components:[
    ctype: 'tab_view'
    name: 'pages_tab_view'
    tab_position: 'left'
    components:[
      name: 'introduction'
      title: 'Introduction'
      template: 'features/introduction'
    ,
      name: 'view_helpers'
      title: 'View Helpers'
      template: 'features/view_helpers'
    ,
      name: 'collection_helpers'
      title: 'Collection Helpers'
      template: 'features/collection_helpers'
    ,
      ctype: 'form_demo'
      name: 'form_demo'
      title: 'Form Views'
    ,
      ctype: 'grid_demo'
      name: 'grid_demo'
      title: 'Collection Grid'
    ]
  ]

