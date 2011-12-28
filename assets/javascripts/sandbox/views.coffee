Sandbox.Main = Luca.containers.ColumnView.extend
  el: '#viewport'
  name : 'viewport'
  layout: '20/80'
  components:[
    ctype: 'navigation'
  ,
    ctype: 'card_view',
    name: 'demo_container'
    components:[
      ctype: 'column_demo'
      debugMode: 'verbose'
    ]
  ]

Luca.registry.addNamespace 'Sandbox.views'
