$ do ->
  main = new Luca.containers.ColumnView
    el: '#viewport'
    name: 'viewport'
    layout: '20/80'
    components:[
      ctype: 'navigation'
      name:'demo_navigation'
    ,
      ctype: 'card_view'
      name: 'demo_container',
      components:[
        ctype : 'card_demo'
      ,
        ctype : 'column_demo'
      ,
        ctype : 'split_demo'
      ]
    ]

  main.render()
