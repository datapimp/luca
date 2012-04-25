class Sandbox.Actor
  runTicks: (lastTime,timeDiff)->
    _( @ticks ).each (instruction)=>
      if _.isFunction(instruction)
        fn = instruction
        fn.apply(@,[lastTime,timeDiff])

      if _.isArray(instruction)
        if instruction[1]-- > 0
          instruction[0].apply(@,[lastTime,timeDiff,instruction[1]])
        else
          console.log "Should remove the tick", instruction, @ticks.length
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

  horizontalSpeed: ()->
    @velocity.horizontal * @hDirection

  verticalSpeed: ()->
    @velocity.vertical * @vDirection