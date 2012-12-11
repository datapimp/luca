Luca.concerns.LoadMaskable = 
  __initializer: ()->
    return if @loadMask is false or not @loadMask?

    if @loadMask is true
      @loadMask = 
        enableEvent: "enable:loadmask"
        disableEvent: "disable:loadmask"

    @on "collection:fetch", ()=> @trigger "enable:loadmask"
    @on "collection:reset", ()=> @trigger "disable:loadmask"

    @on "after:render", ()->
      @$el.addClass('with-mask')
      if @$('.load-mask').length is 0 and @loadMaskTemplate?
        @loadMaskTarget().prepend Luca.template(@loadMaskTemplate, @)
        @$('.load-mask').hide()
    , @

    @on(@loadMask.enableEvent, @applyLoadMask, @)
    @on(@loadMask.disableEvent, @applyLoadMask, @)

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