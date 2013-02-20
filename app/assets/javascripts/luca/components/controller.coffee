# The Controller is a special type of CardView that is used to provide structure to a Luca.Application.  Each
# component in the controller is expected to have a unique `@name` property.  The Application's router configuration
# will map URL / Hashbangs to the `@name`s of components that belong to the Application controller.  
#
# Applications which structure their 'pages' in controllers, or sections, will have the names of which
# section or page is active inside of its state model.  One example / common application structure we see:
#
#       application:
#         main_controller:
#           controller / section_one:
#             page_one
#             page_two
#             page_three
#           controller / section_two
#             page_alpha
#             page_bravo
#
# In the above example, the Application would attempt to route to page_one, and the state 
# of the application may look like:
#
#       application.activeSection() #=> 'section_one'
#       application.activeSubSection() # => 'page_one'
#       application.activePage() # => page_one
#
controller = Luca.register        "Luca.components.Controller"
controller.extends                "Luca.containers.CardView"

controller.publicConfiguration
  # If there is an active application, we will attempt to 
  # set the name of our currently activated page on the application's
  # state machine.  The attribute we will set can be configured by setting this value.
  tracker: "page"

  # We will set the name of the active page / section on our DOM element
  # The attribute we will set can be configured by setting this.
  activeAttribute: "active-section"
  stateful: true
  defaultPage: undefined
  defaultCard: 0

controller.publicMethods  
  # Navigate to the default ( or first ) component on this controller.
  # This will automatically get called upon rendering, so that it sets up
  # the proper state tracking, event binding, etc.
  default: (callback)->
    @navigate_to(@defaultPage || @defaultCard, callback)

  # Returns the name of the component which is currently active
  # on this controller.
  activePage: ()-> 
    @activeSection()

  # Navigate to a page on this controller by name.  If passed an optional
  # callback, the callback will be called within the context of the activated page.
  navigate_to: (page, callback)->
    page ||= @defaultCard

    @activate page, false, (activator, previous,current)=>
      if current.activatedByController is true
        current.trigger("on:controller:reactivation")
      else
        current.trigger("on:controller:activation")
        current.activatedByController = true

      @state.set(active_section: current.name )

      if @tracker? and app = @app || Luca.getApplication?()
        app.state.set(@tracker, current.name)

      Luca.key?.setScope( current.name )

      if _.isFunction( callback )
        callback.call(current)

    # return the component we are navigating to
    @find(page)

controller.classMethods
  # For each component we control, if there is a keyEvents property defined
  # then we will define a keymaster scope for that component's name, and setup
  # bindings as directed.  This is important because each time a controller 
  # activates a component, that component will attempt to change the scope of
  # the keymaster so that components becomes responsible for handling detected key events.
  setupComponentKeyEvents: ()->
    @_().each (component)->    
      if _.isObject(component.keyEvents) and component.name?
        Luca.util.setupKeymaster(component.keyEvents, component.name).on(component)    

  # The Controller Path is an array of the names of the controllers
  # a given component belongs to.  This method will get patched on to each
  # component that belongs to a controller.  It will always be bound to the instance
  # of the component itself.  Example:
  # 
  #       application.contains
  #         name: "main_controller"
  #         components: [
  #           name: "sub_controller"
  #           components:[
  #             name: "page"
  #           ]
  #         ]
  #
  # The @controllerPath() method for the component named page would be ['sub_controller','page'].
  # This will be used internally by the Application route builder, so that each of page's parent
  # controllers are activated in the proper order needed to make page visible.
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
    console.log "The availableSections()/availablePages() method will be removed in 1.0"
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


