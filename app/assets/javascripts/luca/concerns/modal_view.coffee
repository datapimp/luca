Luca.concerns.ModalView = 
  closeOnEscape: true

  showOnInitialize: false

  backdrop: false

  __initializer: ()->
    @$el.addClass("modal")

    @on "before:render", applyModalConfig, @
    
    @

  container: ()->
    $('body')

  toggle: ()->
    @$el.modal('toggle')

  show: ()->
    @$el.modal('show')

  hide: ()->
    @$el.modal('hide')

applyModalConfig = ()->
  @$el.addClass 'modal'
  @$el.addClass 'fade' if @fade is true

  $('body').append( @$el )
  
  @$el.modal
    backdrop: @backdrop is true
    keyboard: @closeOnEscape is true
    show: @showOnInitialize is true

  @  