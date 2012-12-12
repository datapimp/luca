describe 'The Event Helpers', ->
  describe 'The Event Relayer', ->
    beforeEach ->
      @a = new Luca.View(name:"a")
      @b = new Luca.View(name:"b")

      (new Luca.EventRelayer
        target: @a 
        source: @b
        prefix: "prefix"
        events:[
          "event:one"
          "event:two"
          "event:three"
        ]).setup()

    xit 'should relay events from component a to component b', ->
      @b.trigger("event:one")
      @b.trigger("event:two")
      @b.trigger("event:three")

      expect( @a ).toHaveTriggered("prefix:event:one")
      expect( @a ).toHaveTriggered("prefix:event:two")
      expect( @a ).toHaveTriggered("prefix:event:three")


