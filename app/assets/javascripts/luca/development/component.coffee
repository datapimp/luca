model = Luca.register  "Luca.models.Component"
model.extends           "Luca.Model"

model.configuration
  defaults:
    class_name: undefined
    superClass: undefined
    asset_id: undefined
    source_file_contents: ""
    defined_in_file: ""

model.defines
  idAttribute: "name"
  
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
    parts = @get('name').split('.')
    parts.slice(0,2).join('.')

  componentType: ()->
    type  = "view"
    parts = @get('name').split('.')

    switch group = parts[1]
      when "collections" then "collection"
      when "models" then "model"
      else "view"

  componentTypeAlias: ()->
    parts = @get('name').split('.')
    name = parts.pop()
    _.str.underscored( name )
