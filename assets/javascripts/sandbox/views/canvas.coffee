randomColor = (offset=0)->
  r = parseInt( Math.random() * 255 ) + offset
  g = parseInt( Math.random() * 255 ) + offset
  b = parseInt( Math.random() * 255 ) + offset

  "rgba(#{ r },#{ g }, #{ b }, #{ 1 - Math.random() * 1 })"

class Circle
  constructor:(options={})->
    _.extend @, options

  draw: ()->
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
    canvas.width = canvas.width
    context = @context()
    centerX = canvas.width / 2
    centerY = canvas.height / 2

    try
      eval(code)
    catch error
