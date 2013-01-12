module Luca
  class CompiledAsset
    class << self
      attr_accessor :coffeescript_assets,
                    :sass_assets,
                    :scss_assets,
                    :less_assets,
                    :markdown_assets
    end

    self.coffeescript_assets  = Luca::Collection::Base.new(namespace:"coffeescripts")
    self.sass_assets          = Luca::Collection::Base.new(namespace:"sass_stylesheets")
    self.scss_assets          = Luca::Collection::Base.new(namespace:"scss_stylesheets")
    self.less_assets          = Luca::Collection::Base.new(namespace:"less_stylesheets")
    self.markdown_assets      = Luca::Collection::Base.new(namespace:"markdown_assets")

    attr_accessor :type, :asset 

    def initialize type, asset 
      @type = type
      @asset = asset
    end

    def compiler
      @compiler ||= AssetCompiler.new(input: asset['input'], type: type)
    end

    def output
      compiler.output
    end

    def mime_type
      if type == "coffeescript" || type == "haml" || type == "mustache"
        "text/javascript"
      elsif type == "markdown"
        "text/html"
      else
        "text/css"
      end
    end

    def self.find_by_type_and_id type, id
      if ["markdown", "haml","coffeescript","sass","scss","less"].include?(type)
        asset = self.send("#{ type }_assets".to_sym).try(:show, id)
        if asset.present?
          new(type, asset)
        end
      end
    end
  end
end
