# Luca.Collection
 
The `Luca.Collection` class is the base class for Luca components. A number of patterns and optimizations that are helpful in your collection classes have been extracted into the base class.

## Backbone Query Integration

Luca.Collection either extends from `Backbone.Collection`, or if it is available `Backbone.QueryCollection`.  The Query Collection was developed by [Dave Tonge](https://github.com/davidgtonge) and the project can be found on [Github](https://github.com/datapimp/backbone_query).  

`Luca.Collections` which extend from `Backbone.QueryCollection` will have a query method which provides you with an API for filtering your collection's models with an API similar to [MongoDB](http://www.mongodb.org/display/DOCS/Advanced+Queries)

## Bootstrapping your models on page load for performance

A good habit for any single page application is to not populate all of your collections via remote calls to your RESTful API.  In a lot of cases it is better to put the data that needs to end up in your collections into the initial page load.

Luca.Collection classes optimize for this pattern through the bootstrap functionality that is baked into the component.

The bootstrap configuration for `Luca.Collection` classes depends on the collection being defined with a `@cache_key` property. `@cache_key` is either a function which returns a string, or a string, for simple cases.

To make an array of objects available as models for a collection, either store the objects in `Luca.Collection._bootstrapped_models` on a property matching the value of `@cache_key` or use the `Luca.Collection.cache()` method like such:

```html
  <body>
    <script type="text/javascript">
       Luca.Collection.cache("books",[{author:"Jonathan Soeder"}]
    </script>
```

This will work with the following collection:

```coffeescript
  _.def("BooksCollection").extends("Luca.Collection").with
    name:"books"
    cache_key: "books"
```

Any calls to `(new BooksCollection()).fetch()` will look in the cached models first, and avoid an API call.

If you want to refresh the BooksCollection from your API, just pass in an options hash like such:

```coffeescript
	booksCollection.fetch(refresh:true)
```

## Base Params for RESTful API

There are a lot of cases where you need every API call to pass along the same parameters ( authentication_tokens, keys, etc )

`Luca.Collection` will wrap the `@url` property or method with a function which appends the base parameters as an HTTP Query Parameter string.

```coffeescript
  _.def("BooksCollection").extends("Luca.Collection").with
    name: "books"
    url: "/api/v1/books"
  
  app = Luca.getApplication()
  
  app.on "authenticated", ()->
    Luca.Collection.baseParams = 
      auth_token: app.get("authentication_token")
      
  app.collection("books").url() # => "/api/v1/books?auth_token=123456"

```

## onceLoaded and ifLoaded helpers

There are cases where you want to do something on a collection if it has data, but if it doesn't, you need to fetch that data, and bind a callback to the reset event.  This can get tedious.

Passing a callback to `collection.ifLoaded(callback)` will eliminate the boilerplate in this pattern.

If you only want the callback to run once, use `collection.onceLoaded()`.

In either of these methods, if you don't watch to automatically call `@fetch()` on the collection, pass an autoFetch option set to false

```
  app.collection("books").ifLoaded ()->
    @doSomething()
  , autoFetch: false
```