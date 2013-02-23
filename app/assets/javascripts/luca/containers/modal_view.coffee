view = Luca.register      "Luca.containers.ModalView"
view.extends              "Luca.Container"

view.publicConfiguration
  closeOnEscape: true
  showOnInitialize: false
  backdrop: false
  className: "modal"

view.publicMethods
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
      backdrop: !!(@backdrop is true)
      keyboard: !!(@closeOnEscape is true)
      show: !!(@showOnInitialize is true)

    @

view.register()
