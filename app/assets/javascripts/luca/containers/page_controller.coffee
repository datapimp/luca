# The PageController container is a special type of container whose components or pages
# will always monopolize the entire element's display and where only one page or component
# will be visible at a time.  The PageController is typically going to be at the very root
# of every application, and will be directly integrated with the application's router. 
# A typical application hierarchy will be an abstract `Viewport` with a single top level
# `PageController` named 'main_controller'. 
#
#       - Viewport / Application
#         - Router. ( maps urls to named pages on the controller )
#         - Main Page Controller
#           - Pages
#             - Named views / containers
view = Luca.register    "Luca.containers.PageController"
view.extends            "Luca.Container"

view.privateMethods
  initialize: (@options={})->
    @components ||= @pages || @options.pages
    for component in @components
      component.components ||= component.pages

    Luca.Container::initialize.apply(@, arguments)

view.register()  

