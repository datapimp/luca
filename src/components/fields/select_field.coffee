Luca.fields.SelectField = Luca.core.Field.extend
  form_field: true

  events:
    "change select" : "change_handler"
  
  hooks:[
    "after:select"
  ]

  className: 'luca-ui-select-field luca-ui-field'

  template: "fields/select_field"

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable
    _.bindAll @, "change_handler"

    Luca.core.Field.prototype.initialize.apply @, arguments
    
    try
      @configure_collection()
    catch e
      console.log "Error Configuring Collection", @, e.message

  afterInitialize: ()->
    @input_id ||= _.uniqueId('field') 
    @input_name ||= @name 
    @label ||= @name

  change_handler: (e)->
    me = my = $( e.currentTarget )
  
  includeBlank: true

  blankValue: ''

  blankText: 'Select One'
  
  beforeRender: ()->
    Luca.core.Field.prototype.beforeRender?.apply @, arguments
    @input = $('select', @el)

  afterRender: ()->
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

    if @collection?.data
      _( @collection.data ).each (pair)=>
        value = pair[0] 
        display = pair[1] 
        selected = "selected" if @selected and value is @selected
        option = "<option #{ selected } value='#{ value }'>#{ display }</option>"
        @input.append( option )

Luca.register "select_field", "Luca.fields.SelectField"
