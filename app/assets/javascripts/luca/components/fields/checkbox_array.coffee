# The `Luca.fields.CheckboxArray` renders an array of values 
# into checkbox controls.  This is for fields which can have
# a list of values associated with them.
checkboxArray = Luca.register     "Luca.fields.CheckboxArray"
checkboxArray.extends             "Luca.core.Field"

checkboxArray.privateConfiguration
  template: "fields/checkbox_array"

  className: "luca-ui-checkbox-array"

  events:
    "click input" : "clickHandler"

  selectedItems: []

checkboxArray.privateMethods
  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.concerns.Deferrable
    _.bindAll @, "renderCheckboxes", "clickHandler", "checkSelected"

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

    cbArray = @

    unless Luca.isBackboneCollection(@collection)
      throw "Checkbox Array Fields must specify a @collection property"
      
    if @collection.length > 0
      @renderCheckboxes()
    else
      @defer("renderCheckboxes").until(@collection,"reset")

  clickHandler: (event)->
    checkbox = $(event.target)

    if checkbox.prop('checked')
      @selectedItems.push( checkbox.val() )
    else
      if _( @selectedItems ).include( checkbox.val() )
        @selectedItems = _( @selectedItems ).without( checkbox.val() )

  controls: ()->
    @$('.controls')

  renderCheckboxes: ()->
    @controls().empty()
    @selectedItems = []

    @collection.each (model)=>
      value = model.get(@valueField)
      label = model.get(@displayField)
      input_id = _.uniqueId("#{ @cid }_checkbox")

      inputElement = @make("input",type:"checkbox",class:"array-checkbox",name:@input_name,value:value,id: input_id)
      element = @make("label", {for:input_id}, inputElement)

      $( element ).append(" #{ label }")
      @controls().append( element )

    @trigger("checkboxes:rendered", @checkboxesRendered = true)
    @

  uncheckAll: ()->
    @allFields().prop('checked', false)

  allFields: ()->
    @controls().find("input[type='checkbox']")

checkboxArray.publicMethods
  # Check the selected items.  Expects an array of values 
  # for boxes you would like to see checked.
  checkSelected: (items)->
    @selectedItems = items if items?

    @uncheckAll()

    for value in @selectedItems
      checkbox = @controls().find("input[value='#{ value }']")
      checkbox.prop('checked', true)

    @selectedItems

  # Gets an array of values for the checkboxes in this array
  # which are checked.
  getValue: ()->
    @$(field).val() for field in @allFields() when @$(field).prop('checked')

  setValue: (items)->
    @selectedItems = items

    if @checkboxesRendered is true
      @checkSelected(items)
    else
      cbArray = @
      @defer ()->
        cbArray.checkSelected(items)
      .until("checkboxes:rendered")

  getValues: ()->
    @getValue()

  setValues: (items)->
    @setValue(items)