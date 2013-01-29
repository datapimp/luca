module Luca
  class Stylesheet
    attr_accessor :path, :source, :compiler

    def initialize(path)
      @source = @path = path
      @compiler = AssetCompiler.new(file: path, type: type)
    end

    def to_change_notification
      as_json
    end

    # TODO: Add support for less, sass, etc
    def type
      "scss"
    end

    def compiled
      @compiler.compiled rescue ""
    end

    def as_json options={}
      {
        defined_in_file:  source, 
        type:             "stylesheet", 
        compiled:         compiled,
        source_file_contents:  IO.read(source),
        name:             File.basename(source),
        # temp
        path:             source.gsub(::Rails.root.to_s, '.'),
        id:               source.gsub(::Rails.root.to_s, '.').gsub('/','__')
      }
    end
  end  
end