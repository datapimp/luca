#= require_tree ./views/

Sandbox.Main = Luca.containers.ColumnView.extend
  el: '#viewport'
  
  layout: '20/60/20'

  name : 'viewport'

  components:[
    ctype: 'navigation'
    name : 'main_left_nav'
  ,
    ctype: 'card_view',
    name : 'main_content_view',
    components:[
      ctype: 'dashboard',
      dashboard_name: 'Dashboard One'
    ,
      ctype: 'dashboard',
      dashboard_name: 'Dashboard Two'
    ,
      ctype: 'dashboard'
      dashboard_name: 'Dashboard Three'
    ]
  ,
    ctype: 'navigation',
    name: 'main_right_nav'
  ],

  getContentView: ()->
    @components[1]

Luca.registry.addNamespace('Sandbox.views')
