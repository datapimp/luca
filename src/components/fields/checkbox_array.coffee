_.component('Luca.fields.CheckboxArray').extends('Luca.core.Field').with

  template: "fields/checkbox_array"

  events:
    "click input" : "clickHandler"

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable
    _.bindAll @, "populateCheckboxes", "clickHandler", "_updateModel"

    Luca.core.Field::initialize.apply @, arguments

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @label ||= @name
    @valueField ||= "id"
    @displayField ||= "name"
    @selectedItems = []

  afterInitialize: (@options={})->
    try
      @configure_collection()
    catch e
      console.log "Error Configuring Collection", @, e.message

    @collection.bind "reset", @populateCheckboxes

  afterRender: ()->
    if @collection?.models?.length > 0
      @populateCheckboxes()
    else
      @collection.trigger("reset")

  clickHandler: (event)->
    checkbox = event.target
    if checkbox.checked
      @selectedItems.push(checkbox.value)
    else
      if @selectedItems.indexOf(checkbox.value) isnt -1
        @selectedItems = _.without(@selectedItems, [checkbox.value])

    @_updateModel()

  populateCheckboxes: ()->
    controls = $(@el).find('.controls')
    controls.empty()
    @selectedItems = @getModel().get(@name)
    @collection.each (model)=>
      value = model.get(@valueField)
      label = model.get(@displayField)
      input_id = _.uniqueId('field')
      controls.append(Luca.templates["fields/checkbox_array_item"]({label: label, value: value, input_id: input_id, input_name: @input_name}))
      @$("##{input_id}").attr("checked", "checked") unless @selectedItems.indexOf(value) is -1

    $(@container).append(@$el)

  _updateModel: ()->
    attributes = {}
    attributes[@name] = @selectedItems
    @getModel().set(attributes)
