Documentation and Sandbox
-------------------------
http://datapimp.github.com/luca

What Is Luca?
-------------
Luca is a component / container library for Backbone.js which
provides you with some sensible defaults, some common components and layout helpers,
optimized View, Model, and Collection classes, and many other components needed for 
an application with a solid architecture.

Luca combines the functionality of other open source libraries as well, but you are not
required to use any of them if you don't like.  These libraries are:

Bootstrap by Twitter
Backbone-Query by David Tonge

Getting Started
---------------
Luca doesn't require you to use Twitter Bootstrap.  But, if you plan to, you will be
able to generate Bootstrap styled UI components completely in your Javascript.

Using With Rails Asset Pipeline
----------------

```ruby
  # Gemfile
  gem 'luca' 
```

In your layout:

```css
  /*
   *= stylesheet_include_tag 'luca-ui-bootstrap'
   *= stylesheet_include_tag 'luca-ui-development-tools'
  */
```

```javascript
  //= javascript_include_tag 'underscore', 'backbone', 'jquery', 'bootstrap.min.js'
  //= javascript_include_tag 'luca-ui.min.js', 'luca-ui-development-tools.min.js'
```

Using With Twitter Bootstrap ( development tools are optional )
----------------
```html
  <html>
    <head>
      <link rel="stylesheet" href='bootstrap.min.css' />
      <link rel="stylesheet" href='luca-ui.css' />
      <link rel="stylesheet" href='luca-ui-development-tools.css' />
    </head>
    <body>
      <script type='text/javascript' src="bootstrap.min.js" /> 
      <script type='text/javascript' src="luca-ui.min.js" /> 
      <script type='text/javascript' src="luca-ui-development-tools.min.js" /> 
    </body>
  </html>
```

Thanks To
---------
@jashkenas for making coffeescript, underscore, backbone.js.

@twitter for making bootstrap 2.0

@davidtonge for making backbone-query

@benchprep for giving me the freedom

@luca. who i spent only two minutes making and am exponentially more proud to have created.


https://raw.github.com/datapimp/luca/development-tools/assets/javascripts/dependencies/underscore-string.min.js
https://raw.github.com/datapimp/luca/development-tools/assets/javascripts/dependencies/backbond-string.min.js
