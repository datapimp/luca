view = Docs.register      "Docs.views.GridLayoutViewExample"
view.extends              "Luca.components.GridLayoutView"

view.publicConfiguration
  collection: "github_repositories"
  itemPerRow: 4
  paginatable: 12
  itemTemplate: "github_repository"

view.publicMethods
  runExample: ()->
    @getCollection().fetch()

view.register()
