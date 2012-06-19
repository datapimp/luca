# Component Definition

# In Luca, we define components like such:

_.def("App.collections.MyCollection").extends("Luca.Collection").with
  cache_key: "my_collection"
  storageEngine: "localStorage"

_.def("App.views.MyView").extends("Luca.core.Container").with
  name: "default_name_of_the_view"
  components:[
    ctype: "form_view"
  ,
    ctype: "grid_view"
    collection: "my_collection"
  ]
  initialize: (@options)->
    @_super("initialize", @, arguments)
    @customMethod()

# This achieves a few things:
#
# 0.  More pleasant to read
#
# 1.  All instances of App.views.MyView have a displayName property set
#     so we know upon inspection which class they inherit from
#
# 2.  All instances of App.views.MyView know that they extend Luca.components.FormView,
#     which allows us to use @_super() when overriding important framework methods, and
#     saves us from having to type Luca.core.Container.prototype.initialize.apply(@, arguments)
#     every time, on every method that it is needed
#
# 3.  App.views.MyView gets assigned a ctype: "my_view" so that we can use a declarative
#     JSON syntax for building complex components made up of smaller views, models, collections
#     simply by referencing their 'ctype'.  This allows Luca.Containers to create the nested components
#     for you
#
# 4.  Luca.registry knows about all of the components defined against it, as well as all instances of
#     the components, so with our in browser development tool we can modify the prototype of a view and
#     automatically refresh all running instances of the comoponent with updated code
#
# 5.  We don't actually have to create App.views.MyView right away, we could develop an intermediate layer
#     which stores the name of the defined view, who it extends from, and what customizations are being made to it
#     in some temporary buffer, and build our own dependency management layer which handles loading dependencies on demand

# Problem
#
# What is the best way to integrate a solution like requirejs, airdrop, stitch, or similar
# with the above style of component definition?