Luca is a component / container library for Backbone.js which
encompasses all of the best practices for laying out a large
app with many nested views and containers.

To run the sandbox:

* `bundle install`
* `rackup`

visit http://localhost:9292

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
