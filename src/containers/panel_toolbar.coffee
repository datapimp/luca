
# button config accepts the following paramters:
#
# label       what should the button say
# eventId     what event should the button trigger
# dropdown    an array of arrays: [eventId, label]
# group       an array of button configs
# wrapper     a css class, in addition to btn-group
# icon        which icon do you want to use on this button?
# white       true or false: is it a white colored text?
# color       options are primary, info, success, warning, danger, inverse

make = Backbone.View::make

buildButton = (config, wrap=true)->
  if config.ctype?
    return Luca(config)?.render()?.el

  if config.spacer
    return make "div", class: "spacer #{ config.spacer }"

  if config.text
    return make "div", {class: "toolbar-text"}, config.text

  wrapper = 'btn-group'
  wrapper += " #{ config.wrapper }" if config.wrapper?
  wrapper += " align-#{ config.align }" if config.align?

  # if we're passed a group, then we need to just
  # wrap the contents of the buttons property in that group
  # skipping the btn-group wrapping that takes place for
  # individual buttons
  if config.group? and config.buttons?
    buttons = prepareButtons( config.buttons, false )
    return make "div", class: wrapper, buttons

  # if it is a normal button, and not a button group
  else
    label = config.label ||= ""

    config.eventId ||= _.string.dasherize( config.label.toLowerCase() )

    if config.icon
      label = " " if _.string.isBlank( label )
      white = "icon-white" if config.white
      label = "<i class='#{ white || "" } icon-#{ config.icon }' /> #{ label }"

    buttonAttributes =
      class: "btn"
      "data-eventId" : config.eventId
      title: config.title || config.description

    buttonAttributes["class"] += " btn-#{ config.color }" if config.color?

    if config.dropdown
      label = "#{ label } <span class='caret'></span>"
      buttonAttributes["class"] += " dropdown-toggle"
      buttonAttributes["data-toggle"] = "dropdown"

      dropdownItems = _(config.dropdown).map (dropdownItem)=>
        link = make "a", {}, dropdownItem[1]
        make "li", {"data-eventId": dropdownItem[0]}, link

      dropdownEl = make "ul", {class:"dropdown-menu"}, dropdownItems

    buttonEl = make "a", buttonAttributes, label

    # needs to be wrapped for proper rendering, but not
    # if it already is part of a group
    autoWrapClass = "btn-group"
    autoWrapClass += " align-#{ config.align }" if config.align?

    if wrap is true
      return make "div", {class: autoWrapClass}, [buttonEl,dropdownEl]
    else
      # for buttons which are already part f a group
      buttonEl

prepareButtons = (buttons, wrap=true)->
  _( buttons ).map (button)->
    buildButton(button, wrap)


#### Panel Toolbar Component
#
# The Panel Toolbar is a collection of buttons and / or dropdowns
# which are automatically created by BasicPanel classes, or can be
# added to any other view component.
_.def("Luca.containers.PanelToolbar").extends("Luca.View").with

  className: "luca-ui-toolbar btn-toolbar"

  # @buttons is an array of button config objects


  buttons:[]

  well: true

  orientation: 'top'

  autoBindEventHandlers: true

  events:
    "click a.btn, click .dropdown-menu li" : "clickHandler"

  #autoBindEventHandlers: true

  # The Toolbar behaves by triggering events on the components which they
  # belong to. Combined with Luca.View::setupHooks it is a clean way
  # to organize actions
  clickHandler: (e)->
    me = my = $( e.target )

    if me.is('i')
      me = my = $( e.target ).parent()

    eventId = my.data('eventid')

    return unless eventId?

    hook = Luca.util.hook( eventId )

    source = @parent || @
    if _.isFunction( source[hook] )
      source[ hook ].call(@, me, e)
    else
      source.trigger(eventId, me, e)

  beforeRender:()->
    Luca.View::beforeRender?.apply(@, arguments)

    if @well is true
      @$el.addClass 'well'

    @$el.addClass "toolbar-#{ @orientation }"

    @applyStyles( @styles ) if @styles?

  render: ()->
    @$el.empty()

    elements = prepareButtons(@buttons)
    _( elements ).each (element)=>
      @$el.append( element )