describe 'The Filterable Plugin', ->
  describe 'Through the CollectionView', ->
    beforeEach ->
      @collection = new Luca.Collection [{name:"name"},{name:"filterable"}]

      @view = new Luca.components.TableView
        collection:@collection
        columns:[reader:"name"] 

    it 'should generate a Backbone.QueryCollection query payload', ->
      expect( @view.getFilterState().toQuery() ).toBeDefined()

    it 'should generate a Backbone.QueryCollection options payload', ->
      expect( @view.getFilterState().toOptions() ).toBeDefined()

    it "should have a toRemote method which merges params", ->
      expect( @view.getFilterState().toRemote() ).toBeDefined()
      
    it 'should apply filter values', ->
      @view.applyFilter(filter:"value")
      expect( @view.getFilterState().toQuery().filter ).toEqual('value')

    it "should trigger a refresh event on filter change", ->
      @view.applyFilter(filter:"value")
      expect( @view ).toHaveTriggered("data:refresh")
