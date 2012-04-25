class window.Circle extends Sandbox.Actor
  constructor:(options={})->

    _.extend @,
      hDirection: 1
      vDirection: 1
      velocity:
        horizontal: 1
        vertical: 1
      x: 0
      y: 0
      z: 0

    Sandbox.Actor::constructor.apply(@, arguments )

  width: ()->
    @radius * 2

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



  changeDirection: (type="horizontal",direction="right")->
    @direction[type] = direction

  atEdge: ()->
    @atRightEdge() or @atLeftEdge() or @atTopEdge() or @atBottomEdge()

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

  avoidCollisions: ()->

  move: ()->
    @stayInBounds()
    @avoidCollisions()

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

    unless @radius >= @growthMaximum or @atEdge()
      @radius += @dir

  radius: 5
  color: "red"

  draw: ()->
    unless @id? and @stage? and @context?
      console.log("Cant draw")
      return

    context = @context

    context.restore()

    context.beginPath();
    context.arc(@x, @y, @radius, 0, 2 * Math.PI, false);
    context.fillStyle = @color
    context.fill()

    if @strokeWidth
      context.lineWidth = @strokeWidth
      context.strokeStyle = @strokeColor || @strokeStyle
      context.stroke()

    context.closePath()

    context.save()

_.extend Circle::, Backbone.Events