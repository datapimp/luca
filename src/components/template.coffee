Luca.components.Template = Luca.View.extend
  initialize: (@options={})->
    Luca.View.prototype.initialize.apply @, arguments
    throw "Templates must specify which template / markup to use" unless @template or @markup

    if _.isString(@templateContainer)
      @templateContainer = eval("(window || global).#{ @templateContainer }")

  templateContainer: "Luca.templates"

  beforeRender: ()->
    $(@el).html(@markup || @templateContainer[ @template ](@options) )

  render: ()->
    $(@container).append( @el )


Luca.register "template", "Luca.components.Template"
