## once, defer

`Luca.Events` provides you with some additional event binding sugar.

*once*

`once` is how you would run one function in response to an event, but only once.

```coffeescript
  view = new Luca.View()

  view.once "event:gets:triggered", ()->
    alert('sup baby')

  view.trigger("event:gets:triggered")
```

*defer until*

`defer` is similar to `once', but with syntax I like a little better:

```coffeescript
  _.def("MyView").extends("Luca.View").with
    initialize: ()->
      @defer(@setup).until("event:gets:triggered")
```

If you want to defer a callback until an event gets triggered on some other object:

```
  @defer(@setup).until(@someObject,"triggers:an:event")
```

## Component Bindings

Luca provides a number of configuration API for its components
which facilitate the binding of a component's methods to events that
occur on instances of the CollectionManager and Application objects. 

For Luca.core.Container classes there is also a component events 
binding API that allows you to declare in your container which events
to listen for on that container's components  

## Auto Context Binding For Event Handlers

By setting the @bindAllEvents property to true on your prototype definitions,
all event handler methods on your view will automatically be bound to the context
of the view.  

```coffeescript
  _.def('MyApp.views.AutoBoundView').extends('Luca.View').with
    bindAllEvents: true
    events:
      "click a.btn" : "clickHandler"
      "click a.btn.btn-danger" : "dangerHandler"
    initialize:()->
      # You no longer need to do this
      # if you want to have these handlers run
      # in the context of this view
      _.bindAll @, "clickHandler", "dangerHandler"

```

## Collection Manager Event Binding

Luca Applications which use the Luca.CollectionManager have the benefit of
a declarative event binding syntax which allows you bind to events on collections
by their name.  This saves you from having to create a reference to the collection
in some method, and setup a callback binding.  By simply providing a @collectionEvents
configuration property on your views, you can eliminate a lot of boilerplate in your components.

The format of the @collectionEvents hash is a key which is made up of the collection's name and the event
separated by a space, and either a function or a name of a method on your view.

```coffeescript
  SamplesCollection = Backbone.Collection.extend
    name: "samples"
    url: "/api/v1/samples"

  _.def("MyView").extends("Luca.View").with
    # NOTE: you may omit this property and
    # it will use Luca.CollectionManager.get() to 
    # get the main instance.
    collectionManager: "main"

    collectionEvents:
      "samples reset" : "samplesResetHandler"

    samplesResetHandler: (collection)->
      if collection.length > 1
        @doSomething() 
```
## Application Event Binding

Similar to the CollectionManager event binding API, there is a similar API for binding to the global application
object. Most applications will have a single application instance, that is either available on the global object
or through a call to `Luca.getApplication()`.

It is in the Application instance that global state tracking should occur.  Should your views want to respond to changes
in global application state, you can provide an @applicationEvents configuration property. The format is a key value
pair, where the key represents the event being triggered by the application, and the value is a name of a method on 
your view or an anonymous function.

```coffeescript
  App = new Luca.Application
    name: "main"

    defaultState:
      currentMode: "solid"

  _.def("AppBoundView").extends("Luca.View").with
    # NOTE: you may omit this and it will use Luca.getApplication()
    app: "main"

    applicationEvents:
      "change:currentMode" : "modeChangeHandler"

    modeChangeHandler: ()->
      @doSomething()
```

## Luca.core.Container Component Events

Containers are special views whose only purpose is to render multiple components in a specified configuration, and handle
all of the communication between the components.  This is what allows Luca components to be extremely re-usable, because they
never know about views that exist outside of them.

By providing a @componentEvents configuration property on your container, you can bind to events on the components in your container
and relay information about them to other members of the container. The format is a key value pair where the key is a string which
contains the name of the component and the event it triggers, separated by a space.  The value is a name of a method on your view or an anonymous function.

```coffeescript
  # ctype = component_one
  _.def("ComponentOne").extends("Luca.View").with
    name:"one"
    eventHandler: ()->
      @trigger "custom:event"

  # ctype = component_two
  _.def("ComponentTwo").extends("ComponentOne").with
    name:"two"
    eventHandler: ()->
      @trigger "some:other:event"

  _.def("MyContainer").extends("Luca.core.Container").with
    components:["component_two","component_one"]
    componentEvents:
      "one custom:event" : "customEventHandler"

    # when component named one fires an event
    # we can handle it here, pass it to two, whatever
    customEventHandler: ()->
      Luca('two').eventHandler()
```