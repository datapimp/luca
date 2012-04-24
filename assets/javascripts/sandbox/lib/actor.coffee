class Sandbox.Actor
  runTicks: (lastTime,timeDiff)->
    _( @ticks ).each (fn)=> fn.apply(@,[lastTime,timeDiff])

  eachTick: (fn)->
    @ticks ||= []
    @ticks.push(fn)

  horizontalSpeed: ()->
    @velocity.horizontal * @hDirection

  verticalSpeed: ()->
    @velocity.vertical * @vDirection