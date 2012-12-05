view = Luca.register    "Luca.View"

view.extends            "Backbone.View"

# includes are extensions to the prototype, and have no special behavior
view.includes           "Luca.Events",
                        "Luca.concerns.DomHelpers"

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

# Luca.View decorates Backbone.View with some patterns and conventions.
view.defines
  initialize: (@options={})->
    @trigger "before:initialize", @, @options

    _.extend @, @options

    if @autoBindEventHandlers is true or @bindAllEvents is true
      bindAllEventHandlers.call(@) 

    @cid = _.uniqueId(@name) if @name?

    @$el.attr("data-luca-id", @name || @cid)
    
    Luca.cacheInstance( @cid, @ )

    @setupHooks _( Luca.View::hooks.concat( @hooks ) ).uniq()

    Luca.concern.setup.call(@)

    @delegateEvents()
        
    @trigger "after:initialize", @

  #### Hooks or Auto Event Binding
  #
  # views which inherit from Luca.View can define hooks
  # or events which can be emitted from them.  Automatically,
  # any functions on the view which are named according to the
  # convention will automatically get run.
  #
  # by default, all Luca.View classes come with the following:
  #
  # before:render     : beforeRender()
  # after:render      : afterRender()
  # after:initialize  : afterInitialize()
  # first:activation  : firstActivation()
  setupHooks: Luca.util.setupHooks

  registerEvent: (selector, handler)->
    @events ||= {}
    @events[ selector ] = handler
    @delegateEvents()

  definitionClass: ()->
    Luca.util.resolve(@displayName, window)?.prototype

  collections: ()-> 
    Luca.util.selectProperties( Luca.isBackboneCollection, @ )

  models: ()-> 
    Luca.util.selectProperties( Luca.isBackboneModel, @ )

  views: ()-> 
    Luca.util.selectProperties( Luca.isBackboneView, @ )

  debug: (args...)->
    return unless @debugMode or window.LucaDebugMode?
    console.log [(@name || @cid), args...] 

  trigger: ()->
    if Luca.enableGlobalObserver
      if Luca.developmentMode is true or @observeEvents is true
        Luca.ViewObserver ||= new Luca.Observer(type:"view")
        Luca.ViewObserver.relay @, arguments

    Backbone.View.prototype.trigger.apply @, arguments


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
      _.bindAll @, handler

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

