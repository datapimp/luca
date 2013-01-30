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
    base = _( @toJSON() ).pick 'header_documentation', 'class_name' 
    _.extend(base, @metaData())      
    
  url: ()->
    "/project/components/#{ Luca.namespace }/#{ @classNameId() }"

  fileDescription: (shortest=true)->
    base = @get("defined_in_file").replace( ToolsBasePath, '.')
    if shortest then _(base.split('/')).last() else base

  metaData: ()->
    Luca( @get("class_name") ).prototype.componentMetaData()

  classNameId: ()->
    @get("class_name").replace(/\./g,'__')

  componentGroup: ()->
    parts = @get('name').split('.')
    parts.slice(0,2).join('.')

  componentType: ()->
    parts = @get('name').split('.')
    name = parts.pop()
    _.str.underscored( name )
