# Luca.Application

A large single-page app generally needs some sort of globally available state tracking object, as well as something which acts as a single entry point into the application, and some sort of gateway to important objects.   

Luca.Application is a type of Viewport class which handles things such as:

- collection manager ( manages your collections for you ) 
- socket manager ( relays websocket events as Backbone.Events )
- url fragment router (`Backbone.Router`)
- global attributes and change event bindings
- page controller ( displays a unique page of the application) 
- active view, active sub view helpers

The Luca.Application stores its state in a `Backbone.Model`, which means you can `get()` and `set()` attributes directly on the application, as well as bind to change events on the application itself, and expect the same API you would from a normal model.

The ability to treat the Luca.Application instance as both a view, and a model allows for some clean patterns.  Your views can declaratively list its dependency on the global application state attributes.

```coffeescript
  _.def("MyView").extends("Luca.View").with
    name: "my_view"

    applicationEvents:
      "change:status" : "onStatusChange"

    onStatusChange: (app, currentStatus)->
      if currentStatus is "inactive"
        @markInactive()

    markInactive: ()->
      # mark this view inactive if the application
      # goes into inactive status


  app = Luca.getApplication()

  # this will cause the view named 'my_view' to 
  # to fire its markInactive() method
  app.set("status", "inactive")


```