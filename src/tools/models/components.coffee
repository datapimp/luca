_.def("Luca.models.Component").extends("Luca.Model").with
  url: ()->
    "/components?component=#{ @get('className') }"

  root: ()->
    @get("className").split('.')[0]

  className: ()->
    @get("className")

  instances: ()->
    Luca.registry.findInstancesByClassName @className()

  definitionPrototype: ()->
    @definition()?.prototype 

  parentClasses: ()->
    Luca.parentClasses( @className() )  

  definition: ()->
    Luca.util.resolve @className()

  namespace: ()->
    return "" unless @get("className")?

    parts = @get("className").split('.')
    parts.pop()
    parts.join "."


# The Collection

_.def('Luca.collections.Components').extends('Luca.Collection').with
  model: Luca.models.Component

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

  url: ()->
    "/luca/components"

  initialize: (models, options)->
    Luca.Collection.cache @cache_key, Luca.registry.classes()

    Luca.Collection::initialize.apply(@, arguments)
  
  collections: ()->
    @select (component)-> Luca.isCollectionPrototype( component.definition() )

  modelClasses: ()->
    @select (component)-> Luca.isModelPrototype( component.definition() )

  views: ()->
    @select (component)-> Luca.isViewPrototype( component.definition() )

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