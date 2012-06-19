make = Luca.View::make

_.def('Luca.fields.CheckboxArray').extends('Luca.core.Field').with

  template: "fields/checkbox_array"

  events:
    "click input" : "clickHandler"

  selectedItems: []

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable
    _.bindAll @, "populateCheckboxes", "clickHandler"

    Luca.core.Field::initialize.apply @, arguments

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @valueField ||= "id"
    @displayField ||= "name"

  afterInitialize: (@options={})->
    try
      @configure_collection()
    catch e
      console.log "Error Configuring Collection", @, e.message

    @collection.bind "reset", @populateCheckboxes

  afterRender: ()->
    if @collection?.length > 0
      @populateCheckboxes()
    else
      @collection.trigger("reset")

  clickHandler: (event)->
    checkbox = $(event.target)

    if checkbox.prop('checked')
      @selectedItems.push( checkbox.val() )
    else
      if _( @selectedItems ).include( checkbox.val() )
        @selectedItems = _( @selectedItems ).without( checkbox.val() )

  controls: ()->
    @$('.controls')

  populateCheckboxes: ()->
    @controls().empty()
    @selectedItems = []

    @collection.each (model)=>
      value = model.get(@valueField)
      label = model.get(@displayField)
      input_id = _.uniqueId("#{ @cid }_checkbox")

      inputElement = make("input",type:"checkbox",name:@input_name,value:value,id: input_id)
      element = make("label", {for:input_id}, inputElement)

      $( element ).append(" #{ label }")
      @controls().append( element )

  uncheckAll: ()->
    @allFields().prop('checked', false)

  allFields: ()->
    @controls().find("input[type='checkbox']")

  checkSelected: ()->
    @uncheckAll()

    for value in @selectedItems
      checkbox = @controls().find("input[value='#{ value }']")
      checkbox.prop('checked', true)

    @selectedItems

  getValue: ()->
    @$(field).val() for field in @allFields() when @$(field).prop('checked')

  setValue: (items)->
    @selectedItems = items
    @checkSelected()

  getValues: ()->
    @getValue()

  setValues: (items)->
    @setValue(items)