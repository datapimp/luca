randomColor = (s={})->
  s.r ||= parseInt( Math.random() * 255 )
  s.g ||= parseInt( Math.random() * 255 )
  s.b ||= parseInt( Math.random() * 255 )
  s.alpha ||= 1 - ( Math.random() * 1 )

  "rgba(#{ s.r },#{ s.g }, #{ s.b }, #{ 1.0 })"



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

    stage.restart()

    try
      eval(code)
    catch error
      console.log error.message unless error.message.match /is not defined/
