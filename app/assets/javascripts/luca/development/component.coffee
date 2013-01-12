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
  url: ()->
    "/luca/components/#{ Luca.namespace }/#{ @classNameId() }"

  fileDescription: (shortest=true)->
    base = @get("defined_in_file").replace( ToolsBasePath, '.')
    if shortest then _(base.split('/')).last() else base

  metaData: ()->
    Luca( @get("class_name") ).prototype.componentMetaData()

  classNameId: ()->
    @get("class_name").replace(/\./g,'__')

  initializeAsset: ()->
    return @_definitionAsset if @_definitionAsset?

    return unless @get("name")?

    @assetCollection ||= Tools().collectionManager.get("coffeescripts")

    unless @get("asset_id")?
      @_definitionAsset = new @assetCollection.model
        input: @get("source_file_contents")

      @assetCollection.add(@_definitionAsset)

      @_definitionAsset.save {}, success: (model, response, options={})=>
        @save(asset_id: response.id)

  definedIn: ()->
    @initializeAsset()

  componentType: ()->
    parts = @get('name').split('.')
    name = parts.pop()
    _.str.underscored( name )
