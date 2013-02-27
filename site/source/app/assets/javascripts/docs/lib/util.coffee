Luca.util.loadScript = (url, options={}, callback) ->
  loaded = Luca.util.__loadedScripts ||= {}
  timers = Luca.util.__scriptTimers ||= {}

  if _.isFunction(options) and !callback?
    callback = options
    options = {}

  head= document.getElementsByTagName('head')[0];
  script = document.createElement("script")
  script.src = url
  script.type = "text/javascript"

  console.log "Adding script", script, script.url
  that = @
  
  onLoad = ()->
    if _.isFunction(callback)
      callback.call(that, url, options, script) 
    loaded[url] = true

  if options.once is true && loaded[url]
    return false

  head.appendChild(script)

  script.onreadystatechange = ()->
    if script.readyState is "loaded" or script.readyState is "complete"
      onLoad()

  script.onload = onLoad

  if navigator?.userAgent.match(/WebKit/)
    timers[url] = setInterval ()->
      clearInterval(timers[url])
      onLoad()
    , 10



