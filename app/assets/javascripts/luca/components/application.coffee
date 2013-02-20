# The `Luca.Application` is the main entry point into your Application.
# It acts as a global state machine, page controller, and router, in addition
# to providing access to other singletons such as the CollectionManager, and SocketManager.
# 
# The structure of a common `Luca.Application` is that it contains one or many `Pages` which
# themselves are made up of the components of your application.  One `Page` is visible at a time
# and which page is displayed is managed by an instance of the `Luca.components.Controller` class.
#
# ### Example Configuration  
#     application = Luca.register     "App.Application"
#     application.extends             "Luca.Application"
#
#     application.defines
#       name: "MyApplication"
#       routes: 
#         "" : "home"
#         "standard/backbone/style/:route" : "name_of_page#name_of_method"
#
#       components:[
#         name: "home"
#       ,
#         type: "your_view"
#         name: "name_of_page"
#         name_of_method: (routeParam)->
#           @doSomethignToSetupYourPageWithThePassed(routeParam)  
#       ]
#
#   App.onReady ()->
#     window.MyApp = new App.Application();
#     window.MyApp.boot() 
#
# #### @routes and pages
#
# In the above example, our application contains two pages, one with the name 'home'
# and one with the name 'name_of_page'.  It also specifies a `@routes` property which
# is identical to the configuration you would see in a standard `Backbone.Router`.
#
# Whenever the route matches 'standard/backbone/style/route' the `App.Application` instance
# will send an instruction to the `Luca.components.Controller` to `activate` the page whose name
# is passed in the `@routes` config.
# 
# If that page defines a method called `@routeHandler` it will be called with the parameters
# from the route.  In the `@routes` config you can specify your own route handler method
# by using the rails style `page_name#action` and it will call the `@action` method instead
# on the view named `page_name`.
#
# The `App.Application` instance, also accessible by `window.MyApp`, or through the helper `App()`
# or `Luca.getApplication()` maintains the state of which page is active.  You can access this
# in your code by calling `App().activePage()`.
#
# #### Controllers
# 
# The `Luca.components.Controller` is a special type of component which contains 
# other views, or `Pages` which only one will be visible at any given time.  It expects
# that each page will have its own unique `@name` property.  A `Luca.components.Controller` can
# contain other controllers, providing you with a way of structuring your application layout
# in an organized, hierarchal fashion. 
#
# By default, any `Luca.Application` will have one `Luca.components.Controller` automatically
# created named 'main_controller' which is accessible by `MyApp.getMainController()`.  Any
# components you define on the `Luca.Application` instance will be wrapped by the main controller
# automatically unless you specify `@useController = false` in your Application component definition.
application = Luca.register       "Luca.Application"
application.extends               "Luca.containers.Viewport"

application.triggers              "controller:change",
                                  "action:change"

application.publicConfiguration
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

  # use Backbone.history push state?
  pushState: false

  # If the server renders the entire page
  # first, then we should start history silently.
  startHistorySilently: false

  # In cases where we use pushState, we need to tell
  # the application what the actual root url of our app
  # is, since everything after would otherwise be a hashbang 
  rootUrl: undefined
  
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

  # If your Application does not behave as a Viewport that monopolizes
  # its entire element, but instead you wish to render the application
  # controller to a specific element,  you can specify the css selector of that element.
  mainControllerContainer: undefined

  # keyEvents understands the following modifiers:
  # - `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, and `⌘`.
  # The following special keys can be used for shortcuts:
  # `backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`,
  # `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`
  # and `f1` through `f19`.
  #
  # **Note**: This requires the keymaster.js library to be loaded.  This library is included
  # with the bundled dependencies that ship with Luca.
  #
  # Example:
  #       application.configuration
  #         keyEvents:
  #           '⌘+r, ctrl+r': "keyHandlerFunction"
  #         keyHandlerFunction: -> alert 'something + r was pressed'
  keyEvents: {}

  # create getter methods for the various roles in the application's components on the application itself.
  createRoleBasedGetters: false

  # create an instance of Luca.SocketManager which is a Backbone.Events style abstraction that
  # sits on top of services like faye, or socket.io 
  useSocketManager: false
  socketManagerOptions: {}

application.publicMethods
  # Creating your Application and all of its components and pages is 
  # generally as simple as creating an instance of your Application class:
  #       Luca.onReady ()->
  #         window.MyApp = new Luca.Application() 
  #         window.MyApp.boot()
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
  # which is currently monopolizing the viewport.  In an application
  # which uses a controller hierarchy, it will be the last controller
  # has activated one of its pages.
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
    console.log "This method will be getting removed in Luca 1.0"
    @$('.luca-controller').map (index,element)=> $(element).data('active-section')

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

  # Get an attribute from our internal state machine
  get: (attribute)->
    @state.get(attribute)

  # Set an attribute on our internal state machine
  set: (attribute, value, options)->
    @state.set.apply(@state, arguments)

  # Access a named view by its @name property. 
  view: (name)->
    Luca.cache(name)

  # delegate to the main controller so that we can switch the active section
  # easily directly from the application.  If passed a callback, this function
  # will get called in the context of the activated component.  This method is useful
  # inside of custom route handlers if you are manually defining them on a `Backbone.Router`
  # instead of using the built in `@routes` helper.
  navigate_to: (component_name, callback)->
    @getMainController().navigate_to(component_name, callback)

