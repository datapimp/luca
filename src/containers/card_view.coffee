Luca.containers.CardView = Luca.core.Container.extend 
  componentType: 'card_view'

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
  
  componentClass: 'luca-ui-card'

  beforeLayout: ()->
    @cards = _(@components).map (card,cardIndex) =>
      classes: @componentClass 
      style: "display:#{ (if cardIndex is @activeCard then 'block' else 'none' )}"
      id: "#{ @cid }-#{ cardIndex }"
 
  prepareLayout: ()->
    @card_containers = _( @cards ).map (card, index)=>
      $(@el).append Luca.templates["containers/basic"](card) 
      $("##{ card.id }")

  prepareComponents: ()-> 
    @components = _( @components ).map (object,index)=>
      card = @cards[index]
      object.container = "##{ card.id }"
      object
  
  activeComponent: ()-> 
    @getComponent( @activeCard )
  
  cycle: ()->
    nextIndex = if @activeCard < @components.length - 1 then @activeCard + 1 else 0
    @activate( nextIndex ) 

  find: (name)-> 
    @findComponentByName(name,true)
  
  firstActivation: ()->
    @activeComponent().trigger "first:activation", @, @activeComponent()

  activate: (index, silent=false, callback)->
    if _.isFunction(silent)
      silent = false
      callback = silent

    return if index is @activeCard

    previous = @activeComponent()
    current = @getComponent(index)

    if !current
      index = @indexOf(index)
      current = @getComponent( index )
    
    return unless current

    @trigger "before:card:switch", previous, current unless silent 
    
    _( @card_containers ).each (container)-> 
      container.trigger?.apply(container, ["deactivation", @, previous, current])
      container.hide()

    unless current.previously_activated
        current.trigger "first:activation"
        current.previously_activated = true

    $( current.container ).show()

    @activeCard = index

    unless silent
      @trigger "after:card:switch", previous, current 
      current.trigger?.apply(current, ["activation", @, previous, current])


    if _.isFunction(callback)
      callback.apply @, [@,previous,current]

Luca.register 'card_view', "Luca.containers.CardView"
