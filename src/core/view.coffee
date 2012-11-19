view = Luca.register    "Luca.View"

view.extends            "Backbone.View"

# includes are extensions to the prototype, and have no special behavior
view.includes           "Luca.Events",
                        "Luca.modules.DomHelpers"

# mixins are includes with special property / method conventions
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

    if @mixins?.length > 0
      for module in @mixins 
        Luca.mixin(module)?.__initializer?.call(@, @, module)

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
  setupHooks: (set)->
    set ||= @hooks

    _(set).each (eventId)=>
      fn = Luca.util.hook( eventId )

      callback = ()=>
        @[fn]?.apply @, arguments

      callback = _.once(callback) if eventId?.match(/once:/)

      @bind eventId, callback

  registerEvent: (selector, handler)->
    @events ||= {}
    @events[ selector ] = handler
    @delegateEvents()

  definitionClass: ()->
    Luca.util.resolve(@displayName, window)?.prototype

  collections: ()-> Luca.util.selectProperties( Luca.isBackboneCollection, @ )
  models: ()-> Luca.util.selectProperties( Luca.isBackboneModel, @ )
  views: ()-> Luca.util.selectProperties( Luca.isBackboneView, @ )

  debug: ()->
    return unless @debugMode or window.LucaDebugMode?
    console.log [(@name || @cid),message] for message in arguments

  trigger: ()->
    if Luca.enableGlobalObserver
      if Luca.developmentMode is true or @observeEvents is true
        Luca.ViewObserver ||= new Luca.Observer(type:"view")
        Luca.ViewObserver.relay @, arguments

    Backbone.View.prototype.trigger.apply @, arguments


Luca.View._originalExtend = Backbone.View.extend

Luca.View.renderWrapper = (definition)->
  _base = definition.render

  _base ||= Luca.View::$attach

  definition.render = ()->
    view = @
    # if a view has a deferrable property set

    if @deferrable
      target = @deferrable_target

      unless Luca.isBackboneCollection(@deferrable)
        @deferrable = @collection

      target ||= @deferrable
      trigger = if @deferrable_event then @deferrable_event else Luca.View.deferrableEvent 

      deferred = ()->
        _base.call(view)
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
      _base.apply(@, arguments)
      @trigger "after:render", @

      return @

  definition

bindAllEventHandlers = ()->
  _( @events ).each (handler,event)=>
    if _.isString(handler)
      _.bindAll @, handler

registerApplicationEvents = ()->
  return if _.isEmpty(@applicationEvents)

  app = @app

  if _.isString( app ) or _.isUndefined( app )
    app = Luca.Application?.get?(app)

  unless Luca.supportsEvents( app )
    throw "Error binding to the application object on #{ @name || @cid }"

  for eventTrigger, handler in @applicationEvents
    handler = @[handler] if _.isString(handler) 

    unless _.isFunction(handler)
      throw "Error registering application event #{ eventTrigger } on #{ @name || @cid }"

    app.on(eventTrigger, handler)

registerCollectionEvents = ()->
  return if _.isEmpty( @collectionEvents )

  manager = @collectionManager

  if _.isString( manager ) or _.isUndefined( manager )
    manager = Luca.CollectionManager.get( manager )

  for signature, handler of @collectionEvents
    [key,eventTrigger] = signature.split(" ")

    collection = manager.getOrCreate( key )

    if !collection
      throw "Could not find collection specified by #{ key }"

    if _.isString(handler)
      handler = @[handler]

    unless _.isFunction(handler)
      throw "invalid collectionEvents configuration"

    try
      collection.bind(eventTrigger, handler)
    catch e
      console.log "Error Binding To Collection in registerCollectionEvents", @
      throw e

setupBodyTemplate = ()->
  templateVars = if @bodyTemplateVars
    @bodyTemplateVars.call(@)
  else
    @

  if template = @bodyTemplate
    @$el.empty()
    Luca.View::$html.call(@, Luca.template(template, templateVars ) )

setupTemplate = ()->
  if @template?
    @defer ()=>
      @$template(@template, @)
    .until("before:render")      

Luca.View.extend = (definition)->
  definition = Luca.View.renderWrapper( definition )

  if definition.mixins? and _.isArray( definition.mixins )
    for module in definition.mixins
      Luca.decorate( definition ).with( module )

  Luca.View._originalExtend.call(@, definition)


Luca.View.deferrableEvent = "reset"

Luca.View.handleEnhancedProperties = ()->
