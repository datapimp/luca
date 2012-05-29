parseRegistry = ()->
  _( Luca.registry.classes ).map (className, ctype)->
    className: className
    ctype: ctype

_.def("Luca.models.Component").extends("Luca.Model").with
  root: ()->
    @get("className").split('.')[0]

  namespace: ()->
    return "" unless @get("className")?

    parts = @get("className").split('.')
    parts.pop()
    parts.join "."

_.def('Luca.collections.Components').extends('Luca.Collection').with
  model: Luca.models.Component

  cachedMethods: [
    "namespaces"
    "classes"
    "roots"
  ]

  cache_key: "luca_components"

  name: "components"

  url: ()->
    "/luca/components"

  initialize: (models, options)->
    Luca.Collection.cache @cache_key, parseRegistry()
    Luca.Collection::initialize.apply(@, arguments)

  classes: ()->
    _.uniq( @pluck "className" )

  roots: ()->
    _.uniq( @invoke("root") )

  namespaces: ()->
    _.uniq( @invoke("namespace") )

  asTree: ()->
    classes = @classes()
    namespaces = @namespaces()
    roots = @roots()

    tree = _( roots ).inject (memo,root)->
      memo[ root ] ||= {}
      regexp = new RegExp("^#{ root }")
      memo[root] = _( namespaces ).select (namespace)->
        regexp.exec(namespace) and _( namespaces ).include(namespace) and namespace.split('.').length is 2
      memo
    , {}

    _( tree ).inject (memo, namespaces, root)->
      memo[root] = {}
      _( namespaces ).each (namespace)->
        memo[root][namespace] = {}
      memo
    , {}