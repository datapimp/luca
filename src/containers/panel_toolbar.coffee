panelToolbar = Luca.register        "Luca.components.PanelToolbar"
# The Panel Toolbar is a collection of buttons and / or dropdowns
# which are automatically created by BasicPanel classes, or can be
# added to any other view component.
panelToolbar.extends                "Luca.View"


panelToolbar.defines
  # @buttons is an array of button config objects
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
  buttons:[]

  className: "luca-ui-toolbar btn-toolbar"

  well: true

  orientation: 'top'

  autoBindEventHandlers: true

  events:
    "click a.btn, click .dropdown-menu li" : "clickHandler"

  initialize: (@options={})->
    @_super("initialize", @, arguments)

    # if the toolbar consists of a single button group
    # don't make the developer specify buttons = {buttons:[group:true, buttons:[...]]}
    if @group is true and @buttons?.length >= 0
      @buttons = [
        group: true
        buttons: @buttons
      ]

  # The Toolbar behaves by triggering events on the components which they
  # belong to. Combined with Luca.View::setupHooks it is a clean way
  # to organize actions
  clickHandler: (e)->
    me = my = $( e.target )
    me = my = $( e.target ).parent() if me.is('i')

    if @selectable is true
      my.siblings().removeClass("is-selected")
      me.addClass('is-selected')

    return unless eventId = my.data('eventid')

    hook = Luca.util.hook( eventId )

    source = @parent || @
    if _.isFunction( source[hook] )
      source[ hook ].call(@, me, e)
    else
      source.trigger(eventId, me, e)

  beforeRender:()->
    @_super("beforeRender", @, arguments)

    if @well is true
      @$el.addClass 'well'

    @$el.addClass 'btn-selectable' if @selectable is true
    @$el.addClass "toolbar-#{ @orientation }"
    @$el.addClass "pull-right" if @align is "right"
    @$el.addClass "pull-left" if @align is "left"

  render: ()->
    @$el.empty()
    @$el.append( element ) for element in prepareButtons(@buttons)
    @


make = Backbone.View::make

buildButton = (config, wrap=true)->
  if config.ctype? or config.type?
    config.className ||= ""
    config.className += 'toolbar-component'

    object = Luca(config).render()

    if Luca.isBackboneView(object)
      return object.$el

  if config.spacer
    return make "div", class: "spacer #{ config.spacer }"

  if config.text
    return make "div", {class: "toolbar-text"}, config.text

  wrapper = 'btn-group'
  wrapper += "#{ config.wrapper }" if config.wrapper?
  wrapper += "pull-#{ config.align } align-#{ config.align }" if config.align?
  wrapper += 'btn-selectable' if config.selectable is true

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
      class: _.compact(["btn",config.classes,config.className]).join(" ")
      "data-eventId" : config.eventId
      title: config.title || config.description

    buttonAttributes["class"] += " btn-#{ config.color }" if config.color?
    buttonAttributes["class"] += " is-selected" if config.selected?

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

prepareButtons = (buttons=[], wrap=true)->
  buildButton(button, wrap) for  button in buttons
