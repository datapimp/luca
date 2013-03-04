loader = Test.register    "Test.DependencyLoader"
loader.extends            "Luca.Model"

loader.configuration
  autoLoad: false
  defaults:
    dependencies: []

loader.methods
  initialize: ()->
    Luca.Model::initialize.apply(@, arguments)
    @loadAll() if @autoLoad

  loadAll: (onAllLoaded)->
    model = @
    dependencies = @get("dependencies")

    @on "change:completed", (model, completed)->
      if completed.length is dependencies.length
        onAllLoaded.call(model)

    for dependency in @get("dependencies")
      loader = @
      completed = []

      Luca.util.loadScript dependency, ()=>
        console.log "Loaded", dependency
        completed.push(dependency)
        _.delay ()=> loader.set("completed", completed)

loader.register()
