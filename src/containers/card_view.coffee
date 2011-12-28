Luca.containers.CardView = Luca.core.Container.extend 
  component_type: 'card_view'

  className: 'luca-ui-card-view-wrapper'

  activeCard: 0

  components: []

  hooks:[
    'before:card:switch',
    'after:card:switch'
  ]
  
  initialize: (@options)->
    Luca.core.Container.prototype.initialize.apply @,arguments
    @setupHooks(@hooks)
  
  component_class: 'luca-ui-card'

  beforeLayout: ()->
    @cards = _(@components).map (card,cardIndex) =>
      class: @component_class 
      style: "display:#{ (if cardIndex is @activeCard then 'block' else 'none' )}"
      id: "#{ @cid }-#{ cardIndex }"
 
  prepare_layout: ()->
    _( @cards ).each (card)=>
      $(@el).append "<div id='#{ card.id }' style='#{ card.style }' class='#{ card.class }' />"

  prepare_components: ()-> 
    @assignToCards()
  
  assignToCards: ()->
    @components = _( @components ).map (object,index)=>
      card = @cards[index]
      object.container = object.renderTo = "##{ card.id }"
      object
  
  activeComponent: ()-> 
    @getComponent( @activeCard )
  
  cycle: ()->
    nextIndex = if @activeCard < @components.length - 1 then @activeCard + 1 else 0
    @activate( nextIndex ) 

  activate: (index)->
    console.log "Activating #{ index }"
    return if index is @activeCard

    previous = @activeComponent()
    nowActive = @getComponent(index)

    @trigger "before:card:switch", previous, nowActive 
    
    $('.luca-ui-card', @el).hide()
    $( nowActive.container ).show()

    @activeCard = index

    @trigger "after:card:switch", previous, nowActive 

Luca.register 'card_view', "Luca.containers.CardView"
