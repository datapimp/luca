_.def('Luca.components.Template').extends('Luca.View').with
  initialize: (@options={})->
    console.log "The Use of Luca.components.Template directly is being DEPRECATED"

    Luca.View::initialize.apply @, arguments
