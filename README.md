Luca is a component / container library for Backbone.js which
encompasses all of the best practices for laying out a large
app with many nested views and containers.

To run the sandbox:

* `bundle install`
* `rackup`

visit http://localhost:9292

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
