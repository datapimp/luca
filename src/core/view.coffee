bindAllEventHandlers = ()->
  _( @events ).each (handler,event)=>
    if _.isString(handler)
      _.bindAll @, handler

registerCollectionEvents = ()->
  manager = @collectionManager || Luca.CollectionManager.get()

  _( @collectionEvents ).each (handler, signature)=>

  for key, eventTrigger of @collectionEvents
    [key,eventTrigger] = signature.split(" ")

    collection = @["#{ key }Collection"] = manager.getOrCreate( key )

    if !collection
      throw "Could not find collection specified by #{ key } in collection events on #{ @name || @cid }"

    if _.isString(handler)
      handler = @[handler]

    unless _.isFunction(handler)
      throw "invalid collectionEvents configuration on #{ @name || @cid }"

    try
      collection.bind(eventTrigger, handler)
    catch e
      console.log "Error Binding To Collection in registerCollectionEvents", @
      throw e

registerApplicationEvents = ()->
  app = @app || Luca.getApplication()
  for trigger, handler of @applicationEvents
    if _.isString(handler)
      handler = @[handler]

    unless _.isFunction( handler )
      throw "Invalid Handler referenced in application events configuration. #{ @name || @cid }"

    app.bind(trigger, handler)

_.def("Luca.View").extends("Backbone.View").with

  additionalClassNames:[]



  hooks:[
    "after:initialize"
    "before:render"
    "after:render"
    "first:activation"
    "activation"
    "deactivation"
  ]

  initialize: (@options={})->

    _.extend @, @options

    @cid = _.uniqueId(@name) if @name?

    if template = @bodyTemplate
      @$el.empty()
      Luca.View::$html.call(@, Luca.template(template, @) )

    Luca.cache( @cid, @ )

    unique = _( Luca.View.prototype.hooks.concat( @hooks ) ).uniq()

    @setupHooks( unique )

    if @autoBindEventHandlers is true
      bindAllEventHandlers.call(@)

    if @additionalClassNames
      @additionalClassNames = @additionalClassNames.split(" ") if _.isString(@additionalClassNames)
      @$el.addClass( additional ) for additional in @additionalClassNames

    @$wrap(@wrapperClass) if @wrapperClass?

    @trigger "after:initialize", @

    registerCollectionEvents.call(@)
    registerApplicationEvents.call(@)

    @delegateEvents()

  #### JQuery / DOM Selector Helpers
  $wrap: (wrapper)->
    if _.isString(wrapper) and not wrapper.match(/[<>]/)
      wrapper = @make("div",class:wrapper)

    @$el.wrap( wrapper )

  $template: (template, variables={})->
    @$el.html( Luca.template(template,variables) )

  $html: (content)->
    @$el.html( content )

  $append: (content)->
    @$el.append( content )

  #### Containers
  #
  # Luca is heavily reliant on the concept of Container views.  Views which
  # contain other views and handle inter-component communication between the
  # component views.  The default render() operation consists of building the
  # view's content, and then attaching that view to its container.
  #
  # 99% of the time this would happen automatically
  $attach: ()->
    @$container().append( @el )

  $container: ()->
    $(@container)

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

originalExtend = Backbone.View.extend

customizeRender = (definition)->
  #### Rendering
  #
  # Our base view class wraps the defined render() method
  # of the views which inherit from it, and does things like
  # trigger the before and after render events automatically.
  # In addition, if the view has a deferrable property on it
  # then it will make sure that the render method doesn't get called
  # until.

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
      trigger = if @deferrable_event then @deferrable_event else "reset"

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

# By overriding Backbone.View.extend we are able to intercept
# some method definitions and add special behavior around them
# mostly related to render()
Luca.View.extend = (definition)->
  definition = customizeRender( definition )
  originalExtend.call(@, definition)

