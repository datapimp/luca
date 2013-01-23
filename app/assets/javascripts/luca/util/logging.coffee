Luca.stats = {}

Luca.stats.reset = ()-> Luca.__stats = {}

Luca.stats.increment = (counter)->
  Luca.__stats ||= {}
  Luca.__stats[counter] ||= 1
  Luca.__stats[counter] = Luca.__stats[counter] + 1
  Luca.__stats[counter]  

Luca.stats.report = ()->
  console.log "Stats..."
  for key, value of Luca.__stats
    console.log key, value

Luca.warn = (args...)->
  return unless Luca.config.showWarnings is true

  if Luca.isComponent(@)
    args.unshift( @identifier() )

  args.unshift("Warning:")

  console.log args...
  
Luca.log = (args...)->
  if Luca.isComponent(@)
    args.unshift( @identifier() )

  console.log args...
