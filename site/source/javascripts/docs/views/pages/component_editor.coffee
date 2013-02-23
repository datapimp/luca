#= require_tree ./component_editor
#= require_self
view = Docs.register    "Docs.views.ComponentEditor"
view.extends            "Luca.Container"

view.contains
  type: "code_editor"

view.defines
  index: ()->
    true

