collection = Docs.register  "Docs.collections.PublicGists"
collection.extends          "Luca.Collection"
collection.defines
  fetch: Backbone.Collection::fetch