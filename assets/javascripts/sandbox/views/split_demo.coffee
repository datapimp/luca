Sandbox.views.SplitDemo = Luca.containers.SplitView.extend 
  name : 'split_demo'
  components:[
    height: 250 
    ctype: 'panel'
    description: 'Panel One Height 250'
  ,
    height: 125
    ctype: 'panel'
    description: 'Panel Two Height 125'
  ,
    ctype: 'panel'
    description: 'Panel Three Fill'
  ]
