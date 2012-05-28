make = Backbone.View::make

buildButton = (button, wrap=true)->
  wrapper = 'btn-group'
  wrapper += " #{ button.wrapper }" if button.wrapper?

  # if we're passed a group, then we need to just
  # wrap the contents of the buttons property in that group
  # skipping the btn-group wrapping that takes place for
  # individual buttons
  if button.group? and button.buttons?
    buttons = prepareButtons( button.buttons, false )
    return make "div", class: wrapper, buttons

  # if it is a normal button, and not a button group
  else
    label = button.label

    buttonAttributes =
      class: "btn"

    if button.dropdown
      label = "#{ label } <span class='caret'></span>"
      buttonAttributes["class"] += " dropdown-toggle"
      buttonAttributes["data-toggle"] = "dropdown"

      dropdownItems = _(button.dropdown).map (dropdownItem)=>
        link = make "a", {}, dropdownItem[1]
        make "li", {"data-item": dropdownItem[0]}, link

      dropdownEl = make "ul", {class:"dropdown-menu"}, dropdownItems

    buttonEl = make "a", buttonAttributes, label

    # needs to be wrapped for proper rendering, but not
    # if it already is part of a group
    if wrap is true
      return make "div", {class: "btn-group"}, [buttonEl,dropdownEl]
    else
      # for buttons which are already part f a group
      buttonEl

prepareButtons = (buttons, wrap=true)->
  _( buttons ).map (button)->
    buildButton(button, wrap)

_.def("Luca.containers.PanelToolbar").extends("Luca.View").with
  className: "btn-toolbar"

  buttons:[
    label: "hi"
    dropdown: [
      ["one","one"]
      ["two","two"]
    ]
  ,
    group: true
    wrapper: 'span4 offset8'
    buttons:[
      label: "one"
    ,
      label: "two"
    ]
  ]


  render: ()->
    elements = prepareButtons(@buttons)
    _( elements ).each (element)=> @$el.append( element )

