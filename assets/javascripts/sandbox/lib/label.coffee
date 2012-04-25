wrapText = (context, text, x, y, maxWidth, lineHeight) ->
  words = text.split(" ")
  line = ""
  n = 0

  while n < words.length
    testLine = line + words[n] + " "
    metrics = context.measureText(testLine)
    testWidth = metrics.width
    if testWidth > maxWidth
      context.fillText line, x, y
      line = words[n] + " "
      y += lineHeight
    else
      line = testLine
    n++
  context.fillText line, x, y


class window.Label extends Sandbox.Actor
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
    unless @stage? and @context? and @id?
      return

    @context.font = "16pt Calibri";
    @context.fillStyle = "#fff";
    @context.strokeStyle = "#333"
    @context.lineWidth = 3

    @lines = [@lines] unless _.isArray(@lines)

    line = 1
    for stat in @lines
      @context.strokeText stat, @x, (@y + (@lines.length / 2 ) * -1 * 16 ) + (line * 16)
      @context.fillText stat, @x, (@y + (@lines.length / 2 ) * -1 * 16 ) + (line * 16)
      line++