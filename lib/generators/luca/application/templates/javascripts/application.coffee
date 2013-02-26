application = <%= javascript_namespace %>.register      "<%= javascript_namespace %>.Application"

application.extends                                     "Luca.Application" 

application.defines
  components:[
    type: 'controller'
    name: 'pages'
    components:[
      name: "home"
      template: "pages/home"
    ]
  ]
  el: '#viewport'
  autoBoot: false
  name: '<%= javascript_namespace %>App'
  router:             "<%= javascript_namespace %>.Router"
  collectionManager:  "<%= javascript_namespace %>CollectionManager"
