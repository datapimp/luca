#### Luca Base View

# The Luca.View class adds some very commonly used patterns
# and functionality to the stock Backbone.View class. Features
# such as auto event binding, the facilitation of deferred rendering
# against a Backbone.Model or Backbone.Collection reset event, Caching
# views into a global Component Registry, and more.
Luca.View = Backbone.View.extend

  applyStyles: (styles={})->
    for setting, value  of styles
      @$el.css(setting,value)

    @

  debug: ()->
    return unless @debugMode or window.LucaDebugMode?
    console.log [(@name || @cid),message] for message in arguments

  trigger: ()->
    if Luca.enableGlobalObserver and @observeEvents is true
      Luca.ViewObserver ||= new Luca.Observer(type:"view")
      Luca.ViewObserver.relay @, arguments

    Backbone.View.prototype.trigger.apply @, arguments

  hooks:[
    "after:initialize"
    "before:render"
    "after:render"
    "first:activation"
    "activation"
    "deactivation"
  ]

  # which event should we listen to on
  # our deferrable property, before we
  # trigger the actual rendering
  deferrable_event: "reset"

  initialize: (@options={})->

    _.extend @, @options

    @cid = _.uniqueId(@name) if @name?

    #### View Caching
    #
    # Luca.View(s) which get created get stored in a global cache by their
    # component id.  This allows us to re-use views when it makes sense
    Luca.cache( @cid, @ )

    unique = _( Luca.View.prototype.hooks.concat( @hooks ) ).uniq()

    @setupHooks( unique )

    if @autoBindEventHandlers is true
      _( @events ).each (handler,event)=>
        if _.isString(handler)
          _.bindAll @, handler


    @trigger "after:initialize", @

    @registerCollectionEvents()

    @delegateEvents()

  #### JQuery / DOM Selector Helpers
  $bodyEl: ()->
    @bodyElement ||= "div"
    @bodyClassName ||= "view-body"

    @bodyEl = "#{ @bodyElement }.#{ @bodyClassName }"

    bodyEl = @$(@bodyEl)

    return bodyEl if bodyEl.length > 0

    @$el

  $html: (content)->
    @$bodyEl().html( content )

  $append: (content)->
   @$bodyEl().append(content)

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


  #### Luca.Collection and Luca.CollectionManager integration

  # under the hood, this will find your collection manager using
  # Luca.CollectionManager.get, which is a function that returns
  # the first instance of the CollectionManager class ever created.
  #
  # if you want to use more than one collection manager, over ride this
  # function in your views with your own logic
  getCollectionManager: ()->
    @collectionManager || Luca.CollectionManager.get?.call()

  ##### Collection Events
  #
  # By defining a hash of collectionEvents in the form of
  #
  # "books add" : "onBookAdd"
  #
  # the Luca.View will bind to the collection found in the
  # collectionManager with that key, and bind to that event.
  # a property of @booksCollection will be created on the view,
  # and the "add" event will trigger "onBookAdd"
  #
  # you may also specify a function directly.  this
  #
  registerCollectionEvents: ()->
    manager = @getCollectionManager()

    _( @collectionEvents ).each (handler, signature)=>
      [key,event] = signature.split(" ")

      collection = @["#{ key }Collection"] = manager.getOrCreate( key )

      if !collection
        throw "Could not find collection specified by #{ key }"

      if _.isString(handler)
        handler = @[handler]

      unless _.isFunction(handler)
        throw "invalid collectionEvents configuration"

      try
        collection.bind(event, handler)
      catch e
        console.log "Error Binding To Collection in registerCollectionEvents", @
        throw e

  registerEvent: (selector, handler)->
    @events ||= {}
    @events[ selector ] = handler
    @delegateEvents()


Luca.View.originalExtend = Backbone.View.extend

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
    if @bodyTemplate and _( Luca.available_templates() ).include( @bodyTemplate )
      @$el.html( Luca.template(@bodyTemplate, @) )

    if @deferrable
      @trigger "before:render", @

      @deferrable.bind @deferrable_event, _.once ()=>
        _base.apply(@, arguments)
        @trigger "after:render", @

      # we might not want to fetch immediately upon
      # rendering, so we can pass a deferrable_trigger
      # event and not fire the fetch until this event
      # occurs
      if !@deferrable_trigger
        @immediate_trigger = true

      if @immediate_trigger is true
        @deferrable.fetch()
      else
        @bind @deferrable_trigger, _.once ()=>
          @deferrable.fetch()

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
  Luca.View.originalExtend.call(@, definition)

