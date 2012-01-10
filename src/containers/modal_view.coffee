Luca.containers.ModalView = Luca.core.Container.extend 
  component_type: 'modal_view'

  className: 'luca-ui-modal-view'

  components:[]

  renderOnInitialize: true

  showOnRender: false

  hooks:[
    'before:show',
    'before:hide'
  ]

  defaultModalOptions:
    minWidth: 375
    maxWidth: 375
    minHeight: 550
    maxHeight: 550
    opacity: 80
    onOpen: (modal)->
      @onOpen.apply @
      @onModalOpen.apply modal, [modal, @] 
    onClose: (modal)-> 
      @onClose.apply @
      @onModalClose.apply modal, [modal, @]
  
  modalOptions: {}

  initialize: (@options={})->
    Luca.core.Container.prototype.initialize.apply @,arguments
    @setupHooks(@hooks)

    _( @defaultModalOptions ).each (value,setting) => @modalOptions[ setting ] ||= value 

    @modalOptions.onOpen = _.bind( @modalOptions.onOpen, @)
    @modalOptions.onClose = _.bind( @modalOptions.onClose, @)

  # this will get called within the context of the modal view
  onOpen: ()-> true

  # this will get called within the context of the modal view
  onClose: ()-> true

  getModal: ()-> @modal

  # this will be called within the context of the simple modal object
  onModalOpen: (modal, view)->
    view.modal = modal

    modal.overlay.show()
    modal.container.show()
    modal.data.show()

  # this will be called within the context of the simple modal object
  onModalClose: (modal, view)->
    $.modal.close()

  prepare_layout: ()->
    $('body').append( $(@el) )

  prepare_components: ()->
    @components = _(@components).map (object,index) =>
      object.container =  @el
      object

  afterInitialize: ()-> 
    $(@el).hide()
    @render() if @renderOnInitialize

  afterRender: ()->
    @show() if @showOnRender

  wrapper: ()-> $( $(@el).parent() )

  show: ()->
    @trigger "before:show", @
    $(@el).modal( @modalOptions )

  hide: ()->
    @trigger "before:hide", @

Luca.register "modal_view","Luca.containers.ModalView"
