Sandbox.views.CardDemo = Luca.containers.CardView.extend
  name: 'card_demo'

  activeItem: 0

  events:
    "click .cycle" : "cycle"

  components:[
    ctype: 'slide'
    description: 'Slide One'
  ,
    ctype: 'slide'
    description: 'Slide Two'
  ,
    ctype: 'slide'
    description: 'Slide Three'
  ,
    ctype: 'slide'
    description: 'Slide Four'
  ]
