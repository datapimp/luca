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
  
  documentation: ()->
    base = _( @toJSON() ).pick 'header_documentation', 'class_name', 'defined_in_file'

    _.extend base, @metaData(), 
      componentGroup: @componentGroup() 
      componentType: @componentType() 
      componentTypeAlias: @componentTypeAlias()
      details:
        publicMethods:        @documentationFor("publicMethods")
        privateMethods:       @documentationFor("privateMethods")
        privateProperties:    @documentationFor("privateProperties")
        publicProperties:     @documentationFor("publicProperties")

  documentationFor: (methodOrPropertyGroup="publicMethods")->
    documentationSource = _.extend({}, @get("defines_methods"), @get("defines_properties"))

    result = {}

    if list = @metaData()?[ methodOrPropertyGroup ]?()
      _(list).reduce (memo, methodOrProperty)->
        memo[ methodOrProperty ] = documentationSource[ methodOrProperty ]
        memo
      , result  

    result

  url: ()->
    "/project/components/#{ Luca.namespace }/#{ @classNameId() }"

  metaData: ()->
    Luca( @get("class_name") ).prototype.componentMetaData()

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
