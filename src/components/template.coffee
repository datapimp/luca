Luca.components.Template = Luca.View.extend
  initialize: (@options={})->
    Luca.View.prototype.initialize.apply @, arguments
    throw "Templates must specify which template / markup to use" unless @template or @markup
  render: ()->
    console.log "Rendering Template", $(@el), @markup, @container
    $(@el).html(@markup || JST[ @template ](@options) )


Luca.register "template", "Luca.components.Template"
