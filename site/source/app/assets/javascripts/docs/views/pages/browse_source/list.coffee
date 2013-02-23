view = Docs.register      "Docs.views.ComponentList"
view.extends              "Luca.components.ScrollableTable"
view.defines
  paginatable: false
  maxHeight: 200
  collection: "luca_documentation"
  columns:[
    reader: "class_name"
    width: "20%"
    renderer: (name)->
      "<a class='link'>#{ name }</a>"
  ,
    reader: "class_name"
    header: "Extends From"
    width: "20%"
    renderer: (className)->
      if component = Luca.util.resolve(className)
        name = component.prototype.componentMetaData()?.meta["super class name"]
        "<a class='link'>#{ name }</a>"
  ,
    reader: "type_alias"
    header: "Shortcut"
    width: "10%"
  ,
    reader: "defined_in_file"
    header: "<i class='icon icon-github'/> Github"
    renderer: (file)->
      shortened = file.split("javascripts/luca/")[1]
      "<a href='https://github.com/datapimp/luca/blob/master/app/assets/javascripts/luca/#{ shortened }'>#{ shortened }</a>"
  ]

