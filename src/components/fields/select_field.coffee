Luca.fields.SelectField = Luca.core.Field.extend
  form_field: true

  events:
    "change select" : "change_handler"
  
  hooks:[
    "after:select"
  ]

  className: 'luca-ui-select-field luca-ui-field'

  template: "fields/select_field"

  includeBlank: true

  blankValue: ''

  blankText: 'Select One'
 
  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable
    _.bindAll @, "change_handler", "populateOptions"

    Luca.core.Field.prototype.initialize.apply @, arguments
    
    if @collection?.data
      @valueField ||= "id"
      @displayField ||= "name"
      @parseData()

    try
      @configure_collection()
    catch e
      console.log "Error Configuring Collection", @, e.message

    @collection.bind "reset", @populateOptions

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name
  
  # if the select field is configured with a data property
  # then parse that data into the proper format.  either
  # an array of objects with the valueField and displayField
  # properties, or an array of arrays with [valueField, displayField]
  parseData: ()->
    @collection.data = _( @collection.data ).map (record)=>
      return record if not _.isArray( record )
      hash = {}
      hash[ @valueField ] = record[0]
      hash[ @displayField ] = record[1]

      hash

  change_handler: (e)->
    true 
 
  afterRender: ()->
    @input = $('select', @el)
    @collection.trigger("reset")
  
  populateOptions: ()->
    @input.html('')
    
    if @includeBlank
      @input.append("<option value='#{ @blankValue }'>#{ @blankText }</option>")

    if @collection?.each?
      @collection.each (model) =>
        value = model.get( @valueField )
        display = model.get( @displayField )
        selected = "selected" if @selected and value is @selected
        option = "<option #{ selected } value='#{ value }'>#{ display }</option>"
        @input.append( option )

Luca.register "select_field", "Luca.fields.SelectField"
