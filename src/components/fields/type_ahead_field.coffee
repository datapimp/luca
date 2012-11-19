_.def('Luca.fields.TypeAheadField').extends('Luca.fields.TextField').with
  className: 'luca-ui-field'

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