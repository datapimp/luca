# Luca.Application 
#
# The Application class is the global state tracking mechanism
# for your single page application, as well as the entry point.
#
# By default it contains a main controller which is a Luca.components.Controller instance. 
#
# In a typical Luca application, the router will use the applications @navigate_to() method to switch
# from page to page on the main controller, or any other controllers nested inside of it.
#
# You would control flow when the controller fires activation events on the nested view components inside of it.
#
# Decoupling application control flow from the URL Fragment from Backbone.History and preventing
# your components from directly caring about the URL Fragment, allows you to build applications as
# isolated components which can run separately or nested inside of other applications.   

startHistory = ()-> Backbone.history.start()

_.def('Luca.Application').extends('Luca.containers.Viewport').with
  name: "MyApp"

  # The Application uses a Backbone.Model as a state machine, which
  # allows you to get / set attributes, persist them somewhere, and
  # most importantly to bind to change events of certain attributes.
  #
  # the @defaultState property will be the default attributes
  defaultState: {}

  # if autoBoot is set to true, the application will 
  # attempt to boot on document ready.
  autoBoot: false

  # automatically starts the @router if it exists, 
  # once the components for the application have 
  # been created.  Pass the event name you want to
  # listen for on this component before you start history
  autoStartHistory: "before:render"

  # we will create a collection manager singleton
  # by default unless otherwise specified. 
  useCollectionManager: true

  # to pass options to the collection manager, set the @collectionManager
  # hash which will get passed once the collection manager is created
  collectionManager: {}

  # by default we will use the standard collection manager which ships with
  # Luca.  If you would like to use your own extension of the collection manager
  # just pass a reference to the class you would like to use. 
  collectionManagerClass: "Luca.CollectionManager"

  # Luca plugin apps are apps which mount onto existing
  # luca apps, and will not have the behavior of a main
  # app which acts as a singleton
  plugin: false

  # by default, the application will use a controller
  # component, which is a card view container which shows
  # one view at a time.  this is useful for having an application
  # with several 'pages' so to speak
  useController: true

  # Key Handler
  # 
  # One responsibility of the application, since it is a viewport which monopolizes the entire screen
  # is to relay keypress events from the document, to whatever views are interested in responding to them.
  #
  # This functionality is disabled by default.
  useKeyHandler: false

  # You can configure key events by specifying them by their name, as it exists in Luca.keyMap. For example:
  #
  keyEvents: {} 

  # keyEvents
  #   keyup: keyUpHandler
  #   enter: enterHandler
  #   meta:
  #     up: metaUpHandler
  #   control:
  #     forwardslash: controlSlashHandler
  #     keyup: controlUpHandler
  #   control_meta:
  #     keydown: metaControlKeyDownHandler
  #
  #

  # applications have one component, the controller.
  # any components defined on the application class directly
  # will get wrapped by the main controller unless you
  # set useController = false
  components:[
    ctype: 'template'
    name: 'welcome'
    template: 'sample/welcome'
    templateContainer: "Luca.templates"
  ]

  initialize: (@options={})->
    app             = @
    appName         = @name
    alreadyRunning  = Luca.getApplication?()

    Luca.Application.instances ||= {}
    Luca.Application.instances[ appName ] = app
    
    Luca.containers.Viewport::initialize.apply @, arguments

    @state = new Luca.Model( @defaultState )

    # The Controller is the piece of the application that handles showing
    # and hiding 'pages' of the app.  The Application has a navigate_to
    # method which delegates to the controller, and allows you to navigate
    # to a given page, or component, by its name.  The controller integrates
    # with the state machine of the application
    @setupMainController()

    # The Collection Manager is responsible 
    @setupCollectionManager()

    # we will render when all of the various components
    # which handle our data dependencies determine that
    # we are ready
    @defer(()-> app.render()).until(@, "ready")

    # Set up the Backbone Router
    @setupRouter()

    # the keyHandler allows us to specify
    # keyEvents on our application with an API very similar
    # to the DOM events API for Backbone.View
    #
    # Example:
    #
    # keyEvents:
    #   meta:
    #     forwardslash: "altSlashHandler"
    if @useKeyRouter
      console.log "The useKeyRouter property is being deprecated. switch to useKeyHandler instead"
    
    @setupKeyHandler() if (@useKeyHandler is true or @useKeyRouter is true) and @keyEvents?

    # if the application is a plugin designed to modify the behavior
    # of another app, then don't claim ownership.  otherwise the most common
    # use-case is that there will be one application instance
    unless @plugin is true or alreadyRunning
      Luca.getApplication = (name)=> 
        return app unless name?
        Luca.Application.instances[ name ] 

    if @autoBoot
      if Luca.util.resolve(@name)
        throw "Attempting to override window.#{ @name } when it already exists"

      $ ->
        window[ appName ] = app 
        app.boot()

  # @activeView() returns a reference to the instance of the view
  # which is currently monopolizing the viewport.
  #
  # this will be whicever component is active on the controllers
  # nested within the main controller, if there are any, or the view
  # itself which is active on the main controller. 
  activeView: ()->
    if active = @activeSubSection()
      @view( active )
    else
      @view( @activeSection() )

  # Returns the name of the active component on the main controller 
  activeSection: ()->
    @get("active_section")

  # Returns the name of the active component on the nested controllers
  # on the main controller, if there is one.  These get set on the
  # state machine in response to card switch events on the controller component
  activeSubSection: ()->
    @get("active_sub_section")

  activePages: ()->
    @$('.luca-ui-controller').map (index,element)=> $(element).data('active-section')

  # boot should trigger the ready event, which will call the initial call
  # to render() your application, which will have a cascading effect on every
  # subcomponent in the view, recursively rendering everything which is set
  # to automatically render (i.e. any non-deferrable components ).
  #
  # you should use boot to fire up any dependent collections, manager, any
  # sort of data processing, whatever your application requires to run outside
  # of the views
  boot: ()->
    @trigger "ready"

  # delegate to the collection manager's get or create function.
  # use App.collection() to create or access existing collections
  collection: ()->
    @collectionManager.getOrCreate.apply(@collectionManager, arguments)

  get: (attribute)->
    @state.get(attribute)

  set: (attribute, value, options)->
    @state.set.apply(@state, arguments)

  view: (name)->
    Luca.cache(name)

  #### Navigation Hooks
  #
  # delegate to the main controller so that we can switch the active section
  navigate_to: (component_name, callback)->
    @getMainController().navigate_to(component_name, callback)

  getMainController: ()->
    return @components[0] if @useController is true
    Luca.cache('main_controller')

  # 
  keyHandler: (e)->
    return unless e and @keyEvents

    isInputEvent = $(e.target).is('input') || $(e.target).is('textarea')

    return if isInputEvent

    keyname = Luca.keyMap[ e.keyCode ]

    return unless keyname

    meta = e?.metaKey is true
    control = e?.ctrlKey is true

    source = @keyEvents
    source = if meta then @keyEvents.meta else source
    source = if control then @keyEvents.control else source
    source = if meta and control then @keyEvents.meta_control else source

    if keyEvent = source?[keyname]
      if @[keyEvent]?
        @[keyEvent]?.call(@)
      else
        @trigger(keyEvent, e, keyname)

  setupControllerBindings: ()->
    # any time the main controller card switches we should track
    # the active card on the global state chart
    @getMainController()?.bind "after:card:switch", (previous,current)=>
      @state.set(active_section:current.name)

    # any time the card switches on one of the sub controllers
    # then we should track the active sub section on the global state chart
    @getMainController()?.each (component)=>
      if component.ctype.match(/controller$/)
        component.bind "after:card:switch", (previous,current)=>
          @state.set(active_sub_section:current.name)       

  setupMainController: ()->
    if @useController is true
      definedComponents = @components || []

      @components = [
        ctype: 'controller'
        name: "main_controller"
        components: definedComponents
      ]

      @defer( @setupControllerBindings, false ).until("after:components")

  setupCollectionManager: ()->
    if @useCollectionManager is true
      @collectionManagerClass = Luca.util.resolve( @collectionManagerClass ) if _.isString( @collectionManagerClass )

      collectionManagerOptions = @collectionManagerOptions

      if _.isObject(@collectionManager) and not _.isFunction( @collectionManager?.get )
        collectionManagerOptions = @collectionManager
        @collectionManager = undefined

      if _.isString(@collectionManager)
        collectionManagerOptions = 
          name: @collectionManager

      @collectionManager = Luca.CollectionManager.get?( collectionManagerOptions.name )

      unless _.isFunction(@collectionManager?.get)
        @collectionManager = new @collectionManagerClass( collectionManagerOptions )    

  setupRouter: ()->
    app = @

    if _.isString( @router )
      routerClass = Luca.util.resolve(@router)
      @router = new routerClass({app})

    # if this application has a router associated with it
    # then we need to start backbone history on a certain event.
    # you can control which by setting the @startHistoryOn property
    if @router and @autoStartHistory
      @autoStartHistory = "before:render" if @autoStartHistory is true
      @defer(startHistory, false).until(@, @autoStartHistory)   

  setupKeyHandler: ()->
    return unless @keyEvents

    @keyEvents.control_meta ||= {}

    # allow for both meta_control, control_meta for the combo
    _.extend(@keyEvents.control_meta, @keyEvents.meta_control) if @keyEvents.meta_control

    handler = _.bind(@keyHandler, @)

    for keyEvent in (@keypressEvents || ["keydown"])
      $( document ).on( keyEvent, handler )

