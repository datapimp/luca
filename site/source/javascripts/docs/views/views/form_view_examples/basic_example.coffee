# The `Docs.views.BasicFormView` is an example of the `Luca.components.FormView`.
# In this basic example, the form contains a range of different fields.  They are
# rendered one on top of another.  You can get more advanced and nest containers within
# your form, or use a `@bodyTemplate` and specify your own DOM structure, and assign
# components to custom CSS selectors within it.
form = Docs.register    "Docs.views.BasicFormView"
form.extends            "Luca.components.FormView"

form.privateConfiguration
  # Any values you specify in the `@defaults` property will be
  # set on each of the components in this container.
  defaults:
    type: "text"

form.publicConfiguration
  # You can manually define a `@components` property, or in your component
  # definition you can use the special `contains` directive, the only difference
  # is your personal preference for readability.  I did it this way 
  components:[
    label: "Text Field One"
  ,
    type: "select"
    label: "Select Field One"
    collection:
      data:[
        ['Alpha','Alpha']
        ['Bravo','Bravo']
        ['Charlie','Charlie']
        ['Delta','Delta']
      ]
  ,
    type: "checkbox_field"
    label: "Checkbox Field"

  ]

form.register()  

