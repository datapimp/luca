_.def("Luca.models.Component").extends("Luca.Model").with
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
