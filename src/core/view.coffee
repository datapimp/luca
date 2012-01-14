#### Luca Base View
Luca.View = Backbone.View.extend
  base: 'Luca.View'

# The Luca.View class adds some very commonly used patterns
# and functionality to the stock Backbone.View class. Features
# such as auto event binding, the facilitation of deferred rendering
# against a Backbone.Model or Backbone.Collection reset event, Caching
# views into a global Component Registry, and more.

Luca.View.originalExtend = Backbone.View.extend

# By overriding Backbone.View.extend we are able to intercept
# some method definitions and add special behavior around them
# mostly related to render()
Luca.View.extend = (definition)->
  #### Rendering 
  #
  # Our base view class wraps the defined render() method
  # of the views which inherit from it, and does things like
  # trigger the before and after render events automatically.
  #
  # In addition, if the view has a deferrable property on it
  # then it will make sure that the render method doesn't get called
  # until.

  _base = definition.render

  _base ||= ()->
    return unless $(@container) and $(@el) 
      if $(@el).html() isnt "" and $(@container).html() is ""
        $(@container).append( $(@el) )

  definition.render = ()->
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
        @bind @deferrable_trigger, ()=>
          @deferrable.fetch()

    else
      @trigger "before:render", @
      do ()=>
        _base.apply(@, arguments)
      @trigger "after:render", @

  Luca.View.originalExtend.apply @, [definition]

_.extend Luca.View.prototype,
  trigger: (@event)->
    Backbone.View.prototype.trigger.apply @, arguments

  hooks:[
    "after:initialize",
    "before:render",
    "after:render"
  ]
  
  deferrable_event: "reset"

  initialize: (@options={})->
    @cid = _.uniqueId(@name) if @name?

    _.extend @, @options

    #### View Caching
    #
    # Luca.View(s) which get created get stored in a global cache by their
    # component id.  This allows us to re-use views when it makes sense
    Luca.cache( @cid, @ )
    
    @setupHooks( @options.hooks ) if @options.hooks
    @setupHooks( @hooks ) if @hooks and !@options.hooks
    @setupHooks Luca.View.prototype.hooks

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
    
    _(set).each (event)=>
      parts = event.split(':')
      prefix = parts.shift()
      
      parts = _( parts ).map (p)-> _.capitalize(p)
      fn = prefix + parts.join('')
      
      @bind event, ()=> @[fn].apply @, arguments if @[fn]
