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
    console.log "Running", code

    randomColor = (offset=0)->
      r = parseInt( Math.random() * 255 ) + offset
      g = parseInt( Math.random() * 255 ) + offset
      b = parseInt( Math.random() * 255 ) + offset

      "rgba(#{ r },#{ g }, #{ b }, #{ 1 - Math.random() * 1 })"

    centerX = canvas.width / 2
    centerY = canvas.height / 2

    eval(code)
