module Luca
  class CompiledAsset
    class << self
      attr_accessor :coffeescript_assets,
                    :sass_assets,
                    :scss_assets,
                    :less_assets,
                    :markdown_assets,
                    :asset_stores_setup
    end

    self.asset_stores_setup = false

    def self.setup_asset_stores
      return if self.asset_stores_setup == true
      
      self.coffeescript_assets  = Luca::Collection.new(namespace:"coffeescripts",backend:"file")
      self.sass_assets          = Luca::Collection.new(namespace:"sass_stylesheets",backend:"file")
      self.scss_assets          = Luca::Collection.new(namespace:"scss_stylesheets",backend:"file")
      self.less_assets          = Luca::Collection.new(namespace:"less_stylesheets",backend:"file")
      self.markdown_assets      = Luca::Collection.new(namespace:"markdown_assets",backend:"file")
      self.asset_stores_setup = true
    end

    attr_accessor :type, :asset 

    def initialize type, asset 
      CompiledAsset.setup_asset_stores
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
