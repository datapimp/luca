collection = Docs.register        "Docs.collections.LucaDocumentation"
collection.extends                "Luca.Collection"
collection.defines
  model: Docs.models.Component
  appNamespace: "Luca"

  getSource: ()->
    Luca.util.resolve("#{ @appNamespace }.documentation")

  fetch: ()->
    models = _( @getSource() ).sortBy("class_name")
    found = {}
    models = for model in models when not found[ model.class_name ]
      found[ model.class_name ] = true
      model

    @reset(models)