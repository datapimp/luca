Sandbox.views.PagesController = Luca.components.Controller.extend
  # the main component is the tab view which
  # has its own individual demos
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
    ,
      ctype: 'development_console'
      name: 'development_console'
      title: "Development Console"
    ,
      ctype: "collection_inspector"
      name: "collection_inspector"
      title: "Collection Inspector"
    ,
      ctype: "code_editor"
      name: "code_editor"
      title: "Code Editor"
    ]
  ]

