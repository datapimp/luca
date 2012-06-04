make = Backbone.View::make

buildButton = (button, wrap=true)->
  wrapper = 'btn-group'
  wrapper += " #{ button.wrapper }" if button.wrapper?
  wrapper += " align-#{ button.align }" if button.align?

  # if we're passed a group, then we need to just
  # wrap the contents of the buttons property in that group
  # skipping the btn-group wrapping that takes place for
  # individual buttons
  if button.group? and button.buttons?
    buttons = prepareButtons( button.buttons, false )
    return make "div", class: wrapper, buttons

  # if it is a normal button, and not a button group
  else
    label = button.label ||= ""

    button.eventId ||= _.string.dasherize( button.label.toLowerCase() )

    if button.icon
      label = " " if _.string.isBlank( label )
      white = "icon-white" if button.white
      label = "<i class='#{ white } icon-#{ button.icon }' /> #{ label }"

    buttonAttributes =
      class: "btn"
      "data-eventId" : button.eventId
      title: button.title || button.description

    buttonAttributes["class"] += " btn-#{ button.color }" if button.color?

    if button.dropdown
      label = "#{ label } <span class='caret'></span>"
      buttonAttributes["class"] += " dropdown-toggle"
      buttonAttributes["data-toggle"] = "dropdown"

      dropdownItems = _(button.dropdown).map (dropdownItem)=>
        link = make "a", {}, dropdownItem[1]
        make "li", {"data-eventId": dropdownItem[0]}, link

      dropdownEl = make "ul", {class:"dropdown-menu"}, dropdownItems

    buttonEl = make "a", buttonAttributes, label

    # needs to be wrapped for proper rendering, but not
    # if it already is part of a group
    autoWrapClass = "btn-group"
    autoWrapClass += " align-#{ button.align }" if button.align?

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