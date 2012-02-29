Sandbox.views.PagesController = Luca.components.Controller.extend
  components:[
    ctype: 'tab_view'
    name: 'pages_tab_view'
    tab_position: 'left'
    components:[
      ctype: 'template'
      name: 'introduction'
      title: 'Introduction'
      template: 'features/introduction'
    ,
      ctype: 'template'
      name: 'view_helpers'
      title: 'View Helpers'
      template: 'features/view_helpers'
    ,
      ctype: 'template'
      name: 'collection_helpers'
      title: 'Collection Helpers'
      template: 'features/collection_helpers'
    ,
      ctype: 'grid_demo'
      name: 'grid_demo'
      title: 'Grid Component'
    ]
  ]

