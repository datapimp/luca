_.def("Luca.components.LabelField").extends("Luca.core.Field").with
  className: "luca-ui-field luca-ui-label-field"
    
  formatter: (value)->
    value ||= @getValue()
    _.str.titleize( value )

  setValue: (value)->
    @trigger("change", value, @getValue())
    @getInputElement().attr('value', value)
    @$('.value').html( @formatter(value) )
