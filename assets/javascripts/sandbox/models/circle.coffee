class window.Line
  constructor: (options={})->
    @c = options.context

    delete( options.context )

    @state    = new Backbone.Model(@options)
    @startX   = options.startX
    @startY   = options.startY
    @endX     = options.endX
    @endY     = options.endY


  render: ()->
    @c.moveTo @startX, @startY
    @c.lineTo @endX, @endY
    @c.stroke()

_.extend Line::, Backbone.Events

