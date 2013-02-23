# The `Page` is a type of `Container` that has
# all of its subcomponents visible at one time, 
# and assigned to various `@regions` that exist
# in the `@layout` template which provide its 
# internal dom structure.
#
# #### Example Template (haml):
#       .page.layout.row-fluid{"data-layout"=>"layouts/left_nav_grid"}
#         .span3.region{"data-region"=>"left"}
#         .span9.region{"data-region"=>"right"}
#
# ### Example Page Configuration
#     page = new Luca.components.Page
#       layout: "layouts/left_nav_grid"
#       regions:
#         left: 
#           type: "navigation"
#         right:
#           type: "details"
#
page = Luca.register       "Luca.components.Page"
page.extends               "Luca.Container"

page.privateMethods
  # `Page`s are typically instantiated by a `Luca.components.Controller`
  initialize: (@options={})->
    @assignComponentsToRegions()
    @bodyTemplate = @options.layout || @layout
    @bodyTemplate ||= @options.template || @template
    Luca.Container::initialize.apply(@, arguments)

  # Takes the configuration specified in @regions
  # and creates a components hash out of them.
  assignComponentsToRegions: ()->
    @components ||= []

    assigned = for regionId, regionAssignment of @regions
      if _.isString(regionAssignment) and componentClass = Luca.registry.lookup( regionAssignment )
        regionAssignment = 
          component: regionAssignment
      else if _.isString(regionAssignment) and Luca.template(regionAssignment)
        regionAssignment = 
          bodyTemplate: regionAssignment

      _.extend(regionAssignment, container: "[data-region='#{ regionId }']")

    @components = assigned

page.publicConfiguration
  # The `@layout` property is the equivalent to specifying @bodyTemplate
  # but more semantic.  A `@layout` template is expected to contain DOM 
  # elements with a data attribute named `region` on it.  

  layout: undefined
  # The @regions property assigns containers ( by their type alias )
  # to DOM elements identified as regions within a layout template.
  #
  # #### Example:
  #     new Luca.components.Page
  #       regions: 
  #         left: "my_component"
  #         right: 
  #           type: "my_other_component"
  #           role: "component_role"
  #
  #   This will render an instance of MyComponent to this
  #   page's @$('[data-region-id="right"]') DOM element.
  regions: {}

page.register()
