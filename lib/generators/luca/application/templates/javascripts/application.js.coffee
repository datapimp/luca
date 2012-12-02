_.def('<%= javascript_namespace %>.Application').extends('Luca.Application').with

  name: '<%= javascript_namespace %>App'
  autoBoot: false
  router: "<%= javascript_namespace %>.Router"
  el: '#viewport'

  components:[
    type: 'controller'
    name: 'pages'
    components:[
      type: "home"
      name: "home"
    ]
  ]
