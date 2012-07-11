# Luca.View

The `Luca.View` class is the base class for Luca components. A number of patterns and optimizations that are helpful in your view classes have been extracted into the base class.

## Hooks

The concept of hooks in Luca is that components can trigger events, and we can bind to them as normally, and that this is good.  However, where it is more useful or cleaner to just define methods that represent some part of the component lifecycle, we provide a configuration API for doing that.

```coffeescript
  _.def("Luca.View").extends("Backbone.View").with
    hooks:[
      "after:initialize"   # => @afterInitialize
      "before:render"      # => @beforeRender
      "after:render"       # => @afterRender
      "first:activation"   # => @firstActivation
      "activation"         # => @activation
      "deactivation"       # => @deactivation
    ]
```

Any Luca.View which defines an `@afterInitialize` method, or a `@beforeRender` method, will automatically call that method when the corresponding event is triggered.  

**Note on extending hook methods**

If you want to maintain the functionality of the component you are extending from, you will have to remember to call the prototype method like such:

```coffeescript
  _.def("MyView").extends("Luca.View").with
    beforeRender: ()->
      @_super("beforeRender", @, arguments)
      
      # or, if you prefer 
      Luca.View::beforeRender?.apply(@, arguments)
```

## Luca.template helper

`Luca.template()` is a util function which allows you reference your client side template system.  It accepts a name of a template ( which, if not found, it will attempt to match one for you ) and an object of interpolations to pass to the template function

`Luca.available_templates()` is a util function, useful for debugging, to see which templates are available to you.

## Configuration Options

- `@additionalClassNames` - an array of CSS classes to apply to the view's `@$el`.  This is helpful for inheritance of views.

- `@name` - Setting a name property on your view, will allow you to reference the instance of that view later.

```coffeescript
  view = new Luca.View(name:"my_view")
  
  Luca("my_view") is view # => true

```

- `@wrapperClass` - automatically wraps the view with a div with this as the CSS class.

- `@bodyTemplate` - will apply the content of the template to your view 

- `@bindAllEvents` - true or false automatically bind all event handler methods to the context of your view's instance

- `@applicationEvents` - configuration similar to the DOM `@events` configuration on Backbone.View.  Used to bind to events triggered by the `Luca.Application.get()` object.  You can customize which application you use by setting `@app` to either reference the app, or to the name of a given application.

- `@collectionEvents` - configuration similar to the DOM `@events` configuration on Backbone.View.  Used to bind to events triggered by the `Luca.CollectionManager.get()` object.  

## Luca.View::$bodyEl() 

In your `Luca.View` definitions, If you set the `@bodyTemplate` property to one of the available templates, then on `initialize` the view will set the HTML of its DOM element to the contents of the template.

This is useful in cases where there is a fair amount of structural, or otherwise static DOM content in your view, and one of the standard `Luca.core.Container` components is not suited for what you want to do.  The `Luca.components.Panel` view is basically just a `Luca.View` which has additional DOM containers for footers and headers.  It accomplishes this through the use of the `@bodyClassName` and `@bodyTagName` properties.  

`@bodyClassName` and `@bodyTagName` work the same way the `@className` and `@tagName` properties work on standard Backbone views.  They are used to create a DOM element via `Backbone.View.prototype.make(@bodyTagName,class:@bodyClassName,id:@bodyId` 

If you use `view.$bodyEl()` instead of the standard `view.$el()` that ships with Backbone, all of the standard DOM manipulation methods available will be scoped to the CSS selector that corresponds to the actual body element of your view.

## Deferrable Rendering

The jury is still out as to whether or not deferrable rendering is a useful pattern, or whether it is too complex. The use case it was trying to optimize is for views which can only be rendered in response to an event being fired on another object.  Such as `Backbone.Collection::fetch`.  

If this is what you are doing, then this feature is for you.

The options available for views which use the `@deferrable` property are as follows:

- `@deferrable` - if you set a reference to an object, such as a collection, on the @deferrable property, then the call to `view.render()` will actually just set up an event binding to the `reset` event of your collection, and it will automatically call `fetch` for you on that collection.  

If you set `@deferrable` to true then the view will expect a `@collection` property.

- `@deferrable_method`  - a call to `@render()` on a `@deferrable` view will automatically call this method on the `@deferrable` object.

- `@deferrable_trigger` - if you use the deferrable system , by default, it will automatically call the `@deferrable_method` on your `@deferrable` object when you call `@render()`.  However, if you want to defer this method being fired even later, just set the `@deferrable_trigger` property to whatever trigger your view will listen for.

A useful example would be for views which get rendered hidden, and activated if and only if the user does a specific action.  ( For example, a TabView activating a secondary tab ).  If that action triggers an event, and you want to delay the render process if and only if that event is triggered.

## Helpers

- `view.$template` calls `view.$.html()` on your view, with whatever is returned from the template.  Delegates to `Luca.template(templateName, customizationHash)`

- `view.$wrap` the same as `view.$el.wrap()` -- accepts a CSS class name string, or a DOM element

- `view.$append` the same as `view.$el.append()`

- `view.$container` - references `$( view.container )`.  Note: the @container property is set on a view when it belongs to the `@components` property of a `Luca.core.Container` instance.  It is just a standard CSS selector.

- `view.registerEvent()` manipulates your `@events` configuration on your Backbone.View and then calls `@delegateEvents` to make sure they are live.

## Backbone Component Helpers

Views which have properties on them referencing other views, models, or collections, can access those objects by calling `view.models()` or `view.views()` or `view.collections()`.  This is mainly useful for introspection, debugging, or what not.