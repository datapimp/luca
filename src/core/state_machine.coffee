# The Luca.StateMachine is a model which automatically gets
# created for Luca.View and Luca.Collection based classes.

# This allows us to set properties on the component using
# the getter / setters and also to bind to change events
# on the model.

# In addition to being a good application design pattern,
# StateMachines allow us to persist the component's state
# in localStorage, or event to a REST endpoint, log
# events for the purpose of debugging with Luca's
# Development Tools, etc

Luca.StateMachine = Luca.Model.extend
  # we can store the state machine's attributes
  # in localStorage or to wherever Backbone.sync
  # is set to on the model
  persist: false
  sync: Backbone.localSync
  initialize:(attributes, options={})->
    _.extend(@, options)

    if Luca.enableDevelopmentTools is true
      @logging = true


      @trackedChanges = []

    @id = @component?.name
    @set "id", @id

    if @persist is true
      @localStorage = new Luca.LocalStore( @storage )
      @bind "change", (model)->

    Luca.Model::initialize.apply @, arguments

    if @trackedChanges?
      @bind "change", _.bind(@trackChanges, @)

  # track changes to the state machine's attributes
  # changes get stored in an array with the following:
  #
  # [revisionNumber, previousAttributes, currentAttributes, changedAttributes]
  trackChanges: (model)->
    @trackedChanges ||= []
    @trackedChanges.push [@trackedChanges.length, model.previousAttributes(), model.attributes, model.changedAttributes()]

  log:(eventName, args)->
    console.log "Logging Event", eventName, args

  trigger: (eventName)->
    if @logging is true
      @log eventName, arguments

    Luca.Model::trigger.apply(@, arguments)

,
  # localStorage persistence namespace
  storage: "luca_sm"