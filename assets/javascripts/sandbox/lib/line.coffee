class window.Line extends Sandbox.Actor
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

  draw: ()->
    unless @id? and @stage? and @context?
      return

    @context.restore()

    @context.lineTo(@x1,@y1)
    @context.lineTo(@x2,@y2)
    @context.strokeStyle = @strokeStyle
    @context.lineWidth = @lineWidth
    @context.stroke()

    @context.save()
