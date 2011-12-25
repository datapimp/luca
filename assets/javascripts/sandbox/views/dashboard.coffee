Sandbox.views.Dashboard = Backbone.View.extend
  events:
    "click .modalLink" : "show_modal"
    "click .cycleLink" : "cycle"

  initialize: (@options)->
    @dashboard_name = @options.dashboard_name
  
  show_modal: ()->
    @modal ||= new Luca.containers.ModalView
      name: 'sample_modal_view'
      components:[
        ctype: 'card_view'
        components:[
          ctype: 'static_modal_view'
        ]
      ]

    @modal.show()

  cycle: ()->
    @getParent().cycle()

  render: ()->
    $(@el).html JST["dashboard"](dashboard_name: @dashboard_name)

