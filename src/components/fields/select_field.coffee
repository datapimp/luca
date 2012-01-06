Luca.fields.SelectField = Luca.core.Field.extend
  className: 'luca-ui-select-field luca-ui-field'

  template: "fields/select_field"

  initialize: (@options={})->
    _.extend @, @options
    _.extend @, Luca.modules.Deferrable

    Luca.core.Field.prototype.initialize.apply @, arguments

    @configure_collection()
  
  select_el: ()-> 
    $("select", @el)
  
  includeBlank: true

  blankValue: ''

  blankText: 'Select One'

  afterRender: ()->
    @select_el().html('')
    
    if @includeBlank
      @select_el().append("<option value='#{ @blankValue }'>#{ @blankText }</option>")

    if @collection?.each?
      @collection.each (model) =>
        value = model.get( @valueField )
        display = model.get( @displayField )
        selected = "selected" if @selected and value is @selected
        option = "<option #{ selected } value='#{ value }'>#{ display }</option>"
        @select_el().append( option )

    if @collection.data
      _( @collection.data ).each (pair)=>
        value = pair[0] 
        display = pair[1] 
        selected = "selected" if @selected and value is @selected
        option = "<option #{ selected } value='#{ value }'>#{ display }</option>"
        @select_el().append( option )

Luca.register "select_field", "Luca.fields.SelectField"
