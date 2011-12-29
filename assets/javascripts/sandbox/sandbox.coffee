$ do ->
  main = new Luca.containers.Viewport
    el: '#viewport'
    name: 'viewport'
    fullscreen: false
    components:[
      ctype: 'column_view'
      layout: '20/80'
      components:[
        ctype: 'navigation'
        name:'demo_navigation'
      ,
        ctype: 'card_view'
        name: 'demo_container',
        afterCardSwitch: (previous,active)->
          console.log "Switched To", @activeComponent().ctype
          if ctype = @activeComponent().ctype 
            content = Luca.templates[ "features/#{ ctype }" ]?()
            $('#feature-explanation').html(content).show()

        afterRender: (component)->
          @afterCardSwitch.apply(@)
        afterInitialize: (component)->
          _.bindAll component, "afterRender", "afterCardSwitch"
        components:[
          ctype : 'card_demo'
        ,
          ctype : 'column_demo'
        ,
          ctype : 'split_demo'
        ,
          ctype : 'tabbed_demo'
        ,
          ctype: 'grid_demo'
        ,
          ctype : 'form_demo'

        ]
      ]
    ]
  main.render()
