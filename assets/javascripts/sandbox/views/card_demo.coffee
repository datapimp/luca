Sandbox.views.CardDemo = Luca.containers.CardView.extend
  activeItem: 0

  events:
    "click .cycle" : "cycle"

  cycle: ()->
    console.log "Click Cycle"
 
  components:[
    ctype: 'slide'
    name: 'Slide One'
  ,
    ctype: 'slide'
    name: 'Slide Two'
  ,
    ctype: 'slide'
    name: 'Slide Three'
  ,
    ctype: 'slide'
    name: 'Slide Four'
  ]
