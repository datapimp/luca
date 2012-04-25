(window || global).Sandbox =
  views: {}
  collections: {}
  models: {}

Luca.registry.addNamespace 'Sandbox.views'
Luca.Collection.namespace = Sandbox.collections

Sandbox.keys =
  ENTER: 13
  ESCAPE: 27
  KEYLEFT: 37
  KEYUP: 38
  KEYRIGHT: 39
  KEYDOWN: 40
  SPACEBAR: 32
  FORWARDSLASH: 191

UnderscoreMixins =
  classify: (string)-> str = _(string).camelize(); str.charAt(0).toUpperCase() + str.substring(1)

  camelize: (string)->
    string.replace /_+(.)?/g, (match, chr)->
      chr.toUpperCase() if chr?

  underscore: (string)->
    string.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase()

  module: (base,module)->
    _.extend base, module
    if base.included and _(base.included).isFunction()
      base.included.apply(base)

  # this function will ensure a function gets called at least once
  # afrer x delay.  by setting defaults, we can use this on backbone
  # view definitions
  idle: (code, delay=1000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleShort: (code, delay=100)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

  idleLong: (code, delay=5000)->
    delay = 0 if window.DISABLE_IDLE
    handle = undefined
    ()->
      window.clearTimeout(handle) if handle
      handle = window.setTimeout(_.bind(code, @), delay)

_.mixin UnderscoreMixins