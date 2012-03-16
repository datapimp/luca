# Collection Loader View is a simple modal view
# You can provide your own template for the collection loader modal
# if you want to. Default implementation uses twitter bootstrap modal and
# progress bar (http://twitter.github.com/bootstrap/). You template
# should have contain `progress`, `bar` and `message` classes
Luca.containers.CollectionLoaderView = Luca.core.Container.extend
  componentType: 'collection_loader_view'
  className: 'luca-ui-collection-loader-view'
  components:[]

  initialize: (@options={})->
    Luca.core.Container::initialize.apply @,arguments
    @template = @options.template || Luca.templates["containers/collection_loader_view"]()
    @manager  = Luca.CollectionManager.get()

    @collectionsLoaded = 0
    @collectionsTotal  = @manager.collectionNames.length

    @setupBindings()

  prepareLayout: ()->
    @$el.append @template

  afterRender: ()->
    $('body').append( @$el )

  modalContainer: ()->
    $("#progress-modal", @el)

  setupBindings: ()->
    self = @

    @manager.bind "collection_manager:collection_loaded", (name)->
      @collectionsLoaded += 1
      progress = parseInt((self.collectionsLoaded / self.collectionsTotal) * 100)

      self.modalContainer().find('.progress .bar').attr("style", "width: #{progress}%;")
      self.modalContainer().find('.message').html("Loaded #{ _(name).chain().humanize().titleize().value() }...")

    @manager.bind "collection_manager:all_collections_loaded", ()=>
      self.modalContainer().find('.message').html("All done!")
      _.delay ()->
        self.modalContainer().modal('hide')
      , 400

Luca.register "collection_loader_view","Luca.containers.CollectionLoaderView"