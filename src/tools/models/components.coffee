parseRegistry = ()->
  _( Luca.registry.classes ).map (className, ctype)->
    className: className
    ctype: ctype

_.def('Luca.collections.Components').extends('Luca.Collection').with

  name: "components"

  url: ()->
    "/luca/components"

  initialize: (models, @options={})->
    Luca.Collection::initialize.call(@, parseRegistry(), @options)

  filterByNamespace: (namespace)->
    @query
      className:
        $like: namespace