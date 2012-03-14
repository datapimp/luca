describe 'The Form View', ->
  describe 'Generating a form from a model', ->
    beforeEach ->
      Model = Backbone.Model.extend
        schema:
          field0: "hidden"
          field1: "text"
          field3: "boolean"
          field4: "blob"
          field5:
            collection: "sample"

      @model = new Model(field0:1,field1:"jonathan",field3:true,field4:"what up player?")
