#### Luca Base View
Luca.View = Backbone.View

# The Luca.View class adds some very commonly used patterns
# and functionality to the stock Backbone.View class. Features
# such as auto event binding, the facilitation of deferred rendering
# against a Backbone.Model or Backbone.Collection reset event, Caching
# views into a global Component Registry, and more.

Luca.View.original_extend = Luca.View.extend

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

  if definition.render?
    __original_render = definition.render

    definition.render = ()->
      if @deferrable
        @deferrable.bind @deferrable_event, ()=>
          @trigger "before:render", @
          __original_render.apply @, arguments
          @trigger "after:render", @
      else
        @trigger "before:render", @
        __original_render.apply @, arguments
        @trigger "after:render", @

  Luca.View.original_extend.apply @, [definition]


_.extend Luca.View.prototype,
  hooks:[
    "after:initialize",
    "before:render",
    "after:render"
  ]

  initialize: (@options={})->
    #### View Caching
    #
    # Luca.View(s) which get created get stored in a global cache by their
    # component id.  This allows us to re-use views when it makes sense
    Luca.cache( @cid, @ )

    @setupHooks( @options.hooks ) if @options.hooks
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
  setupHooks: (set)->
    set ||= @hooks

    _(set).each (event)=>
      parts = event.split(':')
      prefix = parts.shift()
      
      parts = _( parts ).map (p)-> _.capitalize(p)

      fn = prefix + parts.join('')
      
      @bind event, ()=>
        @[fn].apply @, arguments if @[fn]
