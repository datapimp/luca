Sandbox.views.Panel = Luca.View.extend 
  description: 'this is a description of the panel'
  render: ()->
    $(@el).html Luca.templates["content/panel"](@)
