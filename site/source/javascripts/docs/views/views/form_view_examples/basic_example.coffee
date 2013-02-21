form = Docs.register    "Docs.views.BasicFormViewExample"
form.extends            "Luca.components.FormView"

form.privateConfiguration
  defaults:
    type: "text"

form.contains
  label: "Text Field One"

form.register()  

