Sandbox.views.Slide = Luca.View.extend 
  render: ()->
    $(@el).html Luca.templates["content/slide"](@)
