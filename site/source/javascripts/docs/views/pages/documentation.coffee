#= require_tree ./documentation
#= require_self
page = Docs.register      "Docs.views.Documentation"
page.extends              "Luca.components.Page"
page.configuration
  layout: "layouts/main"
  regions: 
    left: "class_browser"
    right: "details"
    
page.register()