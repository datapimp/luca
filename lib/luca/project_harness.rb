module Luca
  # The Luca::ProjectHarness makes the source code browsing endpoints available
  class ProjectHarness < Sinatra::Base
    get "/framework/documentation" do
      app = Luca::LucaApplication.new("Luca", root: Luca.base_path)
      
      payload = if File.exists?( app.export_file_location ) 
        IO.read( app.export_file_location )
      else
        app.export
      end

      payload
    end

    get "/framework/documentation/:class_name" do
      application_repository    = Luca::LucaApplication.new("Luca", root: Luca.base_path)
      class_name                =  params[:class_name].gsub('__','.')
      component_definition      = application_repository.find_component_definition_for_class( class_name )      

      component_definition.as_json(:include_contents=>true).to_json      
    end


    get "/compiled/assets/:type/:id.:extension" do
      asset = Luca::CompiledAsset.find_by_type_and_id( params[:type], params[:id] )
      content_type asset.mime_type

      asset.output
    end

    get "/components/:application_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      definitions               = application_repository.component_definitions.map(&:as_json)

      definitions.to_json
    end

    get "/stylesheets/:application_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      list = application_repository.find_stylesheet(params)

      list.to_json
    end

    get "/templates/:application_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      templates                 = application_repository.templates.map(&:as_json)

      templates.to_json
    end

    get "/templates/:application_name/:template_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      templates                 = application_repository.templates.map(&:as_json)
      template                  = templates.detect {|tmpl| tmpl.template_name == params[:template_name] }

      template.to_json
    end

  
    post "/components/:application_name" do    
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      {success:true}.to_json
    end

    put "/components/:application_name/:class_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      class_name                =  params[:class_name].gsub('__','.')
      component_definition      = application_repository.find_component_definition_for_class( class_name )          

      {success: true}.to_json
    end

    get "/components/:application_name/:class_name" do
      application_repository    = Luca::Project.find_by_name( params[:application_name] ).app
      class_name                =  params[:class_name].gsub('__','.')
      component_definition      = application_repository.find_component_definition_for_class( class_name )      

      component_definition.as_json(:include_contents=>true).to_json
    end

  end
end