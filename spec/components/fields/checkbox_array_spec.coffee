describe 'The Checkbox Array Field', ->

  beforeEach ->
    @model = new Backbone.Model(item_ids: ["1"])
    collection = new Luca.Collection

    @formView = new Luca.components.FormView
      components:[
        ctype: "checkbox_array"
        name: 'item_ids'
        collection: collection
      ]

    @formView.render()
    @formView.loadModel(@model)

    collection.reset([
      id: "1", name: "Item1"
    ,
      id: "2", name: "Item2"
    ,
      id: "3", name: "Item3"
    ])

    @formView.loadModel(@model)
    @field = @formView.getFields()[0]

  it "should create a checkbox array field", ->
    expect(@formView.currentModel()).toEqual(@model)
    expect(@field.selectedItems).toEqual(["1"])

  it "should render the list of checkboxes", ->
    expect(@field.$el.html()).toContain("Item1")
    expect(@field.$el.html()).toContain("Item2")
    expect(@field.$el.html()).toContain("Item3")

  it "should check off each checkbox in the collection that is selected", ->
    expect(@field.$el.find("input[value='1']")[0].checked).toBeTruthy()
    expect(@field.$el.find("input[value='2']")[0].checked).toBeFalsy()
    expect(@field.$el.find("input[value='3']")[0].checked).toBeFalsy()