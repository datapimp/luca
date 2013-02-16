components = Luca.register   "Luca.collections.Components"
components.extends            "Luca.Collection"

components.configuration
  model: Luca.models.Component
  namespace: "components"

components.classMethods
  generate: ()->
    @collection = new Luca.collections.Components()
    @collection.fetch()
    @collection

components.defines
  findByClassName: (class_name)->
    @detect (model)->
      model.get("class_name") is class_name
        
  filterByNamespace: (namespace)->
    @query
      class_name: $like: namespace

  classNames: ()->
    @pluck('class_name')

  groupsInsideOf: (namespace)->
    classes = @filterByNamespace(namespace)
    unique = {}
    
    for component in classes when not unique[ component.componentGroup() ]?
      if component.get("class_name")?.split('.')?.length > 2
        unique[ component.componentGroup() ] = component.componentGroup().split('.')[1] 

    _.values(unique)

  namespaces: ()->
    list = _( @classNames() ).map (className)->
      className.split('.')[0]

    _( list ).uniq()

  fetch: (options={})->
    @populateFromRegistry(options)

  comparator: (model)->
    model.get("class_name")
      
  populateFromRegistry: (options={})->
    registeredClassNames = for class_name in Luca.registry.classes(true)
      {class_name, name: class_name}

    if options.namespace
      registeredClassNames = for model in registeredClassNames when model.name.match(options.namespace)
        model

      
    @reset(registeredClassNames, options={})
