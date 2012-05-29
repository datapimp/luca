_.def("Luca.ModalView").extends("Luca.View").with

  closeOnEscape: true

  showOnInitialize: false

  backdrop: false

  afterRender: ()->
    Luca.View::afterRender?.apply(@, arguments)

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

_.def("Luca.containers.ModalView").extends("Luca.ModalView").with()