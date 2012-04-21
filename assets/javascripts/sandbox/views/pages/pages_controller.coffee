Sandbox.views.PagesController = Luca.components.Controller.extend
  components:[
    name: 'pages_tab_view'
    ctype: 'split_view'
    components:[
      ctype: 'canvas'
    ,
      ctype: 'editor'
    ]
  ]

