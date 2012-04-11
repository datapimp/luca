describe 'The Form View', ->
  beforeEach ->
    FormView = Luca.components.FormView.extend
      components:[
        ctype: 'hidden_field'
        name: 'id'
      ,

        ctype: "text_field",
        label: "Field Two"
        name: "field2"
      ,
        ctype: "text_field",
        label: "Field One"
        name: "field1"
      ,
        ctype: "checkbox_field"
        label: "Field Three"
        name: "field3"
      ,
        name: "field4"
        label: "Field Four"
        ctype: "text_area_field"
      ,
        name: "field5"
        ctype: "button_field"
        label: "Click Me"
      ]

    Model = Backbone.Model.extend
      schema:
        field0: "hidden"
        field2: "text"
        field1: "text"
        field3: "boolean"
        field4: "blob"
        field5:
          collection: "sample"

    @form = new FormView()
    @model = new Model(field0:1,field1:"jonathan",field3:true,field4:"what up player?")

  it "should create a form", ->
    expect( @form ).toBeDefined()

  it "should load the model", ->
    @form.loadModel(@model)
    expect( @form.currentModel() ).toEqual @model

  it "should set the field values from the model when loaded", ->
    @form.render()
    @form.loadModel(@model)
    values = @form.getValues()
    expect( values.field1 ).toEqual "jonathan"

  it "should render the components", ->
    @form.render()
    expect( @form.$el.html() ).toContain "Field Four"
    expect( @form.$el.html() ).toContain "Field One"
    expect( @form.$el.html() ).toContain "Click Me"

  it "should allow me to set the values of the form fields with a hash", ->
    @form.render()
    @form.setValues(field1:"yes",field2:"no")
    values = @form.getValues()

    expect( values.field1 ).toEqual "yes"
    expect( values.field2 ).toEqual "no"

  it "should sync the model with the form field values", ->
    @form.render()
    @form.loadModel(@model)
    @form.setValues(field1:"yes")
    expect( @form.getValues().field1 ).toEqual "yes"

  describe "Loading A New Model", ->
    beforeEach ->
      @form.spiedEvents = {}
      @form.render()
      @model.beforeFormLoad = sinon.spy()
      @form.loadModel(@model)

    it "should call before form load", ->
      expect( @model.beforeFormLoad ).toHaveBeenCalled()

    it "should have triggered before load", ->
      expect( @form ).toHaveTriggered("before:load")

    it "should have triggered after load", ->
      expect( @form ).toHaveTriggered("after:load")

    it "should have triggered before:load:new", ->
      expect( @form ).toHaveTriggered("before:load:new")

    it "should have triggered after:load:new", ->
      expect( @form ).toHaveTriggered("after:load:new")

  describe "Loading An Existing Model", ->
    beforeEach ->
      @form.spiedEvents = {}
      @form.render()
      @model.set(id:"one")
      @model.beforeFormLoad = sinon.spy()
      @form.loadModel(@model)

    it "should call before form load", ->
      expect( @model.beforeFormLoad ).toHaveBeenCalled()

    it "should have triggered before:load:existing", ->
      expect( @form ).toHaveTriggered("before:load:existing")

    it "should have triggered after:load:new", ->
      expect( @form ).toHaveTriggered("after:load:existing")

    it "should apply the form values in the currentModel call if specified", ->
      @form.getField("field1").setValue("sup baby?")
      expect( @form.currentModel().get("field1") ).not.toEqual("sup baby?")
      @form.getField("field1").setValue("sup baby boo?")
      expect( @form.currentModel(refresh:false).get("field1") ).not.toEqual("sup baby boo?")
      expect( @form.currentModel(refresh:true).get("field1") ).toEqual("sup baby boo?")

  describe "The Fields Accessors", ->
    beforeEach ->
      @form.render()

    it "should provide access to fields", ->
      expect( @form.getFields().length ).toEqual 6

    it "should allow me to access a field by its name",->
      expect( @form.getField("field1") ).toBeDefined()

  describe "The Set Values Function", ->
    beforeEach ->
      @form.render()
      @form.loadModel(@model)

    it "should set the values on the field", ->
      @form.setValues({field1:"andyadontstop"})
      expect( @form.getField("field1").getValue() ).toEqual "andyadontstop"

    it "should set the values on the model", ->
      @form.setValues(field1:"krs-one")
      expect( @form.getField("field1").getValue() ).toEqual "krs-one"
      expect( @model.get("field1") ).toEqual "krs-one"

    it "should skip syncing with the model if passed silent", ->
      @form.setValues({field1:"yesyesyall"},silent:true)
      expect( @form.getField("field1").getValue() ).toEqual "yesyesyall"
      expect( @model.get("field1") ).not.toEqual "yesyesyall"

  describe "The Get Values Function", ->
    beforeEach ->
      @model.set(field1:"one",field2:"two",field3:undefined,field4:"")
      @form.render()
      @form.loadModel(@model)
      @values = @form.getValues()

    it "should skip the button fields by default", ->
      expect( _(@values).keys() ).not.toContain("field5")

    it "should include the button fields if asked", ->
      values = @form.getValues(skip_buttons:false)
      expect( _(values).keys() ).toContain("field5")

    it "should skip blank fields by default", ->
      values = @form.getValues()
      expect( _(values).keys() ).not.toContain("field4")

    it "should include blank fields if asked", ->
      values = @form.getValues(reject_blank:false)
      expect( _(values).keys() ).toContain("field4")

    it "should skip blank id fields", ->
      expect( _(@values).keys() ).not.toContain("id")

  describe "Events", ->
    beforeEach ->
      @form.render()
      @form.loadModel(@model)

    describe "Submit Handlers", ->
      beforeEach ->
        @form.spiedEvents = {}

      it "should trigger after submit events", ->
        @form.submit_success_handler(@model,success:true)
        expect( @form ).toHaveTriggered("after:submit")
        expect( @form ).toHaveTriggered("after:submit:success")

      it "should trigger after submit error events", ->
        @form.submit_success_handler(@model,success:false)
        expect( @form ).toHaveTriggered("after:submit")
        expect( @form ).toHaveTriggered("after:submit:error")

      it "should trigger fatal error events", ->
        @form.submit_fatal_error_handler()
        expect( @form ).toHaveTriggered("after:submit")
        expect( @form ).toHaveTriggered("after:submit:fatal_error")

    describe "Resetting the Form", ->
      it "should trigger before and after reset", ->
        @form.resetHandler(currentTarget:1)
        expect( @form ).toHaveTriggered "before:reset"
        expect( @form ).toHaveTriggered "after:reset"

      it "should call reset", ->
        @form.reset = sinon.spy()
        @form.resetHandler(currentTarget:1)
        expect( @form.reset ).toHaveBeenCalled()
