page = Docs.register      "Docs.views.Home"
page.extends              "Luca.components.Page"
page.configuration
  template: "pages/home"

page.defines
  index: ()->
    @trigger "index"

page.register()