Luca.components.CardLayout = Luca.components.Layout.extend 
  activeItem: 0
  
  items: []

  setActiveItem: (item)->
    console.log "Setting Active Item"

  initialize: (@options)->
    console.log("Creating a Card Layout", @options)
