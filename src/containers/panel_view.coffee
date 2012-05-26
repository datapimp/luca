_.def('Luca.containers.PanelView').extends('Luca.core.Container').with
  className: 'luca-ui-panel'

  initialize: (@options={})->
    Luca.core.Container::initialize.apply @, arguments

  afterLayout: ()->
    if @template
      contents = ( Luca.templates || JST )[ @template ]( @ )
      @$el.html(contents)

  render: ()->
    $(@container).append @$el

  afterRender: ()->
    Luca.core.Container::afterRender?.apply @, arguments
    if @css
      _( @css ).each (value,property)=>
        @$el.css(property,value)




