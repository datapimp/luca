class window.Stage
  constructor: (options={})->
    _.extend @, options
    @stageActors ||= window.stageActors ||= {}

    @restart()

  restart: ()->
    @stop()
    @reset()
    @start()

  stop: ()->
    clearInterval(@tickInterval) if @tickInterval

  start: ()->
    date = new Date
    @started = date.getTime()

    @tickInterval = setInterval ()=>
      @drawAll()
    , @frameRate

  actors: ()-> _( @stageActors ).values()

  frameRate: 16

  each: (iterator)->
    _( @actors() ).each( iterator )

  reset: ()->
    @stageActors = window.stageActors = {}

  clear: ()->
    @canvas.width = @canvas.width

  add: (object={})->
    object.id ||= _.uniqueId("object")
    @stageActors[ object.id ] = object unless @stageActors[ object.id ]
    object.context = @context
    object.stage = @

  drawAll: ()->
    date = new Date
    @clear()
    lastTime = date.getTime()
    timeDiff = lastTime - @started

    @each (actor)->
      actor.runTicks(lastTime,timeDiff)
      actor.draw(lastTime,timeDiff)