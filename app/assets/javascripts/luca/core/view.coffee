# `Luca.View` is an enhanced `Backbone.View` which provides common patterns for view components,
# and various helper methods and configuration conventions.
#
# #### Instance caching / naming
#
# If you provide a `@name` property to your views, they will be accessible by that property
# using the Application helper.    
#
#       view = new Luca.View(name:"my_view")
#       Luca("my_view") === view
#
# #### CSS @className conventions
#  
# In order to make it easier to componentize your views, extending from `Luca.View` will
# enable CSS class based inheritance based on the names of the view class.
#
# ##### For Example:
#
#       base = Luca.register  "App.views.BaseViewClass"
#       base.extends          "Luca.View"
#       base.defines
#         className: "some-other-class"
#
#       child = Luca.register "App.views.ChildViewClass"
#       child.extends         "App.views.BaseViewClass"
#       child.defines
#         myClasses: ()->
#           @$el.attr('class') 
#     
#     view = new App.views.ChildViewClass()
#     view.myClasses() #=> "app-base-view-class app-child-view-class some-other-class"
#
# This establishes a convention for css class names, and allows you to componetize your css
# along with the component by joining them based on the name of your view class.  When using
# Sass scoping / nesting it fits very nicely together.
#
# #### Internal state machine
# 
# Any `Luca.View` class which defines a `@stateful` property will automatically generate a
# `@state` model that can be used to get/set attributes on the view as well as bind to change events on these attributes.  
# 
# This gives your views a dedicated place to store state, and you can bind to your data models separately
# and update the DOM without confusing the two. 
# 
#       statefulView = Luca.register    "App.views.StatefulView"
#       statefulView.extends            "Luca.View"
#
#       statefulView.defines
#         # Passing an object allows you to set default values on the @state model.
#         stateful:
#           attribute: "value"
#
#         # Whenever the attribute specified changes, call the specified method.
#         stateChangeEvents:
#           "attribute" : "onAttributeChange"
#         
#         onAttributeChange: (stateMachine, attributeValue)->
#           @doSomethingWhenAttributeChanges()
#
#  If this type of declarative style isn't your thing, you can still bind to events in code:
#       
#       view = new App.views.StatefulView()
#       view.on "state:change:attribute", (stateMachine, attributeValue)=> @$el.html("New Attribute: #")
#       view.set "attribute", "something"
# 
# #### Event binding helpers
# 
# In addition to the `@stateChangeEvent` bindings documented above, you have available
# to you similar configuration helpers for binding to events emitted by the singletons:
#
# - `Luca.Application` via `@applicationEvents` 
# - `Luca.CollectionManager` via `@collectionEvents`
# - `Luca.SocketManager` via `@socketEvents`
view = Luca.register    "Luca.View"
view.extends            "Backbone.View"

# includes are extensions to the prototype, and have no special behavior
view.includes           "Luca.Events",
                        "Luca.concerns.DomHelpers",
                        "Luca.concerns.DevelopmentToolHelpers"

# concerns are includes with special property / method conventions
# which customize the components through the use of __initializer and
# __included method names.  These will be called every time an instance
# is created, and the first time the mixin is used to enhance a component.
view.mixesIn            "DomHelpers",
                        "Templating",
                        "EnhancedProperties",
                        "CollectionEventBindings",
                        "ApplicationEventBindings",
                        "StateModel"

# Luca.View classes have the concept of special events called hooks
# which allow you to tap into the lifecycle events of your view to
# customize their behavior.  This is especially useful in subclasses.
#
# You can utilize a @hook method by camelcasing the triggers defined below:
view.triggers           "before:initialize",
                        "after:initialize",
                        "before:render",
                        "after:render",
                        "first:activation",
                        "activation",
                        "deactivation"

