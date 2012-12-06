typeAheadField = Luca.register      "Luca.fields.TypeAheadField"
typeAheadField.extends              "Luca.fields.TextField" 


typeAheadField.defines
  getSource: ()->
    Luca.util.read(@source) || []

  matcher: (item)->
    true

  beforeRender: ()->
    Luca.fields.TextField::beforeRender.apply(@, arguments)
    @getInputElement().attr('data-provide','typeahead')

  afterRender: ()->
    Luca.fields.TextField::afterRender.apply(@, arguments)
    @getInputElement().typeahead
      matcher: @matcher
      source: @getSource()