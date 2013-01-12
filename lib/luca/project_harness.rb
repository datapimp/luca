module Luca
  # The Luca::ProjectHarness makes the source code browsing endpoints available
  class ProjectHarness < Sinatra::Base

    get "/compiled/assets/:type/:id.:extension" do
      asset = Luca::CompiledAsset.find_by_type_and_id( params[:type], params[:id] )
      content_type asset.mime_type
      asset.output
    end

    get "/components/:application_name" do
      application_repository  = Luca::Project.find_by_name( params[:application_name] ).app
      definitions             = application_repository.component_definitions.map(&:as_json)
      definitions.to_json
    end

    get "/components/:application_name/:class_name" do
      application_repository  = Luca::Project.find_by_name( params[:application_name] ).app
      class_name              =  params[:class_name].gsub('__','.')
      component_definition    = application_repository.find_component_definition_for_class( class_name )      

      component_definition.as_json(:include_contents=>true).to_json
    end

  end
end