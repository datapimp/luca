
class Sandbox.Actor
  constructor: (options)->
    _.extend @, options
    @stage.add(@) if @stage?.add?

  center: ()->
    [parseInt(@x),parseInt(@y)]

  collisionThreshold: ()->
    @width()

  collidingWith: (other)->
    @collisionThreshold() >= @distanceFrom(other)

  inCollision: ()->
    collisions.length > 0

  collisions: ()->
    candidates = @stage.getActorsInLayer( parseInt(@z || 1) )

    objects = _( candidates ).select (other)=>
      @collidingWith( other ) && other isnt @

  distanceFrom:(other)->
    center = @center()
    p1 = center[0]
    p2 = center[1]
    p3 = other.x
    p4 = other.y

    side1 = p1 - p3
    side2 = p2 - p4

    h = (side1 * side1) + (side2 * side2)

    Math.sqrt(h)

  # support old api
  runTicks: ()->
    @runBefore.apply(@, arguments )

  runAfter: (lastTime, timeDiff)->
    @runGroup(@afters, lastTime, timeDiff)

  runBefore: (lastTime, timeDiff)->
    @runGroup(@ticks, lastTime, timeDiff)

  runGroup: (group, lastTime,timeDiff)->
    _( group ).each (instruction)=>
      if _.isFunction(instruction)
        fn = instruction
        fn.apply(@,[lastTime,timeDiff])

      if _.isString(instruction)
        @[instruction]?.apply(@,[lastTime,timeDiff,instruction])

      if _.isArray(instruction)
        if instruction[1]-- > 0
          instruction[0].apply(@,[lastTime,timeDiff,instruction[1]])
        else
          @ticks = _( @ticks ).reject (item)-> item is instruction
          console.log @ticks.length

  freeze: ()->
    @frozen = !@frozen

  nextTick: (fn)->
    @nextTicks fn, 1

  nextTicks: (fn, counter=1)->
    @ticks ||= []
    @ticks.push [fn, counter]

  eachTick: (fn)->
    @ticks ||= []
    @ticks.push(fn)

  afterDraw: (fn)->
    @afters ||= []
    @afters.push( fn )

  horizontalSpeed: ()->
    @velocity.horizontal * @hDirection

  verticalSpeed: ()->
    @velocity.vertical * @vDirection

  skip: ()->
    @hidden is true

  printStats: ()->
    stats = [
      "x: #{ @x }"
      "y: #{ @y }"
      "z: #{ @z }"
      "h: #{ @horizontalSpeed() }"
      "v: #{ @verticalSpeed() }"
      "collissions: #{ @collisions().length }"
    ]
    @context.font = "16pt Calibri";
    @context.fillStyle = "#fff";
    @context.strokeStyle = "#333"
    @context.lineWidth = 3

    line = 1
    for stat in stats
      @context.strokeText stat, @x, (@y + (stats.length / 2 ) * -1 * 16 ) + (line * 16)
      @context.fillText stat, @x, (@y + (stats.length / 2 ) * -1 * 16 ) + (line * 16)
      line++