view.publicConfiguration
  # Specifying a `@name` for your views is useful for views which
  # there will only be one instance.  This allows you to reference
  # the view instances by name using the application helper:
  #       Luca("my_view_name")
  name: undefined

  # Setting this property to true will automatically bind the context
  # of your event handler methods to the instance of this view.  This
  # saves you from having to manually do:
  #
  #       Luca.View.extend
  #         events:
  #           "click .one" : "oneHandler"
  #           "click .two" : "twoHandler"
  #         initialize: ()->
  #           _.bindAll(@, "oneHandler", "twoHandler")
  #
  #  Instead:
  #
  #       Luca.View.extend
  #         autoBindEventHandlers: true
  #         events: 
  #           "click .one" : "oneHandler"
  #
  # Optionally, you can define an array of method names you want bound
  # to this view:
  #
  #       Luca.View.extend
  #         bindMethods:["oneHandler","twoHandler"]
  #
  autoBindEventHandlers: false

  # Supplying configuration to `@_events` will ensure that this configuration
  # is present on views which extend from this view.  In normal Backbone behavior
  # the `@events` property can be overridden by views which extend, and this isn't
  # always what you want from your component.   
  _events: undefined



# Luca.View decorates Backbone.View with some patterns and conventions.
view.publicMethods
  identifier: ()->
    (@displayName || @type ) + ":" + (@name || @role || @cid)

  # Calls Backbone.View::remove, and removes the view from the 
  # instance cache.  Triggers a "before:remove" event.
  remove: ()->
    @trigger("before:remove", @)
    Luca.remove(@)
    Backbone.View::remove.apply(@, arguments)

  initialize: (@options={})->
    @trigger "before:initialize", @, @options

    _.extend @, @options

    if @autoBindEventHandlers is true or @bindAllEvents is true
      bindAllEventHandlers.call(@)

    @cid = _.uniqueId(@name) if @name?

    @$el.attr("data-luca-id", @name || @cid)

    Luca.registry.cacheInstance( @cid, @ )

    @setupHooks _( Luca.View::hooks.concat( @hooks ) ).uniq()

    Luca.concern.setup.call(@)

    @delegateEvents() unless _.isEmpty(@events)

    @trigger "after:initialize", @

    _.bindAll(@, @bindMethods...) if @bindMethods?.legth > 0

    unless _.isEmpty(@_events)
      for eventId, handler of @_events
        @registerEvent(eventId, handler)


  debug: (args...)->
    if @debugMode is true or window.LucaDebugMode is true
      args.unshift @identifier()
      console.log args...

  trigger: ()->
    if Luca.enableGlobalObserver
      if Luca.developmentMode is true or @observeEvents is true
        Luca.ViewObserver ||= new Luca.Observer(type:"view")
        Luca.ViewObserver.relay @, arguments

    Backbone.View::trigger.apply @, arguments

  # Backbone.View.prototype.make is removed in 0.9.10.
  # As we happen to rely on this little utility heavily,
  # we add it to Luca.View
  make: (tagName, attributes, content)->
    el = document.createElement(tagName);
    if (attributes) 
      Backbone.$(el).attr(attributes)
    if (content != null) 
      Backbone.$(el).html(content)
      
    el    

  registerEvent: (selector, handler)->
    @events ||= {}

    if _.isObject(selector)
      @events = _.extend(@events, selector)
    else
      if _.isFunction(handler) || (_.isString(handler) && @[handler]?)
        @events[selector] = handler 

    @delegateEvents()

view.privateMethods
  # Returns a reference to the class which this view is an instance of.
  definitionClass: ()->
    Luca.util.resolve(@displayName, window)?.prototype

  # Returns a list of all of the collections which are properties on this view.
  _collections: ()->
    Luca.util.selectProperties( Luca.isBackboneCollection, @ )

  # Returns a list of all of the models which are properties on this view.
  _models: ()->
    Luca.util.selectProperties( Luca.isBackboneModel, @ )

  # Returns a list of all of the views which are properties on this view.
  _views: ()->
    Luca.util.selectProperties( Luca.isBackboneView, @ )

  # views which inherit from Luca.View can define hooks
  # or events which can be emitted from them.  Automatically,
  # any functions on the view which are named according to the
  # convention will automatically get run.
  #
  # by default, all Luca.View classes come with the following:
  #
  # - before:render     : beforeRender()
  # - after:render      : afterRender()
  # - after:initialize  : afterInitialize()
  # - first:activation  : firstActivation()
  setupHooks: Luca.util.setupHooks

