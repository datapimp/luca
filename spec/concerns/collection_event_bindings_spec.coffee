describe 'Collection Event Bindings', ->
  view = Luca.register("Luca.components.CollectionBindingView")
  view.extends "Luca.View"
  view.mixesIn  "CollectionEventBindings"
  view.defines 
    collection: new Luca.Collection()

  xit "should allow me to bind to collection manager events"

  it "should setup event relaying from the collection", ->
    view = new Luca.components.CollectionBindingView()
    for eventId in ["reset","add","remove","change"]
      view.collection.trigger(eventId)
      expect( view ).toHaveTriggered("collection:#{ eventId }")
        
