class window.Stage
  constructor: (options={})->
    _.extend @, options
    @stageActors ||= window.stageActors ||= {}
    @restart()

  getActorsInLayer: (z)->
    _( @sortedActors ).select (a)->
      parseInt( a.z || 1 ) is z

  toggleAnimation: (button)->
    if @started?
      button.html "Play"
      @stop()
    else
      button.html "Pause"
      @start()

  toggleStats: (button)->
    if @showingStats?
      button.html "Stats On"
      @hideStats()
    else
      button.html "Stats Off"
      @showStats()

  hideStats: ()->
    # TODO

  showStats: ()->
    # TODO

  restart: ()->
    @stop()
    @reset()
    @start()

  stop: ()->
    @started = undefined
    clearInterval(@tickInterval) if @tickInterval

  start: ()->
    return if @started?

    date = new Date
    @started = date.getTime()

    @tickInterval = setInterval ()=>
      @drawAll()
    , @frameRate

  frameRate: 16

  reset: ()->
    @stageActors = window.stageActors = {}
    @sortedActors = []

  clear: ()->
    @canvas.width = @canvas.width

  sortedActors: []

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
      actor.runTicks?(lastTime,timeDiff)
      actor.draw(lastTime,timeDiff)
      actor.runAfter?(lastTime, timeDiff )