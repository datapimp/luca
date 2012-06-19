# This is a helper for creating the DOM element that go along with
# a given component, if it is configured to use one via the topToolbar
# and bottomToolbar properties
attachToolbar = (config={})->
  config.orientation ||= "top"
  config.ctype ||= @toolbarType || "panel_toolbar"

  id = "#{ @cid }-tbc-#{ config.orientation }"

  toolbar = Luca.util.lazyComponent( config )

  container = @make "div",
    class:"toolbar-container #{ config.orientation }",
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

  @$bodyEl()[action]( container )

# A Panel is a basic Luca.View but with Toolbar extensions
#
# In general other components should inherit from the panel class.

_.def("Luca.components.Panel").extends("Luca.View").with

  topToolbar: undefined

  bottomToolbar: undefined

  # Load Mask will apply a transparent overlay over the form
  # upon submission, with a moving progress bar which will be
  # hidden upon successful response
  loadMask: false
  loadMaskTemplate: ["components/load_mask"]

  initialize: (@options={})->
    Luca.View::initialize.apply(@, arguments)

    if @loadMask is true
      @defer ()=>
        @$el.addClass('with-mask')

        if @$('.load-mask').length is 0
          @loadMaskTarget().prepend Luca.template(@loadMaskTemplate, @)
          @$('.load-mask').hide()
      .until("after:render")

      @on "enable:loadmask", @applyLoadMask
      @on "disable:loadmask", @applyLoadMask

  loadMaskTarget: ()->
    if @loadMaskEl? then @$(@loadMaskEl) else @$bodyEl()

  applyLoadMask: ()->
    if @$('.load-mask').is(":visible")
      @$('.load-mask .bar').css("width","100%")
      @$('.load-mask').hide()
      clearInterval(@loadMaskInterval)
    else
      @$('.load-mask').show().find('.bar').css("width","0%")
      maxWidth = @$('.load-mask .progress').width()
      if maxWidth < 20 and (maxWidth = @$el.width()) < 20
        maxWidth = @$el.parent().width()

      @loadMaskInterval = setInterval ()=>
        currentWidth = @$('.load-mask .bar').width()
        newWidth = currentWidth + 12
        @$('.load-mask .bar').css('width', newWidth)
      , 200

  applyStyles: (styles={},body=false)->

    target = if body then @$bodyEl() else @$el

    for setting, value  of styles
      target.css(setting,value)

    @

  beforeRender: ()->
    Luca.View::beforeRender?.apply(@, arguments)
    @applyStyles( @styles ) if @styles?
    @applyStyles( @bodyStyles, true ) if @bodyStyles?
    @renderToolbars?()

  $bodyEl: ()->
    element = @bodyTagName || "div"
    className = @bodyClassName || "view-body"

    @bodyEl ||= "#{ element }.#{ className }"

    bodyEl = @$(@bodyEl)

    return bodyEl if bodyEl.length > 0

    # if we've been configured to have one, and it doesn't exist
    # then we should append it to ourselves
    if bodyEl.length is 0 and (@bodyClassName? || @bodyTagName?)
      newElement = @make(element,class:className,"data-auto-appended":true)
      $(@el).append( newElement )
      return @$(@bodyEl)


    $(@el)

  $wrap: (wrapper)->
    if !wrapper.match(/[<>]/)
      wrapper = @make("div",class:wrapper)

    @$el.wrap( wrapper )

  $template: (template, variables={})->
    @$html( Luca.template(template,variables) )

  $html: (content)->
    @$bodyEl().html( content )

  $append: (content)->
    @$bodyEl().append(content)

  # Luca containers can have toolbars,
  # these will get injected before or after the bodyEl, or at the top
  # or bottom of the $el
  renderToolbars: ()->
    _( ["top","left","right","bottom"] ).each (orientation)=>
      if config = @["#{ orientation }Toolbar"]
        @renderToolbar( orientation, config)

  renderToolbar: (orientation="top", config={})->
    config.parent = @
    config.orientation = orientation

    attachToolbar.call(@, config)