module Luca
  class LucaApplication
    attr_accessor :application_name,
                  :options



    # Public: creates an instance of a luca application repository.
    # generally this will be a single folder inside of your asset pipeline
    #
    # Example:
    #   repo = LucaApplication.new("Tools",root:"/path/to/rails/app") 
    def initialize application_name, options={}
      @application_name = application_name
      @options = options
    end

    def export_all
      # TODO
    end

    def export_all_component_definintions
      list = component_definitions.map do |cdef|
        cdef.as_json rescue nil
      end  
      list.compact
    end

    def component_definition_filemap 
      component_definitions.inject({}) do |memo, definition|
        memo[ definition.class_name ] = definition.source
        memo
      end
    end

    def find_asset_wrapper_for filename
      if filename.match(/\.js$/) || filename.match(/\.coffee$/)
        wrapper = component_definitions(false).detect do |component_definition|
          component_definition.source && 
          component_definition.source.match(filename)
        end
      end

      if filename.match(/\.mustache/) || filename.match(/\.jst/)
        wrapper = templates.detect do |template|
          template.source && template.source.match(filename)
        end  
      end

      if filename.match(/css|sass|less/)
        wrapper = stylesheets.detect do |stylesheet|
          stylesheet.source && stylesheet.source.match(filename)
        end
      end

      return wrapper
    end

    def source_code_for_class class_name
      find_component_definition_for_class(class_name).contents
    end

    def find_definition_file_for_class needle
      definition = find_component_definition_for_class(needle)
      definition && definition.source
    end

    def find_component_definition_for_class needle
      component_definitions.detect {|d| d.class_name == needle }
    end

    def namespace
      return options[:application_name] if options[:appliction_name]

      line = initializer_file_contents.lines.to_a.detect do |l|
        l.match(/Luca.initialize/)
      end

      match = line.match(/Luca.initialize.+['|"](.+)['|"]/)

      if match && match[1] 
        match[1]
      else
        application_folder.capitalize
      end
    end

    def valid?
      !initializer_file_location.nil? and File.exists?(initializer_file_location)
    end

    def templates
      template_file_locations.map {|path| TemplateAsset.new(path) }
    end

    def stylesheets
      stylesheet_file_locations.map {|path| Stylesheet.new(path) }
    end

    def find_stylesheet(params={})
      if params[:component_class]
        parts = params[:component_class].split('.')
        parts.map!(&:downcase)
        parts.reject! {|p| p == "views" || p == "components" || p == "containers" || p == "pages" }
        params[:css_class] = parts.join('_').dasherize

      end

      stylesheets.reject do |stylesheet|
        match = false

        if params[:css_class]
          match = stylesheet.compiled.include?( params[:css_class] )
        end

        match
      end
    end

    def component_definitions(reject_invalid=true)
      list = component_file_locations.map do |path|
        ComponentDefinition.new(path)
      end

      return list unless reject_invalid

      list.select do |definition|
        definition.valid?
      end
    end  

    protected
      def template_extensions
        options[:template_extensions] || ['jst.ejs.haml','mustache'] 
      end  

      def stylesheet_extensions
        options[:stylesheet_extensions] || ['css.scss']
      end

      def component_extensions
        options[:component_extensions] || ['.coffee']
      end

      def application_folder
        options[:application_folder] || application_name.downcase
      end

      def stylesheet_file_locations
        stylesheet_folders.flat_map do |folder|
          Dir.glob("#{ folder }/**/*.css.scss")        
        end
      end

      def component_file_locations
        component_folders.flat_map do |folder|
          Dir.glob("#{ folder }/**/*.coffee")
        end
      end

      def template_file_locations
        template_folders.flat_map do |folder|
          template_extensions.flat_map do |extension|
            Dir.glob("#{ folder }/**/*.#{ extension }")
          end
        end
      end

      def stylesheet_folders
        list = Dir.entries( stylesheets_root )
        list = list.slice(2, list.length)
        
        list.map! do |path|
          File.join(stylesheets_root, path)
        end

        list.select! {|path| File.exists?(path) && File.directory?(path) }

        (list << stylesheets_root << stylesheets_location).uniq
      end

      def template_folders
        Dir.glob("#{ javascripts_root }/**/templates*")
      end

      def component_folders
        list = %w{views components collections models pages containers} 
        list += Array(options[:component_folders])

        list.map! do |folder|
          File.join(coffeescripts_location, folder)
        end

        # add the root folder
        list << coffeescripts_location

        list.select {|path| File.exists?(path) || File.directory?(path) }
      end

      def initializer_file_contents
        initializer_file_location && IO.read( initializer_file_location )
      end

      def initializer_file_location
        filename = root_coffeescript_files.detect do |file|
          IO.read( File.join(coffeescripts_location, file) ).match('Luca.initialize')
        end

        File.join( coffeescripts_location, filename )
      end

      def root_coffeescript_files
        Dir.entries( coffeescripts_location ).select do |file|
          !File.directory?(file) && File.extname(file).match(/coffee/)
        end
      end 

      def coffeescripts_location
        options[:coffeescripts_location] || File.join(javascripts_root, application_folder)
      end

      def stylesheets_location
        options[:stylesheets_location] || File.join(stylesheets_root, application_folder)
      end

      def stylesheets_root
        options[:stylesheets_root] || File.join(project_root, "app", "assets", "stylesheets")
      end

      def javascripts_root
        options[:javascripts_root] || File.join(project_root, "app", "assets", "javascripts")
      end

      def project_root
        options[:root] || (::Rails.root rescue Dir.pwd())
      end

  end
end
