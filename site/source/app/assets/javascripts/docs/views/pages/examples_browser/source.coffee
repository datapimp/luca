view = Docs.register  "Docs.views.ExampleSource"
view.extends          "Luca.View"
view.defines
  tagName: "pre"
  className: "prettyprint pre-scrollable"
  collection: "docs_documentation"
  beforeRender: ()->
    component = @collection.detect (component)=>
      component.get("type_alias") is @example

    @$el.html( component.get("source_file_contents") )
    window.prettyPrint()

