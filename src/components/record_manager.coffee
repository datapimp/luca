# The RecordManager is a high level component which incorporates
# a filterable grid, and an editor form responsible for editing
# the records in that grid. 
#
# it provides convenience methods for accesing those components.
#
# this represents a clean pattern for having multiple components
# which work together.  inter-component communication should be handled
# by parent containers, and not individual components, which should
# usually not be aware of other components.

# Work in progress
Luca.components.RecordManager = Luca.containers.CardView.extend

  events:
    "click .record-manager-grid .edit-link" : "edit_handler"
    "click .record-manager-filter .filter-button" : "filter_handler"
    "click .record-manager-filter .reset-button" : "reset_filter_handler"
    "click .add-button" : "add_handler"
    "click .refresh-button" : "filter_handler"
    "click .back-to-search-button" : "back_to_search_handler"
  
  record_manager: true

  initialize: (@options={})->
    Luca.containers.CardView.prototype.initialize.apply @, arguments
    
    throw "Record Managers must specify a name" unless @name

    _.bindAll @, "add_handler", "edit_handler", "filter_handler", "reset_filter_handler"

    _.extend @components[0][0], @filterConfig if @filterConfig
    _.extend @components[0][1], @gridConfig if @gridConfig
    _.extend @components[1][0], @editorConfig if @editorConfig
  
    @bind "after:card:switch", () =>
      @trigger("activation:search", @) if @activeCard is 0
      @trigger("activation:editor", @) if @activeCard is 1

  components:[
    ctype: 'split_view',
    relayFirstActivation: true
    components:[
      ctype: 'form_view'
    ,
      ctype: 'grid_view'
    ]
  ,
    ctype: 'form_view'
  ]   

  getSearch: (activate=false, reset=true)->
    @activate(0) if activate is true
    @getEditor().clear() if reset is true

    _.first(@components)

  getFilter: ()->
    _.first @getSearch().components

  getGrid: ()->
    _.last @getSearch().components

  getCollection: ()->
    @getGrid().collection

  getEditor: (activate=false,reset=false)->
    if activate is true
      @activate 1, (activator,previous,current)=>
        current.reset()

    _.last(@components)

  beforeRender: ()->
    $(@el).addClass("#{ @resource }-manager")
    Luca.containers.CardView.prototype.beforeRender?.apply @, arguments
    
    $(@el).addClass("#{ @resource } record-manager")
    $(@el).data('resource', @resource)

    $(@getGrid().el).addClass("#{ @resource } record-manager-grid")
    $(@getFilter().el).addClass("#{ @resource } record-manager-filter")
    $(@getEditor().el).addClass("#{ @resource } record-manager-editor")

  # This is an example of a best practice from ExtJS
  # that we incorporate in Luca, which is that container
  # components are responsible for component communication.
  #
  # child components should not be aware of other components
  # in the layout.  Their parents should be responsible for 
  # controlling how they interact.  listening to events on one,
  # changing state, inducing effects in the others
  afterRender: ()->
    Luca.containers.CardView.prototype.afterRender?.apply @, arguments 

    manager = @
    grid = @getGrid()
    filter = @getFilter()
    editor = @getEditor()
    collection = @getCollection()
   
    # when a row is double clicked on the grid
    # then we edit that row
    grid.bind "row:double:click", (grid,model,index)->
      manager.getEditor(true)
      editor.loadModel( model )

    editor.bind "before:submit", ()=>
      $('.form-view-flash-container', @el).html('')
      $('.form-view-body', @el).spin("large")

    editor.bind "after:submit", ()=>
      $('.form-view-body', @el).spin(false)
    
    editor.bind "after:submit:fatal_error", ()=>
      $('.form-view-flash-container', @el ).append "<li class='error'>There was an internal server error saving this record.  Please contact developers@benchprep.com to report this error.</li>"
      $('.form-view-body', @el).spin(false)

    editor.bind "after:submit:error", (form, model, response)=>
      _( response.errors ).each (error)=>
        $('.form-view-flash-container', @el ).append "<li class='error'>#{ error }</li>"
    
    editor.bind "after:submit:success", (form, model, response)=>
      $('.form-view-flash-container', @el).append "<li class='success'>Successfully Saved Record</li>"
      
      model.set( response.result )
      form.loadModel( model )

      grid.refresh()

      _.delay ()=>
        $('.form-view-flash-container li.success', @el).fadeOut(1000)
        $('.form-view-flash-container', @el).html('')
      , 4000
    
    filter.eachComponent (component)=>
      try
        component.bind "on:change", @filter_handler
      catch e
        undefined
  
  firstActivation: ()->
    @getGrid().trigger "first:activation", @, @getGrid()
    @getFilter().trigger "first:activation", @, @getGrid()

  reload: ()->
    manager = @

    grid = @getGrid()
    filter = @getFilter()
    editor = @getEditor()
    
    # refresh the select fields in the filter
    filter.clear()

    grid.applyFilter()
  
  manageRecord: (record_id)->
    model = @getCollection().get(record_id)
    return @loadModel(model) if model
    
    console.log "Could Not Find Model, building and fetching"

    model = @buildModel()
    model.set({id:record_id},{silent:true})

    model.fetch
      success: (model,response)=>
        @loadModel(model)

  loadModel: (@current_model)->
    @getEditor(true).loadModel( @current_model )
    @trigger "model:loaded", @current_model

  currentModel: ()->
    @getEditor(false).currentModel()

  buildModel: ()->
    editor = @getEditor(false)
    collection = @getCollection()

    collection.add([{}], silent:true, at: 0)

    model = collection.at(0)

  createModel: ()->
    @loadModel(@buildModel())

  ##### DOM Event Handlers 
  reset_filter_handler: (e)->
    @getFilter().clear()
    @getGrid().applyFilter( @getFilter().getValues() )

  filter_handler: (e)->
    @getGrid().applyFilter( @getFilter().getValues() )

  edit_handler: (e)->
    me = my = $( e.currentTarget )
    record_id = my.parents('tr').data('record-id')
  
    if record_id
      model = @getGrid().collection.get( record_id )

    model ||= @getGrid().collection.at( row_index )


  add_handler: (e)->
    me = my = $( e.currentTarget )
    resource = my.parents('.record-manager').eq(0).data('resource')

  destroy_handler: (e)->
    #destroy handler

  back_to_search_handler: ()->
    # search handler