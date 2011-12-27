Sandbox.Main = Luca.containers.ColumnView.extend
  el: '#viewport'
  name : 'viewport'
  layout: '20/80'
  components:[
    ctype: 'navigation'
  ,
    ctype: 'card_view',
    components:[
      ctype: 'column_demo'
    ]
  ]

Luca.registry.addNamespace 'Sandbox.views'
