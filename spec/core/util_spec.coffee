describe 'The Luca Utilities', ->
  describe "Converting from component class to css class", ->
    it "should produce a css class from the component class name", ->
      component = "Luca.Container"
      cssClass = Luca.util.toCssClass(component)
      expect( cssClass ).toEqual 'luca-container'

    it "should produce a css class from the component class name", ->
      component = "Luca.components.MultiCollectionView"
      cssClass = Luca.util.toCssClass(component)
      expect( cssClass ).toEqual 'luca-components-multi-collection-view'

    it "should produce a css class from the component class name", ->
      component = "Luca.View"
      cssClass = Luca.util.toCssClass(component)
      expect( cssClass ).toEqual 'luca-view'

    it "should exclude parts", ->
      component = "Luca.components.MultiCollectionView"
      cssClass = Luca.util.toCssClass(component, 'components')
      expect( cssClass ).toEqual "luca-multi-collection-view"



