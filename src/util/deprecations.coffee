# For when I want to change the name of a component
Luca.util.deprecateComponent = (previous, newName)-> 
  Luca.registry.deprecatedComponents[ previous ] = 
    message: Luca.registry.deprecationMessages.default({previous,changed}) 
    newName: newName

Luca.util.checkDeprecationStatusOf = (componentName)->
  if replacement = Luca.registry.deprecatedComponents[ componentName ]
    newName = replacement.newName
    Luca.log( replacement.message )
