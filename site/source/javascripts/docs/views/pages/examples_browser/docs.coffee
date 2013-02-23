view = Docs.register  "Docs.views.ExampleDocs"
view.extends          "Docs.views.ComponentDocumentation"
view.defines
  collection: "docs_documentation"
  displayHeader: true
  beforeRender: ()->
    component = @collection.detect (component)=>
      component.get("type_alias") is @example

    if component?
      @loadComponent(component)

