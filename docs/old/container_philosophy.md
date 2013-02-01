# Container Views in Luca.js

Containers are types of views which are made up of one or more components.  A component
is simply another Backbone.View, Luca.View, or one of their descendants.

The purpose of a Container is to faciliate the communication between the components.

The classic example is a FormView.  A FormView is a component which inherits from
Luca.core.Container and is made up of many Field components, and facilitates the communication between 
the fields and a Backbone.Model.  The internal implementation of the model and field classes should never know 
or reference any other component.  This is the job of the FormView.

## Containers are meant to generate your structural DOM elements

Containers generate the structural DOM elements which wrap the individual components, and the container renders these components to the DOM element
that is assigned to it.  The various types of containers you use will each
have their own internal logic for the way these DOM elements are laid out, displayed, hidden, showed, etc.  

For example, a ColumnView will show two components side by side and assign
each one to its own DIV element and use css to lay those columns out as configured.
A CardView will assign each component to a DIV element, show the active card, and hide the rest.

## Layout and Rendering Customization

The call to `render()` on a container will start a rendering chain on all of the nested components.  You can customize this to your hearts content by tapping into
the method chain. 

All render() methods on Luca.View are wrapped and will trigger `before:render` and `after:render` events, as well as call any beforeRender or afterRender methods defined on your component. For more about this, see the section about hooks on Luca.View.

The chain started by a call to `container.render()` is as follows:

```coffeescript
  beforeRender()

  # layout functions
  @trigger "before:layout" # => or run beforeLayout() if it exists
  @prepareLayout()
  @trigger "after:layout" # => or run afterLayout() if it exists

```

prepareLayout is an internal method on Luca.core.Container which will iterate
over each of your components and call applyDOMconfig passing your components
configuration to this function.  This will create a DOM element and apply
any configured inline style declarations, assign a DOM id, css class, as well
as some data attributes to the element.

It will put each DOM container elemement in a @componentContainers property on
your container object.

After prepareLayout is the components cycle:

```coffeescript
  @trigger "before:components" # => or run beforeComponents() if it exists
  @prepareComponents()
  @createComponents()
  @trigger "before:render:components"
  @renderComponents()
  @trigger "after:components" # => or run afterComponents() if it exists
```

## A Note on Container inheritance

If you end up customizing the methods above in the render chain, you may
want to call the same method on the component you are inheriting from.  Luca
provides some syntactic sugar for this:

```coffeescript
  _.def("MyContainer").extends("Luca.core.Container").with
    prepareLayout: ()->
      # This is the normal way you would do this
      Luca.core.Container::prepareLayout.apply(@, arguments)

      # This is the sugary version which you get if you
      # use the _.def or Luca.define method for declaring
      # your prototype definitions
      @_super("prepareLayout", @, arguments)

      @applyMyOwnLayoutCustomizations()
```

## The `ctype` property

Every Luca.View which gets registered through the Luca.registry will have a ctype value associated with it. The
ctype property is used when adding components to a Container.

```coffeescript
  _.def("ComponentOne").extends("Luca.View").with()

  _.def("ComponentTwo").extends("Luca.View").with()

  _.def("ContainerOne").extends("Luca.core.Container").with
    components:[
      ctype: "component_one"
      overriddenValue: "customValue"
    ,
      ctype: "component_two"
      thisGetsPassedToInitialize: "yep" 
    ]
```

In the above example, a View class of ContainerOne will be available, and
any time you create an instance of it and call render on it, it will create
instances of ComponentOne and ComponentTwo.

Note, if you do not need to customize any of the properties on the component
views, you can just pass an array of ctype strings.

```coffeescript
  _.def("ContainerTwo").extends("Luca.core.Container").with
    components:["component_one","component_two"]
```

## Convenience Methods on the Container

You have access to several methods which work on the components which belong to your views.  These methods are:

- pluck : plucks an attribute for each component
- invoke: invokes a method for each component
- each: run the passed iterator on eachComponent, recursively.  You can turn off the recursion by passing false as your second argument.
- indexOf: get the index of a component by it's name property
- selectByAttribute: selects all components whose attribute matches a given value
