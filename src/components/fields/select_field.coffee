selectField = Luca.register   "Luca.fields.SelectField"

selectField.extends           "Luca.core.Field"

selectField.triggers          "after:select"

selectField.defines
  events:
    "change select" : "change_handler"

  template: "fields/select_field"

  includeBlank: true

  blankValue: ''

  blankText: 'Select One'

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.concerns.Deferrable
    _.bindAll @, "change_handler", "populateOptions", "beforeFetch"

    Luca.core.Field::initialize.apply @, arguments

    @input_id ||= _.uniqueId('field')
    @input_name ||= @name
    @valueType ||= "integer" if @valueField is "id"
    @label ||= @name
    @retainValue = true if _.isUndefined @retainValue

  afterInitialize: ()->
    if @collection?.data
      @valueField ||= "id"
      @displayField ||= "name"
      @parseData()

    try
      @configure_collection( @setAsDeferrable )
    catch e
      console.log "Error Configuring Collection", @, e.message

    @collection?.bind "before:fetch", @beforeFetch
    @collection?.bind "reset", @populateOptions

  # if the select field is configured with a data property
  # then parse that data into the proper format.  either
  # an array of objects with the valueField and displayField
  # properties, or an array of arrays with [valueField, displayField]
  parseData: ()->
    @collection.data = _( @collection.data ).map (record)=>
      return record if not _.isArray( record )

      hash = {}
      hash[ @valueField ] = record[0]
      hash[ @displayField ] = record[1] || record[0]

      hash

  getInputElement: ()->
    @input ||= @$('select').eq(0)

  afterRender: ()->
    if @collection?.models?.length > 0
      @populateOptions()
    else
      @collection?.trigger("reset")

  setValue: (value)->
    @currentValue = value
    Luca.core.Field::setValue.apply @, arguments

  beforeFetch: ()->
    @resetOptions()

  change_handler: (e)->
    @trigger "on:change", @, e

  resetOptions: ()->
    @getInputElement().html('')

    if @includeBlank
      @getInputElement().append("<option value='#{ @blankValue }'>#{ @blankText }</option>")

  populateOptions: ()->
    @resetOptions()

    if @collection?.each?
      @collection.each (model) =>
        value = model.get( @valueField )
        display = model.get( @displayField )
        selected = "selected" if @selected and value is @selected
        option = "<option #{ selected } value='#{ value }'>#{ display }</option>"
        @getInputElement().append( option )

    @trigger "after:populate:options", @
    @setValue( @currentValue )