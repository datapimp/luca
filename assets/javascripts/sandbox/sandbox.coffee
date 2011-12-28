$ do ->
  main = new Luca.containers.ColumnView
    el: '#viewport'
    name: 'viewport'
    layout: '20/80'
    components:[
      ctype: 'navigation'
      name:'demo_navigation'
    ,
      ctype: 'card_demo'
      name: 'card_demo'
    ]

  main.render()
