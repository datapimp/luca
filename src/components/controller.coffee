controller = Luca.register        "Luca.components.Controller"
controller.extends                "Luca.containers.CardView"

controller.publicInterface
  default: (callback)->
    @navigate_to(@defaultPage || @defaultCard, callback)

  activePage: ()-> 
    @activeSection()

  # switch the active card of this controller
  # optionally passing an onActivation callback
  # will fire this callback in the context of
  # the currently active card
  navigate_to: (section, callback)->
    section ||= @defaultCard

    # activate is a method on Luca.containers.CardView which
    # selects a component and makes it visible, hiding any
    # other component which may be monopolizing the view at that time.

    # after activation it triggers a after:card:switch event
    # and if it is the first time that view is being activated,
    # it triggers a first:activation event which gets relayed to all
    # child components in that view
    @activate section, false, (activator, previous,current)=>
      @state.set(active_section: current.name )
      if _.isFunction( callback )
        callback.apply(current)

    # return the section we are navigating to
    @find(section)

controller.classMethods
  controllerPath: ()->
    list = []
    component = @

    while component
      component = component.getParent?()
      list.push( component.name ) if component?

    list

controller.defines
  additionalClassNames: 'luca-ui-controller'
  activeAttribute: "active-section"
  stateful: true

  initialize: (@options)->
    # let's phase out the 'card' terminology 
    # and 'section' while we're at it.  page is the word.
    @defaultCard ||= @defaultPage ||= @components[0]?.name || 0
    @defaultPage ||= @defaultCard 

    @defaultState ||= 
      active_section: @defaultPage

    Luca.containers.CardView::initialize.apply @, arguments

    throw "Controllers must specify a defaultCard property and/or the first component must have a name" unless @defaultCard?

    @_().each (component)->
      component.controllerPath = Luca.components.Controller.controllerPath

  each: (fn)->
    _( @components ).each (component)=> fn.call(@,component)

  activeSection: ()->
    @get("active_section")

  pageControllers: (deep=false)->
    @controllers.apply(@, arguments)

  controllers:(deep=false)->
    @select (component)->
      type = (component.type || component.ctype) 
      type is "controller" or type is "page_controller"

  availablePages: ()->
    @availableSections.apply(@, arguments)    

  availableSections: ()->
    base = {}
    base[ @name ] = @sectionNames()

    _( @controllers() ).reduce (memo,controller)=>
      memo[ controller.name ] = controller.sectionNames()  
      memo
    , base 

  pageNames: ()->
    @sectionNames()

  sectionNames: (deep=false)->
    @pluck('name')


