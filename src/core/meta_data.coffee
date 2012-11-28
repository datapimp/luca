Luca.registry.componentMetaData = {}

Luca.registry.getMetaDataFor = (componentName)->
  new MetaDataProxy(Luca.registry.componentMetaData[ componentName ])

Luca.registry.addMetaData = (componentName, key, value)->
  data = Luca.registry.componentMetaData[ componentName ] ||= {}
  data[ key ] = _(value).clone()
  data


class MetaDataProxy
  constructor: (@meta={})->
    @

  superClass: ()->
    Luca.util.resolve(@meta["super class name"])

  componentDefinition: ()->
    Luca.util.resolve(@meta["display name"])

  styleHierarchy: ()->
    _( @classHierarchy() ).map(Luca.util.toCssClass)
      
  classHierarchy: ()->
    list = [ @meta["display name"], @meta["super class name"]]

    proxy = @superClass()?.prototype?.componentMetaData?()

    until not proxy
      list = list.concat( proxy?.classHierarchy() )
      proxy = proxy.superClass()?.prototype?.componentMetaData?()

    _( list ).uniq()
