view = Docs.register    "Docs.views.ComponentEditor"
view.extends            "Luca.Container"

view.privateConfiguration
  rowFluid: true

view.contains
  span: 4
  name: "templates"
  type: "code_editor"
,
  span: 4
  name: "styles"
  type: "code_editor"
,
  span: 4
  name: "coffeescripts"
  type: "code_editor"

view.defines
  index: ()->
    1

