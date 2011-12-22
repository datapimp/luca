Luca.View = Backbone.View

Luca.View.original_extend = Luca.View.extend

Luca.View.extend = (definition)->
  __original_render = definition.render

  definition.render = ()->
    @trigger "before:render", @
    __original_render.apply @, arguments if __original_render?
    @trigger "after:render", @

  Luca.View.original_extend.apply @, [definition]

_.extend Luca.View.prototype,
  hooks:[
    "after:initialize",
    "before:render",
    "after:render"
  ]

  initialize: (@options={})->
    Luca.cache( @cid, @ )
    @setupHooks( @options.hooks ) if @options.hooks
    @setupHooks Luca.View.prototype.hooks

    @trigger "after:initialize", @

  setupHooks: (set)->
    set ||= @hooks

    _(set).each (event)=>
      parts = event.split(':')
      prefix = parts.shift()
      
      parts = _( parts ).map (p)-> _.capitalize(p)

      fn = prefix + parts.join('')
      
      @bind event, ()=>
        @[fn].apply @, arguments if @[fn]
 
