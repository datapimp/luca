# The Luca Collection Manager

The CollectionManager is a single instance which acts as a gateway to 
the instances of Luca.Collection created in your app.  The intention is
to provide a central place for creating one, and only one instance of a 
given collection type.

You can use CollectionManager independently, or you will get one by default
when you use a Luca.Application with the default configuration.

A CollectionManager has a name property which is 'primary' by default.  If
you call `Luca.CollectionManager.get()` it will return the CollectionManager
named 'primary' or the first one ever created.  Attempting to create an additional
CollectionManager instance with a name that is already used, will throw an error.

## Named Collections and Auto-Registering 

You can configure your Luca.Collection classes to have their instances automatically
register with the collection manager.  By specifying a `@name` property on your collection prototypes, they will automatically attempt to register with the running collection manager instance ( via `Luca.CollectionManager.get()` ) as soon as they are initialized.

You can specify which manager you want a collection to register with by specifying a `@manager` property on your collection.  This can either be a string, which will get resolved when needed to a variable, or a direct reference to the collection manager.  The string is useful since, when declaring your Luca.Collection prototypes, the collection manager will most likely not be instantiated.

```coffeescript
  _.def("MyCollection").extends("Luca.Collection").with
    name: "my_collection"
    manager: "AppInstance.collectionManager"
```

## Private Collections

You may not always want to use the global, single authoritative instance of a collection.  In this case, you can specify a `@private` or `@anonymous` property on your collection, and it will skip registering with the collection manager.

## Collection Class Naming

Your custom Luca.Collection classes get named like MyApp.collections.SampleCollection. Through some string magic "SampleCollection" will get turned into "sample_collection".  If you try to call collectionManager.getOrCreate("sample_collection") it will attempt to get a collection named "sample_collection", and if it fails, will create a new instance of MyApp.collections.SampleCollection.  If you want to force your CollectionManager to look in a specific namespace, set a reference to MyApp.collections on Luca.Collection.namespace, otherwise it will look in all of the namespaces it knows about in the Luca.registry and find an appropriate collection.

## Initial Collections

The CollectionManager can be configured with an @initialCollections property, which is an array of names of collection classes, similar to "sample_collection", or actual references to Collection Classes, or strings with their names. The CollectionManager will create instances of the collection for you, and call fetch() on all of them.

```coffeescript
  _.def("App.collections.SampleCollection").extends("Luca.Collection").with
    name: "sample_collection"

  _.def("App.collections.ExampleCollection").extends("Luca.Collection").with
    name: "example_collection"

  class App.CollectionManager extends Luca.CollectionManager
    initialCollections:[
      "sample_collection"
      "example_collection"
    ]

  # this will create instances of both of the above collections
  # and call fetch() on all of them
  collectionManager = new App.CollectionManager()
```

## Event Relaying

By default `@relayEvents` is set to true on the CollectionManager.  This means that
any event that is triggered by a collection that is managed by the collection manager will be bubbled up to the manager.  This feature is used by the collectionEvents configuration API used by Luca.View, but can also be used in custom situations as well.  Simply bind to the CollectionManager instance.  

Event triggers will look like `collection_name event`:


```coffeescript
  collection = new App.collections.SampleCollection([],name:"sample_collection")
  manager = new Luca.CollectionManager(collectionNamespace:App.collections)

  manager.on "sample_collection reset", ()=> @doSomething() 

  # will trigger 'reset' and call doSomething()
  collection.fetch() 
```

