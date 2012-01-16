Luca.components.Template = Luca.View.extend
  initialize: (@options={})->
    Luca.View.prototype.initialize.apply @, arguments
    throw "Templates must specify which template / markup to use" unless @template or @markup
  beforeRender: ()->
    $(@el).html(@markup || JST[ @template ](@options) )

  render: ()->
    $(@container).append( @el )


Luca.register "template", "Luca.components.Template"
