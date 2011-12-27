Sandbox.views.Panel = Backbone.View.extend
  render: ()->
    $(@el).html Luca.templates["content/panel"]()
