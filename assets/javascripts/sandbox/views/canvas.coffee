Sandbox.views.Canvas = Luca.View.extend
  name: "canvas"
  id: "canvas_container"

  beforeRender: ()->
    $(@el).html Luca.templates["canvas"]()

  canvas: _.memoize ()-> @$('canvas')[0]

  context: _.memoize ()-> @canvas().getContext("2d")


  clear: ()->
  #  @canvas().width = @canvas.width

  drawCircle : (options={})->
    canvas = @canvas()
    context = @context()
    centerX = canvas.width / 2
    centerY = canvas.height / 2
    radius = options.radius || 25
    startAngle = 0
    endAngle = 2 * Math.PI

    context.beginPath()
    context.arc( options.x || centerX, options.y || centerY, radius, startAngle, endAngle, false)
    context.lineWidth = options.lineWidth ||
    context.strokeStyle = options.color || '#000'

    if options.fill?
        context.fillStyle = options.fillStyle
        context.fill()

    context.stroke()

  randomColor: (offset=0)->
    r = parseInt( Math.random() * 255 ) + offset
    g = parseInt( Math.random() * 255 ) + offset
    b = parseInt( Math.random() * 255 ) + offset

    "rgba(#{ r },#{ g }, #{ b }, #{ 1 - Math.random() * 1 })"

  run: (code)->
    canvas = @canvas()
    context = @context()
    clear = @clear()
    centerX = canvas.width / 2
    centerY = canvas.height / 2
    randomColor = _.bind @randomColor, @
    drawCircle = _.bind @drawCircle, @

    eval(code)
