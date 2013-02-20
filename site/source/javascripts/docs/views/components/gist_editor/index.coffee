#= require_tree ./components
#= require_self
editor = Docs.register    "Docs.components.GistEditor"
editor.extends            "Luca.Container"

editor.contains
  role: "browser"
