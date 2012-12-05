# In order to maintain backward compatibility with older apps,
# I feel compelled to keep around the old deferrable hack job that is in place.
#
# However, selectively, I will go through and upgrade the way 
# render() gets wrapped on luca components, so that the API is easier 
# to understand.

describe 'Rendering Strategies', ->
  Luca.View.renderStrategies.spy = sinon.spy()
  Luca.View.renderStrategies.spec = (_userSpecified)->
    _userSpecified.call(@)
    @trigger "strategy:trigger"
    @  

  window.AlternativeRenderingStrategy = Luca.View.extend
    renderStrategy: "spec"
    render: ( window.strategySpy = sinon.spy() )

  it "should use a different strategy", ->
    view = new AlternativeRenderingStrategy(renderStrategy: "spy")
    view.render()
    expect( Luca.View.renderStrategies.spy ).toHaveBeenCalled()

  it "should use a different strategy", ->
    view = new AlternativeRenderingStrategy()
    view.render()
    expect( view ).toHaveTriggered("strategy:trigger")

  it "should call the user specified method", ->
    view = new AlternativeRenderingStrategy()
    view.render()
    expect( window.strategySpy ).toHaveBeenCalled()

# The improved rendering strategy is just that a view should be able
# to get rendered(), fire its beforeRender hooks, and then defer the
# 'expensive' part of the render 

describe 'The Improved Rendering Strategy', ->
  window.ImprovedRenderer = Luca.View.extend 
    renderStrategy: "improved"    

  it "should pause rendering if configured to be deferrable", ->
    view = new ImprovedRenderer()

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

  it "should append additional class names to the view's $el", ->
    view = new Luca.View(additionalClassNames:["yes-yes","yall"])
    expect( view.$el.is(".yes-yes.yall") ).toEqual true

  it "should accept a string for additional class names", ->
    view = new Luca.View(additionalClassNames:"yes-yes yall")
    expect( view.$el.is(".yes-yes.yall") ).toEqual true


describe "Development Tool Helpers", ->
  beforeEach ->
    _.def("Luca.views.IntrospectionView").extends("Luca.View").with
      include:["Luca.DevelopmentToolHelpers"]

    @view = new Luca.views.IntrospectionView 
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
    @fetchSpy   = sinon.spy()
    @customSpy  = sinon.spy()

    @collection = new Luca.Collection [],
      url: "/models"
      fetch: @fetchSpy
      custom: @customSpy
      name: "haha"

    @DeferrableView = Luca.View.extend
      name: "deferrable_view"
      deferrable: @collection

    @TriggeredView = Luca.View.extend
      deferrable: @collection
      deferrable_method: "custom"

  it "should automatically call fetch on the collection ", ->
    ( new @DeferrableView ).render()
    @server.respond()
    expect( @fetchSpy ).toHaveBeenCalled()

  it "should call a custom method if configured", ->
    ( new @TriggeredView ).render()
    expect( @customSpy ).toHaveBeenCalled()

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
    Luca.CollectionManager.destroyAll()
    @manager ||= new SampleManager()
    @collection = @manager.getOrCreate("sample")

  it "should call the resetHandler callback on the view", ->
    view = new SampleView()
    collection = @manager.get("sample")
    collection.reset([])
    expect( view.resetHandler ).toHaveBeenCalled()
