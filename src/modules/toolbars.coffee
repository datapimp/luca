Luca.modules.Toolbars = 
  mixin: ( base )->
    _.extend base, Luca.modules.Toolbars
    
    # before and after render doesn't quite exactly work
    
    #base.bind "before:render", @prepare_toolbars
    #base.bind "after:render", @render_toolbars

  prepare_toolbars: ()->
    @toolbars = _( @toolbars ).map (toolbar)=>
      toolbar.ctype ||= "toolbar"
      toolbar = Luca.util.LazyObject( toolbar )
      $(@el)[ toolbar.position_action() ] Luca.templates["containers/toolbar_wrapper"](id:@name+'-toolbar-wrapper')
      toolbar.container = $("##{@name || @cid}-toolbar-wrapper")
      toolbar

  render_toolbars: ()->
    _(@toolbars).each (toolbar)=>
      toolbar.render()


