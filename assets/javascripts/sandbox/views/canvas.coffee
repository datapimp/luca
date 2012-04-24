randomColor = (s={})->
  s.r ||= parseInt( Math.random() * 255 )
  s.g ||= parseInt( Math.random() * 255 )
  s.b ||= parseInt( Math.random() * 255 )
  s.alpha ||= 1 - ( Math.random() * 1 )

  "rgba(#{ s.r },#{ s.g }, #{ s.b }, #{ 1.0 })"

class Stage
  constructor: (options={})->
    _.extend @, options
    @stageActors ||= window.stageActors ||= {}

    @restart()

  restart: ()->
    @reset()
    @tickInterval = setInterval ()=>
      @drawAll()
    , @frameRate

  actors: ()-> _( @stageActors ).values()

  frameRate: 16

  each: (iterator)->
    _( @actors() ).each( iterator )

  reset: ()->
    clearInterval(@tickInterval) if @tickInterval
    @stageActors = window.stageActors = {}

  clear: ()->
    @canvas.width = @canvas.width

  add: (object={})->
    object.id ||= _.uniqueId("object")
    @stageActors[ object.id ] = object unless @stageActors[ object.id ]
    object.context = @context
    object.stage = @

  drawAll: ()->
    @clear()
    @each (actor)->
      actor.draw()

class Circle
  constructor:(options={})->
    _.extend @, options

  atBottomEdge: ()->
    @y + @radius >= @stage.canvas.height

  atTopEdge: ()->
    @y - @radius <= 0

  atRightEdge: ()->
    @x + @radius >= @stage.canvas.width

  atLeftEdge: ()->
    @x - @radius <= 0

  hDirection: 1
  vDirection: 1

  velocity:
    horizontal: 1
    vertical: 1

  changeDirection: (type="horizontal",direction="right")->
    @direction[type] = direction

  horizontalSpeed: ()->
    @velocity.horizontal * @hDirection

  verticalSpeed: ()->
    @velocity.vertical * @vDirection

  stayInBounds: ()->
    if @atRightEdge()
      @hDirection = -1
    if @atLeftEdge()
      @hDirection = 1
    if @atTopEdge()
      @vDirection = 1
    if @atBottomEdge()
      @vDirection = -1
    @

  move: ()->
    @stayInBounds()
    @x = @x + @horizontalSpeed()
    @y = @y + @verticalSpeed()

  runTicks: ()->
    _( @ticks ).each (fn)=> fn.apply(@)

  eachTick: (fn)->
    @ticks ||= []
    @ticks.push(fn)

  growthInterval: 0.025
  growthMinimum: 5
  growthMaximum: 40

  grow: ()->
    @dir ||= @growthInterval

    if @radius < @growthMinimum
      @dir = @growthInterval

    if @radius > @growthMaximum
      @dir = @growthInterval * -1

    @radius += @dir

  radius: 5
  color: "red"

  draw: ()->
    unless @id? and @stage? and @context?
      console.log "Can't draw"
      return

    @runTicks()

    context = @context

    context.beginPath();
    context.arc(@x, @y, @radius, 0, 2 * Math.PI, false);
    context.fillStyle = @color
    context.fill()

    if @strokeWidth
      context.lineWidth = @strokeWidth
      context.strokeStyle = @strokeColor || @strokeStyle
      context.stroke()

_.extend Circle::, Backbone.Events

Sandbox.views.Canvas = Luca.View.extend
  name: "canvas"
  id: "canvas_container"

  beforeRender: ()->
    $(@el).html Luca.templates["canvas"]()

  canvas: _.memoize ()-> @$('canvas')[0]

  context: _.memoize ()-> @canvas().getContext("2d")

  run: (code)->
    canvas = @canvas()
    context = @context()
    centerX = canvas.width / 2
    centerY = canvas.height / 2
    window.stage = new Stage(context: context, canvas: canvas) unless window.stage

    try
      eval(code)
    catch error
      console.log error.message unless error.message.match /is not defined/
