# Method Caching and Computed Properties on Luca Collection and Model

The concept of computed properties ( on the model ) or cached methods ( on the collection )
optimizes for cases where you call a method that performs calculations or some other operations
whose value is dependent on the model and its underlying attributes.

## Cached Methods on Luca.Collection

Luca provides a configuration API for Luca.Collection where you specify the method whose value
you wish to cache, and the change events which get bubbled up from the models that would change
the value, in essence expiring the cache.  In addition to change events, standard events on the
collection for when a model is added or removed will expire the cached value.

```coffeescript
  _.def("MyCollection").extends("Luca.Collection").with
    name:"my_collection"

    cachedMethods:[
      "expensiveMethod:attributeOne,attributeTwo",
      "anotherExpensiveMethod"
    ] 

    expensiveMethod: ()->
      @map (model)-> model.get('attributeOne') + model.getAttribute('two')

    anotherExpensiveMethod: ()->
      @map (model)-> model.value()
```

In the example above, the `expensiveMethod` is dependent on the `attributeOne` and `attributeTwo` attributes
on each of the models in the collection, therefor if any of these values change, the cache needs to be expired and new value recalculated.

The `anotherExpensiveMethod` call is not dependent on any specific values, so will only expire any time a new model
is added or removed, or the collection is reset.


Example: 

```coffeescript
  _.def("Users").extends("Luca.Collection").with
    name: 'users'
    
    cachedMethods: [
	  "averageAge:age"
    ]
    
    averageAge: ()->
      sum = @reduce (acc, user) -> 
      	acc + user.get('age')
      , 0
      Math.floor(sum / @size)
```
An `averageAge` will be cached and recalculated only when either
membership of the collection will change or `age` attribute on either member

## Computed Properties on Luca.Model

```coffeescript
  _.def("MyModel").extends("Luca.Model").with
    computed:
      "expensive" : ["dependencyOne","dependencyTwo"]

    expensive: ()->
      @get("dependencyOne") + @get("dependencyTwo")
```

In the example above, `expensive` method will be converted to the `expensive` property which is be computed/updated on initialization and every time any of its dependent properties will change. That `expensive` property will act as any other attribute on the model (responds to `get` operations, can be available in `toJSON()` etc).

Example:

```coffeescript
  _.def("User").extends("Luca.Model").with
    computed:
      "fullName": ["firstName","lastName"]
    fullName: ()->
      @get("firstName") + @get("lastName")
```