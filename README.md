# Component Driven Architecture with Luca.JS

Luca is a component architecture framework based on Backbone.js, which includes
many development helpers, classes, patterns, and tools needed to build scalable
and clean single page applications.

It uses twitter bootstrap compatible markup and css naming conventions, 
making it possible to generate completely styled user interfaces with JSON alone.

Luca combines the functionality of other open source libraries as well, but you are not
required to use any of them if you don't like.

### Dependencies

- [Bootstrap by Twitter](https://twitter.github.com/bootstrap)
- [Backbone-Query by David Tonge](https://github.com/davidgtonge/backbone_query)
- [Underscore String by Esa-Matti Suuronen](https://github.com/epeli/underscore.string)

### Development Tool Dependencies:

- [CodeMirror IDE](https://codemirror.net)
- [CoffeeScript Compiler](https://coffeescript.org)


### Using With Rails Asset Pipeline

```ruby
  # Gemfile
  gem 'luca' 
```

In your css manifest:

```css
  /*
   *= require 'luca-ui-full'
   *= require 'luca-ui-development-tools'
  */
```

All Javascript Dependencies:

```javascript
   //= require 'underscore'
   //= require 'underscore-string.min'
   //= require 'jquery'
   //= require 'backbone'
   //= require 'bootstrap.min.js'
   //= require 'luca-ui.min.js'
   //= require 'luca-ui-development-tools.min.js'
```

Or you can just use the dependencies we rely on.  Latest backbone.js, underscore.js, underscore.string.js, twitter boostrap js and css:

```
  //= require 'luca-ui-full.min.js'
```

## Standalone With Twitter Bootstrap ( development tools are optional )
```html
  <html>
    <head>
      <link rel="stylesheet" href='luca-ui-full.css' />
      <link rel="stylesheet" href='luca-ui-development-tools.css' />
    </head>
    <body>
      <script type='text/javascript' src="luca-ui-full.min.js" /> 
      <script type='text/javascript' src="luca-ui-development-tools.min.js" /> 
    </body>
  </html>
```

## Interactive Documentation and Examples

[View the Sandbox](http://datapimp.com/luca)

## Thanks To

@jashkenas for making coffeescript, underscore, backbone.js.

@twitter for making bootstrap 2.0

@davidtonge for making backbone-query

@benchprep for giving me the freedom

@luca. who i spent only two minutes making and am exponentially more proud to have created.

## Contributing

Please!