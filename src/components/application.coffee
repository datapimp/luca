# Luca.Application 
#
# The Application class is the global state tracking mechanism
# for your single page application, as well as the entry point.
#
# By default it contains a main controller which is a Luca.components.Controller instance. 
#
# In a typical application, the router will use the applications @navigate() method to switch
# from page to page on the main controller, or any other controllers nested inside of it.
# Control flow when the controller fires activation events on the nested view components inside of it.
#
# Decoupling application control flow from the URL Fragment from Backbone.History and preventing
# your components from directly caring about the URL Fragment, allows you to build applications as
# isolated components which can run separately or nested inside of other applications.   
#
#
#
_.def('Luca.Application').extends('Luca.containers.Viewport').with
  # if autoBoot is set to true
  autoBoot: false
  name: "MyApp"

  # automatically starts the @router
  # if it exists, once the components
  # for the application have been created
  autoStartHistory: true

  # we will create a collection manager singleton
  # by default unless otherwise specified
  useCollectionManager: true

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

  #### Nested Components

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

    if @useController is true
      definedComponents = @components || []

    @components = [
      ctype: 'controller'
      name: "main_controller"
      components: definedComponents
    ]

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

    @state = new Luca.Model( @defaultState )

    # we will render when all of the various components
    # which handle our data dependencies determine that
    # we are ready
    @defer(()-> app.render()).until(@, "ready")

    # the keyRouter allows us to specify
    # keyEvents on our application with an API very similar
    # to the DOM events API for Backbone.View
    #
    # Example:
    #
    # keyEvents:
    #   meta:
    #     forwardslash: "altSlashHandler"
    @setupKeyRouter() if @useKeyRouter is true and @keyEvents?

    if _.isString( @router )
      routerClass = Luca.util.resolve(@router)
      @router = new routerClass({app})

    # if this application has a router associated with it
    # then we need to start backbone history on a certain event.
    # you can control which by setting the @startHistoryOn property
    if @router and @autoStartHistory
      startHistory = ()-> Backbone.history.start()
      @defer(startHistory, false).until(@, (@startHistoryOn||"before:render") )

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

  activeView: ()->
    if active = @activeSubSection()
      @view( active )
    else
      @view( @activeSection() )

  # this presumes one controller, with many nested controllers
  # but only that deep.  this is more than good enough for most
  # apps I have built, but might need to use a different strategy
  # for tracking what is active if you need something else
  activeSubSection: ()->
    @get("active_sub_section")

  activeSection: ()->
    @get("active_section")

  activePages: ()->
    @$('.luca-ui-controller').map (index,element)=> $(element).data('active-section')

  afterComponents: ()->
    Luca.containers.Viewport::afterComponents?.apply @, arguments

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

  getMainController: ()->
    return @components[0] if @useController is true
    Luca.cache('main_controller')

  set: (attributes)->
    @state.set(attributes)

  view: (name)->
    Luca.cache(name)

  #### Navigation Hooks
  #
  # delegate to the main controller so that we can switch the active section
  navigate_to: (component_name, callback)->
    @getMainController().navigate_to(component_name, callback)

  setupKeyRouter: ()->
    return unless @keyEvents

    @keyEvents.control_meta ||= {}

    # allow for both meta_control, control_meta for the combo
    _.extend(@keyEvents.control_meta, @keyEvents.meta_control) if @keyEvents.meta_control

    router = _.bind(@keyRouter, @)

    $( document ).keydown( router )

  #### Key Router
  #
  # TODO: Define a syntax for mapping combinations of meta, control, and keycodes
  # to some sort of method delegation system that the application handles.
  keyRouter: (e)->
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
        @trigger(keyEvent)