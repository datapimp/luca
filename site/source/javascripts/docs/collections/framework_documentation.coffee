collection = Docs.register        "Docs.collections.FrameworkDocumentation"
collection.extends                "Luca.Collection"
collection.defines
  fetch: ()->
    @reset(Luca.documentation)