parseRegistry = ()->
  _( Luca.registry.classes ).map (className, ctype)->
    className: className
    ctype: ctype

_.def('Luca.collections.Components').extends('Luca.Collection').with

  cache_key: "luca_components"

  name: "components"

  url: ()->
    "/luca/components"

  initialize: (models, options)->
    Luca.Collection.cache @cache_key, parseRegistry()
    Luca.Collection::initialize.apply(@, arguments)

  filterByNamespace: (namespace)->
    @query
      className:
        $like: namespace