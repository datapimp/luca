# The `Docs.views.ComplexLayoutForm` is an example of a `Luca.components.FormView` which contains
# a nested container, and which uses the bootstrap grid helper properties `@rowFluid` and `@span` 
# to arrange the nested components inside of a grid layout.
#
# In addition to laying out the form components visually, there is a nested `Luca.containers.CardView`
# component which shows / hides various field sets depending on what options you select on the form.
# This is an example of how Luca framework components can be assembled together arbitrarily to build
# whatever type of user interface you can imagine.
form = Docs.register      "Docs.views.ComplexLayoutForm"
form.extends              "Luca.components.FormView"

form.privateConfiguration
  # By setting `@rowFluid` to true, this container
  # will support the twitter bootstrap grid layout.  Applying
  # the `@span` property to the direct children of this component
  # will control their width 
  rowFluid: true

  # Here is an example of using the `@componentEvents` property to listen
  # to the change event on the select field identified by the role 'group_selector'.
  # once that field emits its change event, we change the active display card in the
  # nested card selector.
  componentEvents:
    "group_selector on:change" : "selectGroup"

form.privateMethods
  # The selectGroup method is bound to the componentEvent listener.  Whenever
  # the group_selector field changes its value, we want to change which field
  # group is visible on the form.
  selectGroup: ()->
    desiredGroup = @getGroupSelector().getValue()
    selector = @getGroupDisplaySelector()
    selector.activate(desiredGroup) 

form.contains
  type: "container"
  span: 6
  components:[
    type: "text"
    label: "Field One"
  ,
    type: "text"
    label: "Field Two"
  ,
    type: "text"
    label: "Field Three"
  ]
,
  type: "container"
  span: 6
  components:[
    label: "Select a Group"
    type: "select"
    role: "group_selector"
    includeBlank: false
    valueType: "string"
    collection:
      data:[
        ["alpha","Alpha Group"]
        ["bravo", "Bravo Group"]
        ["charlie","Charlie Group"]
      ]
  ,
    type: "card"
    role: "group_display_selector"
    components:[
      name: "alpha"
      defaults:
        type: "text"
      components:[
        type: "view"
        tagName: "h4"
        bodyTemplate: ()-> "Group One"
      , 
        label: "Alpha"
      ,
        label: "Bravo"
      ,
        label: "Charlie"
      ]
    ,
      name: "bravo"
      defaults:
        type: "checkbox_field"
      components:[
        type: "view"
        tagName: "h4"
        bodyTemplate: ()-> "Group Two"
      ,
        label: "One"
      ,
        label: "Two"
      ]
    ,
      name: "charlie"
      defaults:
        type: "button_field"      
      components:[
        type: "view"
        tagName: "h4"
        bodyTemplate: ()-> "Group Three"
      ,
        input_value: "Button One"
        icon_class: "chevron-up"
      ,
        input_value: "Button Two"
        icon_class: "pencil"
      ] 
    ]
  ]