collection = Docs.register        "Docs.collections.FrameworkDocumentation"
collection.extends                "Luca.Collection"
collection.defines
  model: Docs.models.Component
  fetch: ()->
    models = _(Luca.documentation).sortBy("class_name")
    found = {}
    models = for model in models when not found[ model.class_name ]
      found[ model.class_name ] = true
      model

    @reset(models)