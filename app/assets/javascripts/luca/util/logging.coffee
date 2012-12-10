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
