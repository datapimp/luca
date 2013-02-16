codeManager = Luca.register     "Luca.CodeSyncManager"
codeManager.extends             "Luca.SocketManager"

codeManager.publicConfiguration
  host:       Luca.config.codeSyncHost || "http://localhost:9292/faye"
  namespace:  "luca"
  channel:    Luca.config.codeSyncChannel || "/changes"

codeManager.classMethods
  setup: (options={})->
    @codeSyncManager = new Luca.CodeSyncManager(options) 
    @codeSyncManager.trigger("ready")

codeManager.privateMethods
  initialize: (@attributes={})->
    unless @attributes.host?
      _.extend(@attributes, host: (@host || Luca.config.codeSyncHost))

    Luca.SocketManager::initialize.call(@, @attributes)
    @bindToChannel()

  bindToChannel: ()->
    if @client?
      @client.subscribe @channel, ()=>
        @onChangesNotification.apply(@, arguments)
    else
      @on "change:client", (socketManager, client)=>
        @client.subscribe @channel, ()=>
          @onChangesNotification.apply(@, arguments)    

  # changeData is a payload that gets sent over the socket
  # whenever an asset that is being watched changes. 
  # it is different if the type of file is css or javascript.
  onChangesNotification: (changeData={}, applicationName)->
    return if _.isEmpty(changeData)
    data = _( changeData ).values()[0] || {}

    if data.type is "template"
      @processTemplate(data)
      @rerunSyncPad(data.type)

    if data.type is "component_definition"
      @processComponentDefinitionChange(data)
      @processJavascriptChange(data)
      
      _.delay ()=>
        @rerunSyncPad(data.type)
      , 25

    if data.type is "javascript"
      @processJavascriptChange(data)

    if data.type is "stylesheet" and data?.path
      @processStylesheetChange(data)

  rerunSyncPad: ()->
    if last = @get("last_syncpad_javascript_payload")
      @processJavascriptChange(last)

  processTemplate: (change={})->
    fn = ()->
      eval( change.contents )

    fn.apply(window)

  processComponentDefinitionChange: (change={})->
    return if _.isEmpty(change)
    @components ||= Luca.collections.Components.generate() 

    if change.class_name? 
      component = @components.findByClassName( change.class_name )

      if component && change.source_file_contents?
        component.set(source_file_contents: change.source_file_contents )

  processJavascriptChange: (change={})->
    return unless change?.compiled
    existing = $("body script[data-path='#{ change.source }']")

    # just to be clean
    if existing.length > 1
      existing.remove()

    if change.source?.match(/syncpad/) and change?.compiled and true
      @set("last_syncpad_javascript_payload", change)

    script = @make("script", {"data-path": change.source, type:"text/javascript"}, change.compiled)
    $('body').append(script)

  processStylesheetChange: (change={})->
    return if _.isEmpty(change)

    if change.path?.match(/syncpad/) or Luca.config.codeSyncStylesheetMode is "single"
      @syncStylesheet(change)
    else
      @replaceStylesheetAndEverythingAfter(change.path)

  replaceStylesheetAndEverythingAfter: (path)->
    stylesheet  = path.replace('./app/assets/stylesheets', Luca.config.assetsUrlPrefix )
    stylesheet  = stylesheet.replace('.scss','')
    existing    = $("link[href*='#{ stylesheet }']")
    parent      = existing.parent()

    return unless existing.length > 0

    replaced = existing.clone()
    comesAfter = existing.nextAll('link')
    cloned = comesAfter.clone()

    $(existing, comesAfter).remove()

    parent.append( replaced )
    parent.append( cloned )

  syncStylesheet: (change)->
    existing = $("head style[data-file='#{ change.path }']")

    if existing.length > 0
      existing.remove()

    if change.compiled? or change.contents?
      link = @make("style",{"data-file":change.path, type:"text/css"}, change.compiled || change.contents)
      $('head').append( link )

codeManager.defines
  make: Backbone.View::make