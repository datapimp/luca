# The `Luca.CodeSyncManager` is a client side component that works with the luca
# executable that ships with the gem.  It listens for notifications of asset changes
# (scss,coffeescript,templates,etc) in your development directory, and applies them to the running session.
#
# It works similar to tools like 'LiveReload' but without refreshing the entire page, and with direct integration
# with your asset pipeline / sprockets configuration.  For Luca apps specifically, it also handles changes to
# component definitions more elegantly by updating live instances of your component prototypes and event handlers
# so that you don't have to refresh so often.
#
#
# #### Setup
#
# Run the luca command from your project root, and specify the name of the application you are watching:
#       
#       bundle exec luca sync app_name
#       
# The sync server runs a faye process on port 9295.  You can specify options on the command line.
#
# In your browser, you can control various settings by setting the `Luca.config` values.         
#
# - Luca.config.codeSyncHost
# - Luca.config.codeSyncChannel
# - Luca.config.codeSyncStylesheetMode
#
# #### Including in your Development Application 
#
# After your Luca.Application renders, just call the Luca.CodeSyncManager.setup method
# in the context of your application.
# 
#     app = Luca.getApplication()
#     app.on "after:render", Luca.CodeSyncManager.setup, app
#
# Or in the initialize method of your application:
#     ... 
#     initialize: ()->
#       @on "after:render", Luca.CodeSyncManager.setup, @ 
#     ...
#
# #### Syncpad
#
# Any assets named syncpad: syncpad.coffee, syncpad.css.css, syncpad.jst.ejs, etc are treated specially by the
# code sync utility.  The syncpad assets are used to provide a scratch pad / test environment for your application.
# You can write coffeescript or sass and have them live evaluated in your running browser.  
codeManager = Luca.register     "Luca.CodeSyncManager"
codeManager.extends             "Luca.SocketManager"

codeManager.publicConfiguration
  # What URL will the faye server be available at?
  host:             (Luca.config.codeSyncHost ||= "//localhost:9295/luca")

  # Which channel does the server side process publish changes to? You shouldn't need
  # to change this ever unless you are using your own faye server.
  channel:          (Luca.config.codeSyncChannel ||= "/code-sync")

  # Available options are single, and intelligent.  
  #   - single: loads the stylesheet independently
  #   - intelligent:  loads the stylesheet, and then finds where in the DOM that stylesheet
  #                   was loaded and attempts to reload any styles that came after so that
  #                   rules get set appropriately.
  styleSheetMode:   (Luca.config.codeSyncStylesheetMode ||= "single")

codeManager.classMethods
  # The preferred way of including code sync functionality into your application.
  setup: (options={})->
    @codeSync = new Luca.CodeSyncManager(options) 
    @codeSync.trigger "ready"

codeManager.privateMethods
  initialize: (@attributes={})->
    unless @attributes.host?
      _.extend(@attributes, host: (@host || Luca.config.codeSyncHost))

    Luca.SocketManager::initialize.call(@, @attributes)
    @bindToChannel()

  start: ()->
    @trigger "ready"

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

    if change.path?.match(/syncpad/) or @styleSheetMode is "single"
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
  make: Luca.View::make