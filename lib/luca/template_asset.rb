module Luca
  class TemplateAsset
    attr_accessor :path, :compiler, :contents

    def initialize(path)  
      @path = path
      @contents = IO.read(path)
      @compiler = AssetCompiler.new(input:contents, type: type, file: path)
    end

    def to_change_notification
      as_json
    end

    def as_json 
      {
        type:             type, 
        contents:         compiled,
        template_name:    template_name,
        template_prefix:  template_prefix,
        defined_in_file:  source
      }
    end

    def type
      "template"
    end

    def source
      path
    end

    def template_prefix
      path.gsub(/^.*app\/assets\/javascripts\//,'').split('.').first
    end

    def template_name
      File.basename(path).split('.').first
    end

    def type
      return 'mustache' if path.match(/.mustache/)
      'template'
    end

    def compiled
      begin
        output = @compiler.compiled
        needle = @compiler.filename.gsub(/\..*$/,'')
        output.gsub(needle, "#{ template_prefix }")
      rescue
        ""
      end
    end
  end
end  