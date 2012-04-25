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

  frameRate: 16

  reset: ()->
    @stageActors = window.stageActors = {}

  clear: ()->
    @canvas.width = @canvas.width

  add: (object={})->
    object.id ||= _.uniqueId("object")
    @stageActors[ object.id ] = object unless @stageActors[ object.id ]
    object.context = @context
    object.stage = @

    @sortedActors = _( _( @stageActors ).values() ).sortBy (a)-> parseInt(a.z || 1)

  drawAll: ()->
    date = new Date
    @clear()
    lastTime = date.getTime()
    timeDiff = lastTime - @started

    _( @sortedActors ).each (actor)->
      actor.runTicks(lastTime,timeDiff)
      actor.draw(lastTime,timeDiff)