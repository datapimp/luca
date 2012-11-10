component = Luca.define         "Luca.containers.CardView"
component.extends               "Luca.core.Container"
#
# The CardView is a type of Container which has many sub-views
# which are only going to be visible one at a time.  A CardView
# allows you to @activate() its cards, navigate through them using
# @next(), @previous(), @cycle()
#
# Example:
#   cardView = new Luca.containers.CardView
#     cards:[
#       getter: "getCardOne"
#       type: "my_component"
#       name: "one"
#     ,
#       getter: "getCardTwo"
#       type: "my_component"
#       name: "two"
#     ]
#
#   cardView.activeComponent().name # => "one"
#   cardView.activate('two')
#   cardView.activeComponent().name # => "two"
#
component.defaults

  className: 'luca-ui-card-view-wrapper'

  activeCard: 0

  components: []

  hooks:[
    'before:card:switch',
    'after:card:switch'
  ]

  componentClass: 'luca-ui-card'
  generateComponentElements: true

  initialize: (@options)->
    Luca.core.Container::initialize.apply @,arguments
    @setupHooks(@hooks)
    @components ||= @pages ||= @cards 

  prepareComponents: ()->
    Luca.core.Container::prepareComponents?.apply(@, arguments)
    @componentElements().hide()
    @activeComponentElement().show()

  activeComponentElement: ()->
    @componentElements().eq( @activeCard )

  activeComponent: ()->
    @getComponent( @activeCard )

  customizeContainerEl: (containerEl, panel, panelIndex)->
    containerEl.style += if panelIndex is @activeCard then "display:block;" else "display:none;"

    containerEl

  atFirst: ()->
    @activeCard is 0

  atLast: ()->
    @activeCard is @components.length - 1

  next: ()->
    return if @atLast()
    @activate( @activeCard + 1)

  previous: ()->   
    return if @atFirst()
    @activate( @activeCard - 1)

  cycle: ()->
    nextIndex = if @atLast() then 0 else @activeCard + 1
    @activate( nextIndex )

  find: (name)-> Luca(name)

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

    unless current
      return

    unless silent
      @trigger "before:card:switch", previous, current
      previous?.trigger?.apply(previous,["before:deactivation", @, previous, current])
      current?.trigger?.apply(previous,["before:activation", @, previous, current])

      _.defer ()=>
        @$el.data( @activeAttribute || "active-card", current.name)

    @componentElements().hide()

    unless current.previously_activated
      current.trigger "first:activation"
      current.previously_activated = true

    @activeCard = index
    @activeComponentElement().show()

    unless silent
      @trigger "after:card:switch", previous, current
      previous.trigger?.apply(previous, ["deactivation", @, previous, current])
      current.trigger?.apply(current, ["activation", @, previous, current])


    if _.isFunction(callback)
      callback.apply @, [@,previous,current]