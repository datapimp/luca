describe "Luca.View", ->
  it "should be defined", ->
    expect(Luca.View).toBeDefined()

  it "should extend itself with the passed options", ->
    view = new Luca.View(name:"custom")
    expect(view.name).toEqual("custom")

  it "should create a unique id based on the name", ->
    view = new Luca.View(name:"boom")
    expect( view.cid ).toContain 'boom'

  it "should register the view in the cache", ->
    view = new Luca.View(name:"cached")
    expect( Luca.cache("cached") ).toEqual(view)

  it "should trigger after initialize", ->
    view = new Luca.View()
    expect( view ).toHaveTriggered("after:initialize")

  it "should be picked up by the isBackboneView helper", ->
    view = new Luca.View()
    expect( Luca.isBackboneView(view) ).toEqual true

  it "should be picked up by the isBackboneComponent helper", ->
    view = new Luca.View()
    expect( Luca.isComponent(view) ).toEqual true

  it "should be picked up by the supportsBackboneEvents helper", ->
    view = new Luca.View()
    expect( Luca.supportsBackboneEvents(view) ).toEqual true

describe "Introspection Helpers", ->
  beforeEach ->
    @view = new Luca.View
      events:
        "click .a" : "clickHandler"
        "hover .a" : "hoverHandler"

      clickHandler: ()-> "click"
      hoverHandler: ()-> "hover"

      collection_one: new Luca.Collection([],name:"collection_one")
      collection_two: new Luca.Collection([],name:"collection_two")
      view_one: new Luca.View(name:"view_one")
      view_two: new Luca.View(name:"view_two")
      model_one: new Luca.Model(name:"model_one")
      model_two: new Luca.Model(name:"model_two")

  it "should know the names of functions which are event handlers", ->
    names = @view.eventHandlerProperties()
    expect( names ).toEqual ["clickHandler","hoverHandler"]

  it "should know which properties are other views", ->
    viewNames = _( @view.views() ).pluck("name")
    expect( viewNames ).toEqual ["view_one","view_two"]

  it "should know which properties are other models", ->
    modelNames = _( @view.models() ).map (m)-> m.get('name')
    expect( modelNames ).toEqual ["model_one","model_two"]

  it "should know which properties are other collections", ->
    collectionNames = _( @view.collections() ).pluck("name")
    expect( collectionNames ).toEqual ["collection_one","collection_two"]

describe "DOM Helper Methods", ->
  it "should use the $html method to inject into the $el", ->
    view = new Luca.View()
    view.$html('haha')
    expect( view.$html() ).toEqual 'haha'

describe "Deferrable Rendering", ->
  beforeEach ->
    @spy = sinon.spy()

    @collection = new Luca.Collection
      url: "/t"
      fetch: @spy
      custom: @spy
      name: "haha"

    @DeferrableView = Luca.View.extend
      name: "deferrable_view"
      deferrable: @collection

    @TriggeredView = Luca.View.extend
      deferrable: @collection
      deferrable_method: "custom"

  it "should automatically call fetch on the collection ", ->
    ( new @DeferrableView ).render()
    expect( @collection.fetch ).toHaveBeenCalled()

  it "should call a custom method if configured", ->
    ( new @TriggeredView ).render()
    expect( @collection.fetch ).toHaveBeenCalled()

describe "Hooks", ->
  it "should have before and after render hooks", ->
    Custom = Luca.View.extend
      beforeRender: sinon.spy()
      afterRender: sinon.spy()

    view = new Custom()

    view.render()

    expect( view.beforeRender ).toHaveBeenCalled()
    expect( view.afterRender ).toHaveBeenCalled()

  it "should call custom hooks in addition to framework hooks", ->
    Custom = Luca.View.extend
      hooks:["custom:hook"]
      afterRender: ()-> @trigger("custom:hook")
      customHook: sinon.spy()

    view = new Custom()

    view.render()

    expect( view.customHook ).toHaveBeenCalled()

describe "The Collection Events API", ->
  App =
    collections : {}

  App.collections.Sample = Luca.Collection.extend
    name: "sample"

  SampleView = Luca.View.extend
    resetHandler: sinon.spy()
    collectionEvents:
      "sample reset" : "resetHandler"

  class SampleManager extends Luca.CollectionManager
    collectionNamespace: App.collections
    name: "collectionEvents"

  beforeEach ()->
    @manager ||= new SampleManager()
    @collection = @manager.getOrCreate("sample")

  it "should know which collection manager to use", ->
    view = new SampleView()
    expect( view.getCollectionManager().name ).toEqual( "collectionEvents" )

  it "should create a reference to the collection", ->
    view = new SampleView()
    expect( view.sampleCollection ).toBeDefined()

  it "should call the resetHandler callback on the view", ->
    view = new SampleView()
    collection = @manager.get("sample")
    collection.reset([])
    expect( view.resetHandler ).toHaveBeenCalled()


describe "Code Refresh", ->
  beforeEach ->

  it "should reference the event handler function property names", ->
  it "should reference the event handler functions", ->