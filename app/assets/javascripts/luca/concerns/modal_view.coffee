Luca.concerns.ModalView = 
  version: 3

  closeOnEscape: true

  showOnInitialize: false

  backdrop: false

  __initializer: ()->
    return unless @modal is true

    @on "before:render", @applyModalConfig, @
    
    @

  applyModalConfig: ()->
    @$el.addClass 'modal'
    @$el.addClass 'fade' if @fade is true

    @$el.modal
      backdrop: @backdrop is true
      keyboard: @closeOnEscape is true
      show: @showOnInitialize is true

    @$el.css('display','none') unless @showOnInitialize is true
    @      
 
  container: ()->
    $('body')

  toggle: ()->
    @$el.modal('toggle')

  show: ()->
    @render() unless @rendered is true
    @trigger "before:show"
    @$el.modal('show')
    @trigger "after:show"

  hide: ()->
    @trigger "before:hide"
    @$el.modal('hide')
    @trigger "after:hide"

  setModalDimensions: (height, width)->
    if _.isObject(height)
      {height,width} = height

    @setModalHeight( height ) if height?
    @setModalWidth( width ) if width?

  setModalWidth: (width)->
    @$el.css
      "width": width
      "max-width": width
      "margin-left": width * 0.5 * -1

  setModalHeight: (height)->
    @$el.css
      "max-height": height
      "margin-top": height * 0.5 * -1
      "height": height 
