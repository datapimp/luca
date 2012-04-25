class window.Line extends Sandbox.Actor
  constructor: (options={})->
    _.extend @, options
  draw: ()->
    unless @id? and @stage? and @context?
      return

    context = @context
    context.moveTo(@x1,@y1)
    context.lineTo(@x2,@y2)
    context.strokeStyle = @strokeStyle || "black"
    context.strokeWidth = @strokeWidth || 1

    context.stroke()

