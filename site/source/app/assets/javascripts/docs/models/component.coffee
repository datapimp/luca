model = Docs.register  "Docs.models.Component"
model.extends           "Luca.Model"

model.configuration
  defaults:
    class_name: undefined
    superClass: undefined
    asset_id: undefined
    source_file_contents: ""
    defined_in_file: ""

model.defines
  idAttribute: "class_name"
  
  contentsWithoutHeader: ()->
    startsAt  = @get("starts_on_line") || 0
    contents  = @get("source_file_contents").split("\n")
    count     = contents.length 

    if startsAt > 0
      startsAt = startsAt - 1

    contents.slice(startsAt, count).join("\n")

  documentation: ()->
    base = _( @toJSON() ).pick 'header_documentation', 'class_name', 'defined_in_file'

    _.extend base, @metaData(), 
      componentGroup: @componentGroup() 
      componentType: @componentType() 
      componentTypeAlias: @componentTypeAlias()
      details:
        publicMethods:        @methodDocumentationFor("publicMethods")
        privateMethods:       @methodDocumentationFor("privateMethods")
        privateProperties:    @propertyDocumentationFor("privateProperties","privateConfiguration")
        publicProperties:     @propertyDocumentationFor("publicProperties","publicConfiguration")

  methodDocumentationFor: (groups...)->
    documentationSource = _.extend({}, @get("defines_methods"))
    result = {}

    for group in groups
      if list = @metaData()?[ group ]?()
        _.extend result, _(list).reduce (memo, methodOrProperty)->
          memo[ methodOrProperty ] = documentationSource[ methodOrProperty ]
          memo
        , {}  

    result    

  propertyDocumentationFor: (groups...)->
    documentationSource = _.extend({}, @get("defines_properties"))
    result = {}

    for group in groups
      if list = @metaData()?[ group ]?()
        _.extend result, _(list).reduce (memo, methodOrProperty)->
          memo[ methodOrProperty ] = documentationSource[ methodOrProperty ]
          memo
        , {}  

    result

  url: ()->
    "/project/components/#{ Luca.namespace }/#{ @classNameId() }"

  metaData: ()->
    Luca.util.resolve( @get("class_name") )?.prototype.componentMetaData()

  classNameId: ()->
    @get("class_name").replace(/\./g,'__')

  componentGroup: ()->
    parts = @get('class_name').split('.')
    parts.slice(0,2).join('.')

  componentType: ()->
    type  = "view"
    parts = @get('class_name').split('.')

    switch group = parts[1]
      when "collections" then "collection"
      when "models" then "model"
      when ("views" || "components" || "pages") then "view"

    return if group?

    if componentPrototype = Luca.util.resolve( @get("class_name") )
      return "view" if Luca.isViewPrototype( componentPrototype:: )
      return "collection" if Luca.isCollectionPrototype( componentPrototype:: )
      return "model" if Luca.isModelProtoype( componentPrototype:: )

    # meh, but what about Router?
    "view"

  componentTypeAlias: ()->
    parts = @get('class_name').split('.')
    name = parts.pop()
    _.str.underscored( name )
