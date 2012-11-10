Luca.modules.LoadMaskable = 
  _initializer: ()->
    return unless @loadMask is true

    if @loadMask is true
      @defer ()=>
        @$el.addClass('with-mask')

        if @$('.load-mask').length is 0
          @loadMaskTarget().prepend Luca.template(@loadMaskTemplate, @)
          @$('.load-mask').hide()
      .until("after:render")

      @on (@loadmaskEnableEvent || "enable:loadmask"), @applyLoadMask, @
      @on (@loadmaskDisableEvent || "disable:loadmask"), @applyLoadMask, @

  showLoadMask: ()->
    @trigger("enable:loadmask")

  hideLoadMask: ()->
    @trigger("disable:loadmask")

  loadMaskTarget: ()->
    if @loadMaskEl? then @$(@loadMaskEl) else @$bodyEl()

  disableLoadMask: ()->
    @$('.load-mask .bar').css("width","100%")
    @$('.load-mask').hide()
    clearInterval(@loadMaskInterval)

  enableLoadMask: ()->
    @$('.load-mask').show().find('.bar').css("width","0%")
    maxWidth = @$('.load-mask .progress').width()
    if maxWidth < 20 and (maxWidth = @$el.width()) < 20
      maxWidth = @$el.parent().width()

    @loadMaskInterval = setInterval ()=>
      currentWidth = @$('.load-mask .bar').width()
      newWidth = currentWidth + 12
      @$('.load-mask .bar').css('width', newWidth)
    , 200

    return unless @loadMaskTimeout?

    _.delay ()=>
      @disableLoadMask()
    , @loadMaskTimeout

  applyLoadMask: ()->
    if @$('.load-mask').is(":visible")
      @disableLoadMask()
    else
      @enableLoadMask()