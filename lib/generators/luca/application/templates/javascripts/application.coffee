application = <%= javascript_namespace %>.register      "<%= javascript_namespace %>.Application"

application.extends                                     "Luca.Application" 

application.contains
  type: 'controller'
  name: 'pages'
  components:[
    name: "home"
    template: "pages/home"
  ]

application.defines
  el: '#viewport'
  autoBoot: false
  name: '<%= javascript_namespace %>App'
  router:             "<%= javascript_namespace %>.Router"
  collectionManager:  "<%= javascript_namespace %>CollectionManager"
