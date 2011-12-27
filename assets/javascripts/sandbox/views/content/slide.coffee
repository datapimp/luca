Sandbox.views.Slide = Backbone.View.extend
  render: ()->
    $(@el).html Luca.templates["content/slide"]()
