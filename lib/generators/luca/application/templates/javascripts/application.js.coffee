_.def('<%= javascript_namespace %>.Application').extends('Luca.Application').with

  name: '<%= javascript_namespace %>App'
  autoBoot: false
  router: "<%= javascript_namespace %>.Router"
  el: '#viewport'

  components:[
    ctype: 'controller'
    name: 'pages'
    components:[
      type: "main"
      name: "main"
    ]
  ]

$ ->
  Luca.Collection.bootstrap( window.<%= javascript_namespace %>Bootstrap )
  window.<%= javascript_namespace %>App = new <%= javascript_namespace %>.Application()
  <%= javascript_namespace %>App.boot()
