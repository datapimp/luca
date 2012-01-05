What Is Luca?
-------------
Luca is a component / container library for Backbone.js which
encompasses all of the best practices for laying out a large
app with many nested views and containers.

To run the sandbox:

* `bundle install`
* `rackup`

visit http://localhost:9292

Using it with Rails
-------------------
In your gemfile:

```
# Gemfile
gem 'luca', :git => "https://github.com/datapimp/luca.git" 

# javascript manifest
//= require luca-ui

# stylesheet manifest
/*
 *= require luca-ui
*/
```

What does it get me?
--------------------
If nothing else, JST/HAML/EJS templates using the .luca file extension.
Simply load up a bunch of .luca files in the Rails 3.1 Asset Pipeline
and you can have HAML views client side, with JST style <%=
interpolation %> and <% if(conditional_logic) %>

But in actuality, a standard component / container library for easily
handling layout, rendering, state tracking and switching for Backbone
Views.

And a whole hell of a lot more best practices for Backbone.JS apps.

Container Library
-----------------------------
- split_view.  
  - horizontally split layout.
- column_view. 
  - vertically split layout  
  - configurable widths via layout parameter
  - example: layout: '25/25/25/25' for 25% width
- card_view
  - gives you a wizard style layout
  - one active view at a time
- modal_view
  - simplemodal based container.
- tab_view
  - similar to card view, but with an automatically rendered tab
    selector widget
- viewport
  - for full screen views

Component Library
-----------------
- grid_view
  - configurable headers / columns
  - custom renderers for cells
  - scrollable grid component.
  - automatically renders a backbone collection to a table
  - deferrable rendering through a Backbone.Collection or
    Luca.FilterableCollection

- form_view
  - build a complex form using any of the containers
  - bind to model
  - validation
  - text, checkbox, radio, select fields

The Base View Class.  Luca.View
-------------------------------
Luca.View adds a bunch of functionality to the stock Backbone.View.  

One thing to keep in mind, is any Luca.View subclass ( and in general
you should be doing this anyway ) should call its super class'
initialize method like such.

```
  MyView = Luca.View.extend
    initialize: ()->
      # important to remember
      Luca.View.prototype.initialize.apply @, arguments
```

Rendering
---------
Any Luca.View subclass, has special handling around the render() method.
You automatically get beforeRender, afterRender binding for free.

If you pass a deferrable property, which references a
Backbone.Collection, it will automatically bind the render() method you
define to the 'reset' event on the Collection, and will automatically
call fetch() for you

Hooks
-----
Every Luca.View subclass which defines a hooks property, 
will automatically bind functions named according to a
CamelCaseConvention when these hooks are triggered.  For example

```
Luca.components.GridView = Luca.View.extend
  hooks:[
    "before:grid:render" 
  ]

...

MyGridView = Luca.components.GridView.extend
  ...
  beforeGridRender: ()->
    console.log "We get called automatically"
```

Component Registry
------------------
Component views in Luca register themselves with the Component Registry,
with a unique identifier.  For example, the ColumnView has a "ctype" of
column_view, and the SplitView has a "ctype" of split_view  

This allows us to build complex, nested configurations of
containers like such:

```
  new Luca.containers.Viewport
    components:[
      layout: '50/50',
      ctype: 'column_view',
      components:[
        ctype: 'split_view' 
      ,
        ctype: 'split_view'
      ]
    ]
```

And using lazy instantiation, these nested containers won't be 
created until they are needed.  

To register a component in the registry, you can do

``` 
Luca.register "my_component", "Luca.components.MyComponent"
```

If you don't do this, but follow the standard CamelCase name convention,
when a Luca Container comes across a component with a ctype
'my_unregistered_component' it will search all of the component
namespaces for 'MyUnregisteredComponent'

Component Namespaces
--------------------
To add your own views to the component registry, 

``` 
  MyApp.views.CustomView = Backbone.View.extend
    ...

  Luca.registry.addNamespace "MyApp.views"
```

This will allow you to use the "ctype" of "custom_view" to nest
this view within a container.

Component Caching
-----------------
By defining a component with a 'name' attribute, that component will
be accessible by 

```
Luca.cache("my_component_name")
```

Luca Templates
--------------
If you use the luca gem in your rails app, and you include a file with
the .luca extension in an asset pipeline manifest, 
then you will have a JST style template which is based on jst, haml, and
ejs.

This allows you to do something client side like:

```
  %h1 Welcome To Luca
  <% if(include_list) { %>
  %ul
    %li <%= variable %>
  <% } %>
```

if you include this markup in sample.luca, you will have available to
you a function in the window.JST object.
