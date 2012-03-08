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
    expect( Luca.cache("cached") ).toBeDefined()

  it "should trigger after initialize", ->
    view = new Luca.View()
    expect( view ).toHaveTriggered("after:initialize")

describe "Hooks", ->
  it "should have before and after render hooks", ->
    Custom = Luca.View.extend
      beforeRender: sinon.spy()  
      afterRender: sinon.spy() 

    view = new Custom()

    view.render()

    expect( view.beforeRender.called ).toBeTruthy()
    expect( view.afterRender.called ).toBeTruthy()

  it "should call custom hooks in addition to framework hooks", ->
    Custom = Luca.View.extend
      hooks:["custom:hook"]
      afterRender: ()-> @trigger("custom:hook")
      customHook: sinon.spy()

    view = new Custom()

    expect( view.customHook.called ).toBeFalsy()

    view.render()

    expect( view.customHook.called ).toBeTruthy()

describe "The Collection Events API", ->
  manager = new Luca.CollectionManager()
  
  SampleCollection = Luca.Collection.extend
    name: "sample"