application.privateMethods
  # Any time the Application's main controller changes its active page
  # we track the name of that page ( aka section ) on our state machine.
  # If the active page on the main controller is another controller component,
  # then we will track that controller's active component as our active sub section.
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

  # A typical structure for a Luca.Application is that it will act as a `Viewport` which
  # monopolizes the entire top level element in your dom ( either the body tag, or a top 
  # level element just underneath it)  This `Viewport` is an abstract element where we can
  # setup global event bindings, like keyBindings and such.  The `Viewport` will generally
  # contain a `Luca.components.Controller` instance called "main_controller" that is responsible
  # for displaying the active page for a given route. 
  setupMainController: ()->
    if @useController is true
      definedComponents = @components || []
      base =  
        type: 'controller'
        name: "main_controller"
        role: "main_controller"
        components: definedComponents

      if @mainControllerContainer?
        _.extend(base, container: @mainControllerContainer)

      @components = [base]
    
    @getMainController = ()=> 
      @findComponentByRole('main_controller')

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

  # If our application is configured with a `@socketManagerOptions` property,
  # it will create a socket manager instance for us automatically.  It won't
  # start the socket manager process until the `@boot()` method is called on the application. 
  setupSocketManager: ()->
    return if _.isEmpty(@socketManagerOptions)
    _.extend(@socketManagerOptions, autoStart: false)

    @socket = new Luca.SocketManager(@socketManagerOptions) 
 
  # Sets up an instance of the Backbone.Router, and sets up the
  # call to start the history tracking API once the appropriate
  # application events have been fired. 
  setupRouter: ()->
    return if not @router? and not @routes?

    routerClass = Luca.Router
    routerClass = Luca.util.resolve(@router) if _.isString(@router)

    routerConfig = routerClass.prototype
    routerConfig.routes ||= {}
    routerConfig.app = @

    if _.isObject( @routes )
      for routePattern, endpoint of @routes
        if endpoint.match(/\ /)
          [page, action] = endpoint.split(' ')
        else if endpoint.match(/\#/)
          [page, action] = endpoint.split('#')

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

  # The default implementation of setupKeyHandler is kept around for backward
  # compatibility purposes.  In Luca 1.0 we will be using keymaster.js for our
  # key binding setup. 
  setupKeyHandler: ()->
    return unless @keyEvents

    @keyEvents.control_meta ||= {}

    # allow for both meta_control, control_meta for the combo
    _.extend(@keyEvents.control_meta, @keyEvents.meta_control) if @keyEvents.meta_control

    handler = _.bind(@keyHandler, @)

    for keyEvent in (@keypressEvents || ["keydown"])
      $( document ).on( keyEvent, handler )

application.classMethods
  instances:{}

  # An application inspection helper, it describes the structure of this application's
  # controlled components.  For an application that consists of multiple nested controllers
  # it will recursively walk each controller and build a tree of the various pages / controlers.
  pageHierarchy: ()->
    app             = Luca()
    mainController  = app.getMainController()

    getTree = (node)->  
      return {} unless node.components? or node.pages?

      # recursively walks the pages on a controller
      _( node.components || node.pages ).reduce (memo, page)->
        memo[ page.name ] = page.name
        memo[ page.name ] = getTree(page) if page.navigate_to?
        memo
      , {}

    getTree( mainController )

  # Registers this instance of the Luca.Appliction
  # so that it is available via the Luca() helper, or through
  # a call to Luca.Application.get().
  registerInstance: (app)->
    Luca.Application.instances[ app.name ] = app

  # If the keymaster library is present, swap out the 
  # setupKeyHandler method with something which will enable 
  # keymaster support instead of our legacy system.
  checkForKeymaster: ()->
    if window?.key?.noConflict
      Luca.key = window.key.noConflict()

      Luca.Application::setupKeyHandler = ()->
        return unless @keyEvents
        Luca.util.setupKeymaster(@keyEvents, "all").on(@)

  # This is used internally by the Application as it sets up
  # the @routes property and uses it to configure the Luca.Router
  # instance for your app.  It allows you to specify the page you want
  # to monopolize the viewport in your application by name, and regardless
  # of how deeply nested that page may be among your controllers, it will know 
  # what to do.  
  routeTo: (pages...)->
    last = _( pages ).last()
    first = _( pages ).first()

    callback = undefined    
    specifiedAction = undefined

    routeHelper = (args...)->
      path = @app || Luca()
      index = 0

      # we can specify a page by name, and not have to know its full path.
      if pages.length is 1 and target = Luca(first)
        pages = target.controllerPath()

      # when we do know the full path
      for page in pages when _.isString(page)
        nextItem = pages[++index]
        target = Luca(page)

        if page is last 
          if specifiedAction? and not target[specifiedAction]? and not target.routeHandler?
            console.log "You specified a component action to call when a route matches, but it does not exist on the component"

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
    Backbone.history.start
      pushState: @pushState
      rootUrl: @rootUrl
      silent: @startHistorySilently

application.afterDefinition ()->
  Luca.routeHelper = Luca.Application.routeTo
  Luca.Application.checkForKeymaster()

application.register()