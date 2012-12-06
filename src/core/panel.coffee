# Luca.components.Panel is a low level Luca.View component which is used 
# to build components which have toolbar areas, and a body area for the main
# contents of the view.
panel = Luca.register           "Luca.components.Panel"

panel.extends                   "Luca.View"

panel.mixesIn                   "LoadMaskable"

panel.configuration
  topToolbar: undefined
  bottomToolbar: undefined
  loadMask: false
  loadMaskTemplate: "components/load_mask"
  loadMaskTimeout: 3000

panel.publicMethods
  applyStyles: (styles={},body=false)->

    target = if body then @$bodyEl() else @$el

    for setting, value  of styles
      target.css(setting,value)

    @

  $bodyEl: ()->
    element = @bodyTagName || "div"
    className = @bodyClassName || "view-body"

    @bodyEl ||= "#{ element }.#{ className }"

    bodyEl = @$(@bodyEl)

    return bodyEl if bodyEl.length > 0

    if bodyEl.length is 0 and (@bodyClassName? || @bodyTagName?)
      newElement = @make(element,class:className,"data-auto-appended":true)
      @$el.append( newElement )
      return @$(@bodyEl)

    @$el

  $wrap: (wrapper)->
    if _.isString(wrapper) and not wrapper.match(/[<>]/)
      wrapper = @make("div",class:wrapper)

    @$el.wrap( wrapper )

  $template: (template, variables={})->
    @$html( Luca.template(template,variables) )

  $empty: ()->
    @$bodyEl().empty()
    
  $html: (content)->
    @$bodyEl().html( content )

  $append: (content)->
    @$bodyEl().append(content)

panel.privateMethods
  beforeRender: ()->
    Luca.View::beforeRender?.apply(@, arguments)
    @applyStyles( @styles ) if @styles?
    @applyStyles( @bodyStyles, true ) if @bodyStyles?
    @renderToolbars?()

  renderToolbars: ()->
    _( ["top","left","right","bottom"] ).each (orientation)=>
      if config = @["#{ orientation }Toolbar"]
        @renderToolbar( orientation, config)

  renderToolbar: (orientation="top", config={})->
    config.parent = @
    config.orientation = orientation

    Luca.components.Panel.attachToolbar.call(@, config, config.targetEl )

panel.classMethods
  attachToolbar: (config={}, targetEl)->
    config.orientation ||= "top"
    config.ctype ||= @toolbarType || "panel_toolbar"

    id = "#{ @cid }-tbc-#{ config.orientation }"

    toolbar = Luca.util.lazyComponent( config )

    containerClass = "toolbar-container #{ config.orientation }"

    container = @make "div",
      class: containerClass,
      id: id
    ,
      toolbar.render().el

    hasBody = @bodyClassName or @bodyTagName

    # there will be a body panel inside of the views $el
    # so just place the toolbar before, or after the body
    action = switch config.orientation
      when "top", "left"
        if hasBody then "before" else "prepend"
      when "bottom", "right"
        if hasBody then "after" else "append"

    (targetEl || @$bodyEl() )[action]( container )


panel.defines
  version: 2