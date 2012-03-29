Documentation and Sandbox
-------------------------
http://datapimp.github.com/luca


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
```ruby
# Gemfile
gem 'luca', :git => "https://github.com/datapimp/luca.git" 
```

javascript manifest

```javascript
//= require luca-ui
```

stylesheet manifest

```css
/*
 *= require luca-ui
*/
```

What does it get me?
--------------------
Luca provides an augmented View and Collection class which encompass all of the Backbone.JS best practices and optimizations that I have personally come up with developing some rather large Backbone.js apps on top of Rails.  

It assumes a style of progamming very similar to ExtJS where you define almost all of your 
views and components as large nested JSON structures.

Twitter Bootstrap
-----------------
Luca uses Twitter Bootstrap for a lot of styling, layout, CSS.  Not so much for the JS.  By default, bootstrap is enabled and Luca applies many of the necessary CSS classes, for example, in the Form View and in the various fields.  

To disable Bootstrap, you can do

```coffeescript
Luca.enableBootstrap = false
```

Container Library
-----------------------------
- split_view.  
  - a container for multiple views which get displayed side by side, or on top of one another, or in any other configuration.
   
- column_view. 
  - vertically split layout  
  - configurable widths via layout parameter
  - example: layout: '25/25/25/25' for 25% width

- card_view
  - gives you a wizard style layout
  - one active view at a time
- modal_view
  - wrap your views in a twitter bootstrap modal container 
- tab_view
  - similar to card view, but with an automatically rendered tab
    selector widget, using bootstrap's css 
- viewport
  - for full screen views

Component Library
-----------------
- grid_view
  - configurable headers / columns
  - custom renderers for cells
  - scrollable grid component.
  - automatically renders a backbone collection to a table

- form_view
  - build a complex form using any of the containers
  - bind to model
  - validation
  - text, checkbox, radio, select fields
  - bootstrap styling for css

The Base View Class.  Luca.View
-------------------------------
Luca.View adds a bunch of functionality to the stock Backbone.View.  

One thing to keep in mind, is any Luca.View subclass ( and in general
you should be doing this anyway ) should call its super class'
initialize method like such.

```coffeescript
  MyView = Luca.View.extend
    initialize: ()->
      # important to remember
      Luca.View.prototype.initialize.apply @, arguments
```

Rendering
---------
Because many large applications consist of many views nested within views

any Luca.View subclass, has special handling around the render() method.  

You automatically get beforeRender, afterRender methods on every View, and 
render() by default automatically appends the view's $(@el) to its @container

If you pass a deferrable property, which references a
Backbone.Collection, it will automatically bind the render() method you
define to the 'reset' event on the Collection, and will automatically
call fetch() for you.

Hooks
-----
Every Luca.View subclass which defines a hooks property, 
will automatically bind functions named according to a
CamelCaseConvention when these hooks are triggered.  For example

```coffeescript
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

```coffeescript
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

```coffeescript
Luca.register "my_component", "Luca.components.MyComponent"
```

If you don't do this, but follow the standard CamelCase name convention,
when a Luca Container comes across a component with a ctype
'my_unregistered_component' it will search all of the component
namespaces for 'MyUnregisteredComponent'

Component Namespaces
--------------------
To add your own views to the component registry, 

```coffeescript
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

``coffeescript
Luca.cache("my_component_name")
```

Luca Templates
--------------
If you use the luca gem in your rails app, and you include a file with
the .luca extension in an asset pipeline manifest, 
then you will have a JST style template which is based on jst, haml, and
ejs.

This allows you to do something client side like:

```haml
  %h1 Welcome To Luca
  <% if(include_list) { %>
  %ul
    %li <%= variable %>
  <% } %>
```

if you include this markup in sample.luca, you will have available to
you a function in the window.JST object.

The Grid View
-------------
The GridView provides a convenient way of turning a Backbone.Collection
into a scrollable table.  An example config:

```coffeescript
new Luca.components.GridView
  # default is true, but you can disable
  # the scrollable overflow component by passing false
  scrollable: true

  # you can set the height of the scrollable area
  height: 300

  # you can also set the width
  width: 500

  # This will make the component accessible by
  # Luca.cache('sample_grid')
  name: 'sample_grid'

  # handle the double click event on the row
  rowDoubleclick: (grid, record, rowIndex)->
    console.log "A row was double clicked"
  
  # handle a single click event on the row
  rowClick: (grid, record, rowIndex)->
    console.log "A row was single clicked"
  
  # This will create Luca.components.FilterableCollection
  store:
    base_url: '/api/endpoint'
    # convenient way of parsing an API who returns
    # the results in a nested array
    root: 'results'
  
  columns:[
    header: "Title"
    # by default, data will access the 'title' attribute on the model
    data: "title"
  ,
    header: "Publisher"

    # you can even access nested attributes
    data: 'publisher.name'
  ,
    header: "Subject"
    data: "subject"

    # or you can supply a custom renderer
    # which will pass you the model, column config, and index
    renderer: (row, column, columnIndex)->
      row.get("subject")?.name
  ]
```

Websocket Abstraction
---------------------
Luca.SocketManager is an abstraction
around various websocket services such as
faye.js, socket.io, now.js, etc.

It provides a common interface for adding
push / async functionality to Collections, 
Models, and the like, regardless of the
transport mechanism used.  

Simply bind to it, and any message that comes 
across the channel you subscribe to, will be
bubbled up as a Backbone.Event with the message
contents as your argument
