# Luca.Application
#
# The Application class is the global state tracking mechanism
# for your single page application, as well as the entry point.
application = Luca.register       "Luca.Application"
application.extends               "Luca.containers.Viewport"

application.triggers              "controller:change",
                                  "action:change"

application.publicInterface
  name: "MyApp"

  # The Application uses a Backbone.Model as a state machine, which
  # allows you to get / set attributes, persist them somewhere, and
  # most importantly to bind to change events of certain attributes.
  #
  # the @defaultState property will be the default attributes
  stateful: {}

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
    type: 'template'
    name: 'welcome'
    template: 'sample/welcome'
    templateContainer: "Luca.templates"
  ]

  # DOCUMENT
  createRoleBasedGetters: false
  useSocketManager: false
  socketManagerOptions: {}

  # Don't create getters on this component
  # for the nested components
  initialize: (@options={})->
    app             = @
    appName         = @name
    alreadyRunning  = Luca.getApplication?()

    Luca.Application.registerInstance(@)

    Luca.concerns.StateModel.__initializer.call(@)

    # The Collection Manager is responsible for managing instances 
    # of collections, usually to guarantee only a single collection is
    # instantiated for a given resource, to maintain 'authoritative' 
    # representations of models.
    @setupCollectionManager()

    # Socket Manager provides a bridge between remote pub/sub providers and 
    # the backbone.events interface on various components in the system.
    @setupSocketManager()

    Luca.containers.Viewport::initialize.apply @, arguments

    # The Controller is the piece of the application that handles showing
    # and hiding 'pages' of the app.  The Application has a navigate_to
    # method which delegates to the controller, and allows you to navigate
    # to a given page, or component, by its name.  The controller integrates
    # with the state machine of the application
    @setupMainController() if @useController is true 
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
    if (@useKeyHandler is true or @useKeyRouter is true) and @keyEvents?
      @setupKeyHandler() 

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

    Luca.trigger "application:available", @

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
    for service in [@collectionManager, @socket, @router]
      service?.trigger("ready")

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

application.privateInterface
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
      if @[keyEvent]? and _.isFunction(@[keyEvent])
        @[keyEvent]?.call(@)
      else
        @trigger(keyEvent, e, keyname)

  setupControllerBindings: ()->
    app = @
    # any time the main controller card switches we should track
    # the active card on the global state chart
    @getMainController()?.bind "after:card:switch", (previous,current)=>
      @state.set(active_section:current.name)
      app.trigger "controller:change", previous.name, current.name

    # any time the card switches on one of the sub controllers
    # then we should track the active sub section on the global state chart
    @getMainController()?.each (component)=>
      type = component.type || component.ctype
      if type.match(/controller$/)
        component.bind "after:card:switch", (previous,current)=>
          @state.set(active_sub_section:current.name)
          app.trigger "action:change", previous.name, current.name

  setupMainController: ()->
    if @useController is true
      definedComponents = @components || []

      @components = [
        type: 'controller'
        name: "main_controller"
        role: "main_controller"
        components: definedComponents
      ]
      
      @getMainController = ()=> @findComponentByRole('main_controller')

      @defer( @setupControllerBindings, false ).until("after:components")

  setupCollectionManager: ()->
    return unless @useCollectionManager is true

    return if @collectionManager? and @collectionManager?.get?

    if _.isString( @collectionManagerClass )
      @collectionManagerClass = Luca.util.resolve( @collectionManagerClass )

    collectionManagerOptions = @collectionManagerOptions || {}

    # if the collectionManager property is present, and it
    # isn't a reference to a collection manager instance, then
    # it is being used as a configuration hash for when we do create
    # the collection manager. so let's stash it.
    if _.isObject(@collectionManager) and not _.isFunction( @collectionManager?.get )
      collectionManagerOptions = @collectionManager
      @collectionManager = undefined

    # if the collection manager property is a string, then it is a
    # reference to a name of a collection manager to use.  so let's
    # stash it
    if _.isString(@collectionManager)
      collectionManagerOptions =
        name: @collectionManager


    # let's try and get the collection manager by name if we can
    @collectionManager = Luca.CollectionManager.get?( collectionManagerOptions.name )

    # if we can't, then we will have to create one ourselves
    unless _.isFunction(@collectionManager?.get)
      collectionManagerOptions.autoStart = false
      @collectionManager = new @collectionManagerClass( collectionManagerOptions )

  setupSocketManager: ()->
    return if _.isEmpty(@socketManagerOptions)
    _.extend(@socketManagerOptions, autoStart: false)

    @socket = new Luca.SocketManager(@socketManagerOptions) 

  setupRouter: ()->
    return if not @router? and not @routes?

    routerClass = Luca.Router
    routerClass = Luca.util.resolve(@router) if _.isString(@router)

    routerConfig = routerClass.prototype
    routerConfig.routes ||= {}
    routerConfig.app = @

    if _.isObject( @routes )
      for routePattern, endpoint of @routes
        [page, action] = endpoint.split(' ')
        fn = _.uniqueId(page)
        routerConfig[fn] = Luca.Application.routeTo(page).action(action)
        routerConfig.routes[ routePattern ] = fn

    @router = new routerClass(routerConfig) 

    # if this application has a router associated with it
    # then we need to start backbone history on a certain event.
    # you can control which by setting the @startHistoryOn property
    if @router and @autoStartHistory
      @autoStartHistory = "before:render" if @autoStartHistory is true
      @defer( Luca.Application.startHistory, false).until(@, @autoStartHistory)

  setupKeyHandler: ()->
    return unless @keyEvents

    @keyEvents.control_meta ||= {}

    # allow for both meta_control, control_meta for the combo
    _.extend(@keyEvents.control_meta, @keyEvents.meta_control) if @keyEvents.meta_control

    handler = _.bind(@keyHandler, @)

    for keyEvent in (@keypressEvents || ["keydown"])
      $( document ).on( keyEvent, handler )

