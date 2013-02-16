page = Docs.register      "Docs.views.Home"
page.extends              "Luca.components.Page"
page.configuration
  layout: "layouts/main"
  regions: 
    left: "left_navigation"
    right: "pages/home"

page.defines
  index: ()->
    @trigger "index"

page.register()