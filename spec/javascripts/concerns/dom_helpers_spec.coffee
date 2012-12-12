describe 'The DOM Helpers module', ->
  describe "The Wrapping Helper", ->
    it "should accept a space delimited list", ->
      v = new Luca.View(wrapperClass: "class-one class-two")
      expect( v.$el.parent().is(".class-one.class-two") ).toEqual(true)

  describe "Auto Assigning Class Names", ->
    it "should apply the class of the component all the way up its hierarchy", ->
      c = new Luca.Container()
      expect( c.$el.is(".luca-container") ).toBeTruthy()
      expect( c.$el.is(".luca-panel") ).toBeTruthy()

    it "should leave out backbone and luca view classes", ->
      c = new Luca.Container()
      expect( c.$el.is(".luca-view") ).not.toBeTruthy()
      expect( c.$el.is(".backbone-view") ).not.toBeTruthy()
