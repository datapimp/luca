controller = Luca.register        "Luca.components.Controller"
controller.extends                "Luca.containers.CardView"

controller.publicInterface
  default: (callback)->
    @navigate_to(@defaultPage || @defaultCard, callback)

  activePage: ()-> 
    @activeSection()

  navigate_to: (section, callback)->
    section ||= @defaultCard

    @activate section, false, (activator, previous,current)=>
      if current.activatedByController is true
        current.trigger("on:controller:reactivation")
      else
        current.trigger("on:controller:reactivation")
        current.trigger("on:controller:activation")
        current.activatedByController = true

      @state.set(active_section: current.name )

      Luca.key?.setScope( current.name )

      if _.isFunction( callback )
        callback.call(current)

    # return the section we are navigating to
    @find(section)

controller.classMethods
  setupComponentKeyEvents: ()->
    @_().each (component)->    
      if _.isObject(component.keyEvents) and component.name?
        Luca.util.setupKeymaster(component.keyEvents, component.name).on(component)    

  controllerPath: ()->
    component = @
    
    list = [component.name]
    atBase = false

    while component and not atBase
      component = component.getParent?()
      atBase = true if component?.role is "main_controller"
      list.push( component.name ) if component? and not atBase

    list.reverse()

controller.afterDefinition ()->
  Luca.View::hooks.push "on:controller:activation"

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

    @on "after:render", @default, @
    @on "before:render", Luca.components.Controller.setupComponentKeyEvents, @

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


