# Luca.util.setupKeymaster(config, keyScope).on(view)
#
# Keymaster understands the following modifiers:
# `⇧`, `shift`, `option`, `⌥`, `alt`, `ctrl`, `control`, `command`, and `⌘`.

# The following special keys can be used for shortcuts:
# `backspace`, `tab`, `clear`, `enter`, `return`, `esc`, `escape`, `space`,
# `up`, `down`, `left`, `right`, `home`, `end`, `pageup`, `pagedown`, `del`, `delete`
# and `f1` through `f19`.
Luca.util.setupKeymaster = Luca.util.setupKeyBindings = (config, keyScope="all")->
  unless _.isFunction(Luca.key)
    throw "Keymaster library has not been included."

  on: (view)->
    view.on "before:remove", ()->
      Luca.key?.deleteScope(keyScope)

    for key, handler of config
      if _.isString(handler) and _.isFunction(view[handler])
        handler = view[handler]

      if _.isFunction(handler)
        handler = _.bind(handler, view)
        Luca.key(key, keyScope, handler)    
