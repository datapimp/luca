_.def("Luca.ModalView").extends("Luca.core.Container").with

  closeOnEscape: true

  showOnInitialize: false

  backdrop: false

  className: "luca-ui-container modal"

  container: ()->
    $('body')

  toggle: ()->
    @$el.modal('toggle')

  show: ()->
    @$el.modal('show')

  hide: ()->
    @$el.modal('hide')

  render: ()->
    @$el.addClass 'modal'
    @$el.addClass 'fade' if @fade is true

    $('body').append( @$el )
    
    @$el.modal
      backdrop: @backdrop is true
      keyboard: @closeOnEscape is true
      show: @showOnInitialize is true

    @

_.def("Luca.containers.ModalView").extends("Luca.ModalView").with()