application.classInterface
  instances:{}

  # Public: For purely informational purposes, describes the structure
  # of the Application's controller views, and their nested controllers views.
  pageHierarchy: ()->
    app = Luca()
    mainController = app.getMainController()

    getTree = (node)->  
      return {} unless node.components? or node.pages?

      _( node.components || node.pages ).reduce (memo, page)->
        memo[ page.name ] = page.name
        memo[ page.name ] = getTree(page) if page.navigate_to?
        memo
      , {}

    getTree( mainController )

  # Private: registers the instance of the Luca.Appliction
  # so that it is available via the Luca() helper, or through
  # a call to Luca.Application.get() or Luca.getAppliction()
  registerInstance: (app)->
    Luca.Application.instances[ app.name ] = app

  # Private: Recursively navigates down the controller page hierarchy
  # to the page you specify by name.  You can specify the 
  # method which is to be called at the end of the chain.
  # 
  # This is used internally by the Application as it sets up
  # the @routes property and uses it to configure the Luca.Router
  # instance for your app.
  routeTo: (pages...)->
    last = _( pages ).last()
    first = _( pages ).first()

    callback = undefined    
    specifiedAction = undefined

    routeHelper = (args...)->
      path = @app || Luca()
      index = 0

      # we can specify a page by name, and not have to know its full path
      if pages.length is 1 and target = Luca(first)
        pages = target.controllerPath()

      # when we do know the full path
      for page in pages when _.isString(page)
        nextItem = pages[++index]
        target = Luca(page)

        if page is last 
          callback = if specifiedAction? and target[ specifiedAction ]?
            _.bind(target[ specifiedAction ], target)
          else if target.routeHandler?
            target.routeHandler  

        callback ||= if _.isFunction(nextItem)
          _.bind(nextItem, target)
        else if _.isObject(nextItem) 
          if action = nextItem.action and target[action]?
            _.bind(target[action], target)

        path = path.navigate_to page, ()->
          callback?.apply(target, args)

    routeHelper.action = (action)->
      specifiedAction = action
      routeHelper

    routeHelper

  # Public: you can override Luca.Application.startHistory to 
  # modify how Backbone.history.start is called.  This will get called
  # by the Application instance in response to the @autoStartHistory property.
  startHistory: ()->
    Backbone.history.start()



application.afterDefinition ()->
  Luca.routeHelper = Luca.Application.routeTo

application.register()