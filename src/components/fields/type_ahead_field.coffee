_.def('Luca.fields.TypeAheadField').extends('Luca.fields.TextField').with
  className: 'luca-ui-field'

  getSource: ()->
    @source || []

  matcher: (item)->
    # IMPLEMENT
    # return true where item matches @query
    true

  beforeRender: ()->
    @_super("beforeRender", @, arguments)
    @$('input').attr('data-provide','typeahead')

  afterRender: ()->
    @_super("afterRender", @, arguments)

    @$('input').typeahead
      matcher: @matcher
      source: @getSource()