labelField = Luca.register          "Luca.components.LabelField"
labelField.extends                  "Luca.core.Field"

labelField.defines
  formatter: (value)->
    value ||= @getValue()
    _.str.titleize( value )

  setValue: (value)->
    @trigger("change", value, @getValue())
    @getInputElement().attr('value', value)
    @$('.value').html( @formatter(value) )
