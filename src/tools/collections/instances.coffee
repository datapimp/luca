_.def("Luca.app.Instances").extends("Luca.Collection").with
  name:"instances"
  refresh:(options={})->
    models = _( Luca.registry.instances() ).map (instance)->
      cid: instance.cid
      name: instance.name
      ctype: instance.ctype
      displayName: instance.displayName || instance::displayName
      object: instance

    @reset(models, options)

  initialize:(initialModels=[],@options={})->
    @model = Luca.app.Instance
    Luca.Collection::initialize.apply(@,arguments)
