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
component = Luca.define         "Luca.containers.CardView"
component.extends               "Luca.Container"

component.publicConfiguration
  activeCard: 0
  components: []

component.classInterface
  # When the activate method is called and passed a callback
  # what context should we run that callback in?  Default is
  # to call the callback in the context of the component that
  # is currently being activated
  activationContext: "current"

component.privateConfiguration
  # Will automatically call beforeCardSwitch and afterCardSwitch
  # methods if they exist on this view.  These events will be triggered
  # in response to a call to @activate()
  hooks:[
    'before:card:switch',
    'after:card:switch'
  ]

  # Which css class should we apply to each of the cards
  componentClass: 'luca-ui-card'

  # Should we generate elements to append each component?
  generateComponentElements: true

component.publicMethods
  # Returns true if at the first 
  atFirst: ()->
    @activeCard is 0

  # Returns true if we're at the last card
  atLast: ()->
    @activeCard is @components.length - 1

  # Activate the next component.  If at the last, do nothing.
  next: ()->
    return if @atLast()
    @activate( @activeCard + 1)

  # Activate the previous component.  If at the first, do nothing.
  previous: ()->   
    return if @atFirst()
    @activate( @activeCard - 1)

  # Activates the next component after the current one.
  # If at the last component, it will activate the first.
  cycle: ()->
    nextIndex = if @atLast() then 0 else @activeCard + 1
    @activate( nextIndex )

  # Find a direct component on this card by its name.
  find: (name)-> 
    _( @components ).detect (c)-> 
      c.name is name

  # Activates the component at the specified index.  You may optionally specify
  # the name of the component you wish to activate.  You can pass false as your second
  # argument, to disable the event handling that occurs when you activate a card on this container.
  # If you pass a callback function to the activate method, that callback will be executed within
  # the context of the activated component. 
  activate: (index, silent=false, callback)->
    if _.isFunction(silent)
      silent = false
      callback = silent

    return if index is @activeCard

    previous = @activeComponent()

    current = @getComponent(index)

    if !current?
      index = @indexOf(index) 
      return unless current = @getComponent(index)

    unless silent is true
      @trigger "before:card:switch", previous, current
      previous?.trigger "before:deactivation", @, previous, current
      current?.trigger "before:activation", @, previous, current

      _.defer ()=>
        @$el.data( @activeAttribute || "active-card", current.name)

    @componentElements().hide()

    unless current.previously_activated is true
      if current.rendered is true
        current.trigger "first:activation"
      else
        current.once "after:render", ()->
          current.rendered = true
          current.trigger("first:activation")
      current.previously_activated = true

    @activeCard = index 
    @activeComponentElement().show()

    unless silent is true
      @trigger "after:card:switch", previous, current
      previous?.trigger "deactivation", @, previous, current
      current?.trigger "activation", @, previous, current

    activationContext = @

    if Luca.containers.CardView.activationContext is "current"
      activationContext = current

    if _.isFunction(callback)
      callback.apply activationContext, [@,previous,current]

component.privateMethods
  initialize: (@options)->
    @components ||= @pages ||= @cards 
    Luca.Container::initialize.apply @,arguments
    @setupHooks(@hooks)
    @defer( @simulateActivationEvent, @ ).until("after:render")

  # Simulates the activation event being triggered on the
  # active component that gets rendered inside of this card view. 
  simulateActivationEvent: ()->
    c = @activeComponent()

    if c? and @$el.is(":visible")
      c?.trigger "activation", @, c, c 
      if !c.previously_activated
        c.trigger "first:activation"
        c.previously_activated = true

  prepareComponents: ()->
    Luca.Container::prepareComponents?.apply(@, arguments)
    @componentElements().hide()
    @activeComponentElement().show()

  activeComponentElement: ()->
    @componentElements().eq( @activeCard )

  activeComponent: ()->
    @getComponent( @activeCard )

  customizeContainerEl: (containerEl, panel, panelIndex)->
    containerEl.style += if panelIndex is @activeCard then "display:block;" else "display:none;"

    containerEl



  # The first time activate event is triggered on this component
  # the @firstActivation hook is responsible for relaying that event
  # to our @activeComponent() so that it knows it has been activated.
  firstActivation: ()->
    if activeComponent = @activeComponent()
      activeComponent.trigger "first:activation", @, @activeComponent()

component.register()
