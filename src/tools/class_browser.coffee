# The Class Browser takes a map of your application's source code and the
# classes it defines and allows you to view and even edit the source code
# for a given class in the browser.

# We do this by combining the functionality of a Luca CollectionList View
# which inspects the Luca component registry, and a CodeMirror Editor instance
# which compiles coffeescript and evaluates it on the fly.  The Luca Framework
# is capable of updating all of the application components with the changes
# you make to their code.
_.def("Luca.tools.ClassBrowser").extends("Luca.containers.SplitView").with

  name: "class_browser"

  className: "luca-class-browser row"

  layout:["span3","span9"]
  # Composite views can be made up by specifying a list of components
  # either as a collection of object configurations, or as a list
  # of names corresponding to component types.  The various types of
  # Luca containers will handle rendering these components and arranging
  # them visually
  components:["class_browser_list","class_browser_detail"]

  # The container is responsible for handling communication between components.
  # We provide a nice API for this via the @componentEvents property.
  componentEvents:
    "class_browser_list component:loaded" : "loadSourceCode"

  bottomToolbar:
    buttons:[
      label: "Add New"
      icon: "plus"
      color: "primary"
      white: true
      align: 'right'
    ]

  loadSourceCode: (model, response)->
    Luca("class_browser_detail").loadComponent( model )