# A Twitter Bootstrap compatible navigation bar.  The Luca.Application
# and Luca.containers.Viewport class both have configuration options for
# creating navbar components in the header and footer of the viewport.
#
# #### Example of an Application with a Navbar
# ##### Component Definition
#       # Navigation Component
#       navBar = Luca.register  "App.views.TopNavigation"
#       navBar.extends          "Luca.components.NavBar"
#       navBar.defines
#         brand: "My App"
#         # for white on black
#         inverse: true
#
# We are able to reference the component we just defined in the
# configuration of the Application, simply by using it's 
# type alias `top_navigation`
#
#       # Application Component
#       app = Luca.register       "App.Application"
#       app.extends               "Luca.Application"
#       app.defines
#         topNav: "top_navigation"
#
navBar = Luca.register "Luca.components.NavBar"
navBar.extends         "Luca.View"

navBar.publicConfiguration
  # Specify whether the navbar is supposed to be fixed
  # the way Twitter bootstrap navbar can be.
  fixed: true

  # Valid options are 'top', 'bottom'.  Only valid when `@fixed is true`
  position: 'top'

  # Specify whether the navbar should use the fluid grid. 
  # Usually the same as your Viewport setting.
  fluid: undefined

  # What content do you want to show in the logo area of the
  # standard bootstrap nav
  brand: "Luca.js"

  # Specifies an optional template to use for the navigation menu
  # content.  Whatever you specify will be rendered inside of the 
  # collapsible container inside of the standard bootstrap nav.
  template: undefined

navBar.privateConfiguration
  className: 'navbar'
  bodyTemplate: 'nav_bar'
  bodyClassName: 'luca-ui-navbar-body'

  beforeRender: ()->
    @$el.addClass "navbar-fixed-#{ @position }" if @fixed
    @$el.addClass "navbar-inverse" if @inverse is true

    if @brand?
      @$('.brand').attr('href', @homeLink || '#')
      @$('.brand').html(@brand)

    if @template
      @navContainer().html Luca.template(@template, @)

    if !!(@fluid || Luca.getApplication()?.fluid)
      @content().addClass( Luca.config.fluidWrapperClass )
    else
      @content().addClass( Luca.config.wrapperClass )

  render: ()->
    @

  navContainer: ()->
    @$('.luca-ui-navbar-body .nav-collapse')

  content: ()->
    @$('.luca-ui-navbar-body').eq(0)


navBar.register()