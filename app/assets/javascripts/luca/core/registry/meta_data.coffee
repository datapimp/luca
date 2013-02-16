Luca.registry.componentMetaData = {}

Luca.registry.getMetaDataFor = (componentName)->
  new MetaDataProxy(Luca.registry.componentMetaData[ componentName ])

Luca.registry.addMetaData = (componentName, key, value)->
  data = Luca.registry.componentMetaData[ componentName ] ||= {}
  data[ key ] = _(value).clone()
  data

class MetaDataProxy
  constructor: (@meta={})->
    _.defaults @meta, 
      "super class name" : ""
      "display name" : ""
      "descendants": []
      "aliases": []
      "public interface" : []
      "public configuration" : [] 
      "private interface" : []
      "private configuration" : [] 
      "class configuration" : []
      "class interface" : []

  className: ()->
    @meta["display name"]
  superClass: ()->
    Luca.util.resolve(@meta["super class name"])

  componentDefinition: ()->
    Luca.registry.find @meta["display name"]

  componentPrototype: ()->
    @componentDefinition()?.prototype

  prototypeFunctions: ()->
    _.functions( @componentPrototype() )

  classAttributes: ()->
    _.uniq @classInterface().concat( @classConfiguration() )

  publicAttributes: ()->
    _.uniq @publicInterface().concat( @publicConfiguration() )

  privateAttributes: ()->
    _.uniq @privateInterface().concat( @privateConfiguration() )

  classMethods: ()->
    list = _.functions( @componentDefinition() )
    _( list ).intersection( @classAttributes() )

  publicMethods: ()->
    _( @prototypeFunctions() ).intersection( @publicAttributes() )

  privateMethods: ()->
    _( @prototypeFunctions() ).intersection( @privateAttributes() )

  classConfiguration: ()->
    @meta["class configuration"]

  publicConfiguration: ()->
    @meta["public configuration"]

  privateConfiguration: ()->
    @meta["private configuration"]

  classInterface: ()->
    @meta["class interface"]

  publicInterface: ()->
    @meta["public interface"]

  privateInterface: ()->
    @meta["private interface"]

  triggers: ()->
    @meta["hooks"]

  hooks: ()->
    @meta["hooks"]

  descendants: ()->
    @meta["descendants"] 
  styleHierarchy: ()->
    list = _( @classHierarchy() ).map (cls)->
      Luca.util.toCssClass(cls, 'views', 'components', 'core','fields','containers')

    _( list ).without('backbone-view','luca-view')
      
  classHierarchy: ()->
    list = [ @meta["display name"], @meta["super class name"]]

    proxy = @superClass()?.prototype?.componentMetaData?()

    until not proxy
      list = list.concat( proxy?.classHierarchy() )
      proxy = proxy.superClass()?.prototype?.componentMetaData?()

    _( list ).uniq()
