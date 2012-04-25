class window.Circle extends Sandbox.Actor
  constructor:(options={})->
    _.extend @, options
    if @stage?
      @stage.add(@)

  x: 0
  y: 0
  z: 0

  clone: ()->
    new window.Circle
      x: @x
      y: @y
      color: @color
      radius: @radius
      strokeStyle: @strokeStyle
      strokeWidth: @strokeWidth
      ticks: @ticks
      velocity: @velocity
      hDirection: @hDirection
      vDirection: @vDirection

  bottomBorder: ()->
    @y + @radius

  leftBorder: ()->
    @x - @radius

  rightBorder: ()->
    @x + @radius

  topBorder: ()->
    @y - @radius

  distanceFromBottom: ()->
    @stage.canvas.height - @bottomBorder()

  distanceFromTop: ()->
    0 + @topBorder()

  distanceFromRight: ()->
    @stage.canvas.width - @rightBorder()

  distanceFromLeft: ()->
    0 + @leftBorder()

  atBottomEdge: ()->
    @distanceFromBottom() <= 0

  atTopEdge: ()->
    @distanceFromTop() <= 0

  atRightEdge: ()->
    @distanceFromRight() <= 0

  atLeftEdge: ()->
    @distanceFromLeft() <= 0

  hDirection: 1
  vDirection: 1

  velocity:
    horizontal: 1
    vertical: 1

  changeDirection: (type="horizontal",direction="right")->
    @direction[type] = direction


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
    unless @frozen is true
      @x = @x + @horizontalSpeed()
      @y = @y + @verticalSpeed()

  growthInterval: 0.025
  growthMinimum: 5
  growthMaximum: 75

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
      return

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