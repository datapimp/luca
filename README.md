# Component Driven Architecture with Luca.JS

Luca is a component architecture framework based on Backbone.js, which includes
many development helpers, classes, patterns, and tools needed to build scalable
and clean single page applications.

It uses twitter bootstrap compatible markup and css naming conventions, 
making it possible to generate completely styled user interfaces with JSON alone.

### Using With Rails Asset Pipeline

```ruby
  # Gemfile
  gem 'luca', '>= 0.9.2', :git => "git@github.com:datapimp/luca.git" 
```

In your css manifest:

```css
  /*
   *= require 'luca'
  */
```

All Javascript Dependencies:

```javascript
  //= require 'luca/dependencies'
  //= require 'luca'
```

Your App:
```javascript
  Luca.initialize('App', {
    // will look in window.AppBootstrap for an object
    // keyed on your collection's cache_keys() for automatically
    // populating collections on page load
    modelBootstrap: true,
    // will look in window.AppBaseParams for an object
    // or function used to determine the query parameters to
    // be sent on every request
    baseParams: true
  });

  JST['home'] = function() {
    // content
  };

  App.register('App.views.Home').extends('Luca.View').defines({
    template: "home",
    events: {
      "click .menu-handler" : "clickMenuHandler"
    },
    clickMenuHandler: function(e){

    }
  });

  App.register('App.Application').extends('Luca.Application').defines({
    // will use the Application classes internal controller
    // to make the home 'page' active in the viewport
    routes:{
      "" : "home"  
    }
    components:[
      name: "home"
      type: "home"
    ]
  });

  AppNamespace.onReady(function(){
    (new AppNamespace.Application).boot()
  })
```

## Rails Generator
To generate Luca application skeleton run:   
`rails generate luca:application <app_name>`  
This will generate a controller, view, route, and the Luca application structure under assets/javascripts/<app_name>

## Contributing
You will need to run 'rake release:all' to compile/minify the asset which gets released.

## Thanks To
@jashkenas, @davidgtonge, @twitter, @madrobby, et al.

## Contributors
@tjbladez, @grilix, @nick-desteffen
