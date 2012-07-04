_.def('Luca.app.Components').extends('Luca.Collection').with

  cachedMethods: [
    "namespaces"
    "classes"
    "roots"
    "views"
    "collections"
    "models"
  ]

  cache_key: "luca_components"

  name: "components"

  initialize: ()->
    @model = Luca.app.Component
    Luca.Collection::initialize.apply(@, arguments)
    
  url: ()->
    "/luca/source-map.js"

  collections: ()->
    @select (component)-> Luca.isCollectionPrototype( component.definition() )

  modelClasses: ()->
    @select (component)-> Luca.isModelPrototype( component.definition() )

  views: ()->
    @select (component)-> Luca.isViewPrototype( component.definition() )

  classes: ()->
    _.uniq( @pluck("className") )

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