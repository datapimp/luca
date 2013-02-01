## The Structure Of A Project

Luca Applications can be generated with a rails generator `rails generate luca:application app`

This will create an application file structure for you, as well as some basic classes:

```
- app/assets/javascripts/app
	- views/
	- models/
	- components/
	- collections/
	- templates/
	- lib/
	- config.coffee
	- index.coffee
	- application.coffee
```

### config.coffee

```
Luca.initialize "App",
  modelBootstrap: "window.AppBootstrap"
  customConfigValue: "overrides Luca.config.customConfigValue"
```

This will create the necessary namespaces to hold your components:

```
window.App = 
  views: {}
  collections: {}
  models: {}
  components: {}
```

It will also create a helper function for you called `App()`

`App()` without any arguments can be used to access the singleton instance of the global `App.Application` class.

`App("my_view_name")` can be used to access an individual view instance by its `@name` or `@cid` property.

`App(".custom-dom-selector")` can be used to access an instance of a view by a member of its DOM structure.


### index.coffee

This will make the application available to the Rails asset Pipeline.  You simply need to:

```
javascript_include_tag 'app'
```

This will load all of the assets defined in your folder, in the proper order they need to be included.  

It will also handle booting your application for you:

```
App.onReady ()->
  window.MyApp = new App.Application()
  window.MyApp.boot()
```
