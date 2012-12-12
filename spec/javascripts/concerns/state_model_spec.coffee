describe 'The State Model Concern', ->
  view = Luca.register  "Luca.components.StatefulView"
  view.extends          "Luca.View"
  view.mixesIn          "StateModel"
  view.defines
    stateful:
      key1: "val1"
      key2: "val2"

  it "should create a state model on the view", ->
    view = new Luca.components.StatefulView()
    expect( view.state ).toBeDefined()
    expect( Luca.isBackboneModel(view.state) ).toEqual true

  it "should delegate the get method on the state model to the view", ->
    view = new Luca.components.StatefulView()
    expect( view.get ).toBeDefined()
    expect( view.get('key1') ).toEqual 'val1' 

  it "should delegate the set method on the state model to the view", ->
    view = new Luca.components.StatefulView()
    view.set('key1','boom') 
    expect( view.state.get('key1') ).toEqual 'boom' 

  it "should apply the default state attributes", ->
    view = new Luca.components.StatefulView()
    expect( view.state.toJSON() ).toEqual key1:"val1", key2: "val2"

  describe 'State Change Event Bindings', ->
    it "should trigger state change events on the view", ->
      view = new Luca.components.StatefulView()
      view.set('key1','boom')
      expect( view ).toHaveTriggered("state:change")

    it "should trigger individual attribute change events on the view", ->
      view = new Luca.components.StatefulView()
      view.set('key1','boom')
      expect( view ).toHaveTriggered("state:change:key1")

    it "should respond to @stateChangeEvents configuration", ->
      view = new Luca.components.StatefulView
        onKeyChange: sinon.spy()
        blah: sinon.spy()
        stateChangeEvents:
          "key1" : "onKeyChange" 
          "key2" : "blah"

      view.set('key1','boom')
      expect( view.blah ).not.toHaveBeenCalled()
      expect( view.onKeyChange ).toHaveBeenCalled()