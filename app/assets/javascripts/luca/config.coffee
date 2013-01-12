Luca.config.maintainStyleHierarchy = true
Luca.config.maintainClassHierarchy = true
Luca.config.autoApplyClassHierarchyAsCssClasses = true

Luca.config.idAttributeType = "integer"

Luca.config.apiSortByParameter  = 'sortBy'
Luca.config.apiPageParameter    = 'page'
Luca.config.apiLimitParameter   = 'limit'

# When using Luca.define() should we automatically register
# the component with the registry?
Luca.autoRegister = Luca.config.autoRegister = true

# if developmentMode is true, you have access to some neat development tools
Luca.developmentMode = Luca.config.developmentMode = false

# The Global Observer is very helpful in development
# it observes every event triggered on every view, collection, model
# and allows you to inspect / respond to them.  Use in production
# may have performance impacts which has not been tested
Luca.enableGlobalObserver = Luca.config.enableGlobalObserver = false

# let's use the Twitter 2.0 Bootstrap Framework
# for what it is best at, and not try to solve this
# problem on our own!
Luca.config.enableBoostrap = Luca.config.enableBootstrap = true

Luca.config.enhancedViewProperties = true

# Need to replace this with something like keymaster.js
Luca.keys = Luca.config.keys =
  ENTER: 13
  ESCAPE: 27
  KEYLEFT: 37
  KEYUP: 38
  KEYRIGHT: 39
  KEYDOWN: 40
  SPACEBAR: 32
  FORWARDSLASH: 191
  TAB: 9

Luca.config.toolbarContainerClass = "toolbar-container"

# build a reverse map
Luca.keyMap = Luca.config.keyMap = _( Luca.keys ).inject (memo, value, symbol)->
  memo[value] = symbol.toLowerCase()
  memo
, {}

Luca.config.showWarnings = true
Luca.config.default_socket_port = 9292
