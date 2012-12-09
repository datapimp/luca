# For when I want to change the name of a component
Luca.util.deprecateComponent = (previous, newName)-> 
  msg = _.template "#{ previous } has been renamed to #{ newName }.  Please update your definitions."

  Luca.registry.componentAliases[ newName ] ||= []
  Luca.registry.componentAliases[ newName ].push( previous )

  Luca.registry.deprecatedComponents[ previous ] = 
    message: msg({previous,newName}) 
    newName: newName

Luca.util.checkDeprecationStatusOf = (componentName)->
  if replacement = Luca.registry.deprecatedComponents[ componentName ]
    Luca.log( replacement.message )
    return replacement.newName

  componentName
