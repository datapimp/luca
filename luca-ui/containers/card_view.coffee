Luca.CardView = Luca.Container.extend 
  className: 'luca-ui-card-view'

  activeComponent: 0

  components: []
  
  hideAll: ()->
  
  displayActive: ()->

  prepareComponents: ()->
    @hideAll()
    @displayActive()