# In order to support some Luca apps which rely
# on Backbone.View.make.  
view.afterDefinition ()->
  if not Backbone.View::make?
    Backbone.View::make = ()->
      console.log "Backbone.View::make has been removed from backbone.  You should use Luca.View::make instead."
      Luca.View::make

view.register()

Luca.View._originalExtend = Backbone.View.extend

# Note:
#
# I will be removing this prior to 1.0.  Optimizing for collection based
# views does not belong in here, so the deferrable / collection binding stuff
# needs to go.
#
# Being able to defer rendering until the firing of an event on another object
# is something that does ask for some syntactic sugar though, so need to rethink.

Luca.View.renderStrategies =
  legacy: ( _userSpecifiedMethod )->
    view = @
    # if a view has a deferrable property set

    if @deferrable
      target = @deferrable_target

      unless Luca.isBackboneCollection(@deferrable)
        @deferrable = @collection

      target ||= @deferrable
      trigger = if @deferrable_event then @deferrable_event else Luca.View.deferrableEvent

      deferred = ()->
        _userSpecifiedMethod.call(view)
        @rendered = true
        view.trigger("after:render", view)

      view.defer(deferred).until(target, trigger)

      view.trigger "before:render", @

      autoTrigger = @deferrable_trigger || @deferUntil

      if !autoTrigger?
        target[ (@deferrable_method||"fetch") ].call(target)
      else
        fn = _.once ()=> @deferrable[ (@deferrable_method||"fetch") ]?()
        (@deferrable_target || @ ).bind(@deferrable_trigger, fn)

      return @

    else
      @trigger "before:render", @
      _userSpecifiedMethod.apply(@, arguments)
      @rendered = true
      @trigger "after:render", @

      return @

  improved: (_userSpecifiedMethod)->
    @trigger "before:render", @

    deferred = ()=>
      _userSpecifiedMethod.apply(@, arguments)
      @trigger "after:render", @

    console.log "doing the improved one", @deferrable

    if @deferrable? and not _.isString(@deferrable)
      throw "Deferrable property is expected to be a event id"

    if _.isString(@deferrable)
      console.log "binding to #{ @deferrable } on #{ @cid }"
      view.on @deferrable, ()->
        console.log "did the improved one"
        deferred.call(view)
        view.unbind(listenForEvent, @)

    else
      deferred.call(@)



Luca.View.renderWrapper = (definition)->
  _userSpecifiedMethod = definition.render

  _userSpecifiedMethod ||= ()-> @trigger "empty:render"

  definition.render = ()->
    strategy = Luca.View.renderStrategies[ @renderStrategy ||= "legacy" ]

    unless _.isFunction(strategy)
      throw "Invalid rendering strategy.  Please see Luca.View.renderStrategies"

    strategy.call(@, _userSpecifiedMethod)

    @

  definition

bindAllEventHandlers = ()->
  for config in [@events, @componentEvents, @collectionEvents, @applicationEvents] when not _.isEmpty(config)
    bindEventHandlers.call(@, config)

bindEventHandlers = (events={})->
  for eventSignature, handler of events
    if _.isString(handler)
      try
        _.bindAll @, handler
      catch e
        console.log "Error binding to handler - #{handler} = #{e} #{@identifier()}"

Luca.View.deferrableEvent = "reset"

Luca.View.extend = (definition={})->
  definition = Luca.View.renderWrapper( definition )
  # for backward compatibility
  definition.concerns ||= definition.concerns if definition.concerns?

  componentClass = Luca.View._originalExtend.call(@, definition)

  if definition.concerns? and _.isArray( definition.concerns )
    for module in definition.concerns
      Luca.decorate( componentClass ).with( module )

  componentClass

