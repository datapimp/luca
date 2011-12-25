Sandbox.views.Navigation = Backbone.View.extend
  events:
    "click .dashboardSelector li" : "selectDashboard"
  
  selectDashboard: (e)->
    me = my = $(e.currentTarget)
    
    @getParent().getContentView().activate $(me).data('dashboard')

  render: ()->
    $(@el).html JST["navigation"]({navigation_title: @navigation_title })
