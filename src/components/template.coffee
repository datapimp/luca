_.def('Luca.components.Template').extends('Luca.View').with

  templateContainer: "Luca.templates"

  initialize: (@options={})->
    Luca.View::initialize.apply @, arguments
    throw "Templates must specify which template / markup to use" unless @template or @markup

    if _.isString(@templateContainer)
      @templateContainer = eval("(window || global).#{ @templateContainer }")

  beforeRender: ()->
    @templateContainer = JST if _.isUndefined( @templateContainer)
    @$el.html(@markup || @templateContainer[ @template ](@options) )

  render: ()->
    $(@container).append( @$el )