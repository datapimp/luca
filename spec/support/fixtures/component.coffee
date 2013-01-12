# This is a sample component definition file 
# for the luca framework.  The header of the file
# is used to describe the general purpose of the component.
component = Luca.register "Luca.SampleComponent"
component.extends         "Luca.View"

# We can comment on a specific entry such as the mixins.
component.mixesIn         "SomeMixin"

component.privateConfiguration
  # this is a basic description of the private setting.
  # expects: Boolean
  privateSetting: false 
  el: '#viewport'
  bodyClassName: "viewport-body"
  
component.publicConfiguration
  # this is a comment for the public setting
  publicSetting: ["1,2,3"]
  
component.publicMethods
  # here is some documentation for methodOne 
  methodOne: ()->
    @thisIsSomeMethodicalShitSon()
    @puttingAllsortsOfCode
      allUp: "InYo"
      bidness: "Baby"

  # here is a multi line comment for methodTwo
  # it is pretty dope
  # that i can do this
  methodTwo: (butThistime="withSomArguments", youKnow=[], man={})->
    @okCool()

