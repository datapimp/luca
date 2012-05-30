_.def("Luca.containers.CardView").extends("Luca.core.Container").with
  componentType: 'card_view'

  className: 'luca-ui-card-view-wrapper'

  activeCard: 0

  components: []

  hooks:[
    'before:card:switch',
    'after:card:switch'
  ]

  initialize: (@options)->
    Luca.core.Container::initialize.apply @,arguments
    @setupHooks(@hooks)

  componentClass: 'luca-ui-card'

  appendContainers: true

  activeComponentElement: ()->
    @componentElements().eq( @activeCard )

  activeComponent: ()->
    @getComponent( @activeCard )

  customizeContainerEl: (containerEl, panel, panelIndex)->
    containerEl.style += if panelIndex is @activeCard then "display:block;" else "display:none;"

    containerEl

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

    unless silent
      @trigger "before:card:switch", previous, current
      previous?.trigger?.apply(previous,["before:deactivation", @, previous, current])
      current?.trigger?.apply(previous,["before:activation", @, previous, current])

    @$(">.#{ @componentClass }").hide()

    unless current.previously_activated
      current.trigger "first:activation"
      current.previously_activated = true

    @activeComponentElement().show()
    @activeCard = index

    unless silent
      @trigger "after:card:switch", previous, current
      previous.trigger?.apply(previous, ["deactivation", @, previous, current])
      current.trigger?.apply(current, ["activation", @, previous, current])


    if _.isFunction(callback)
      callback.apply @, [@,previous,current]