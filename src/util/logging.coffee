Luca.log = (args...)
  if Luca.isComponent(@)
    args.unshift( @identifier() )

  console.log args...
