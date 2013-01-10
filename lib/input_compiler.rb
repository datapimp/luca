class InputCompiler
  attr_accessor :type, :input, :file, :name

  def initialize(options={})
    @input    = options[:input]
    @type     = options[:type] 
    @name     = options[:name]

    @file     = options[:file]

    if file
      @name ||= File.basename(file).split('.').first
      @input ||= IO.read(file)
    end
  end

  def output
    @output ||= compiled
  end

  def compiled
    compile_file_manually
  end
  
  def filename
    @filename ||= "#{ rand(36**16).to_s(36).slice(0,8) }__#{ name }#{ extension }"
  end

  protected
    def compile_file_manually
      return compile_file_using_sass if (type == "scss" or type == "sass")
      return compile_file_using_less if (type == "less")
      return compile_file_using_coffeescript if (type == "coffeescript")
      return compile_file_using_markdown if (type == "markdown")
      return compile_template if template?
    end

    def compile_template
      compile_file_using_sprockets
    end

    def compile_file_using_markdown
      Redcarpet.new(input).to_html()  
    end

    def compile_file_using_sass
      Sass.compile(input)
    end

    def compile_file_using_less
      Less.compile(input)
    end

    def compile_file_using_coffeescript
      CoffeeScript.compile(input)
    end

    def base_type
    end
    
    def extension
      case type
      when "coffeescript"
        ".js.coffee"
      when "less"
        ".css.less"
      when "scss"
        ".css.scss"
      when "haml"
        ".html.haml"
      when "mustache"
        then ".mustache"
      when "template"
        then ".jst.ejs.haml"
      end
    end

    def sprockets
      return @sprockets if @sprockets

      @sprockets = Rails.application.assets
      @sprockets.prepend_path( File.join(Rails.root,'tmp') )

      @sprockets
    end

    def template?
      type == "template" || type == "mustache"
    end

    def temporary_folder
      File.join(Rails.root,"tmp")
    end


    def compile_target
      return @compile_target if @compile_target

      @compile_target = File.join( temporary_folder, filename )
      File.open("#{ compile_target }", 'w+') do |fh|
        fh.puts(input)
      end      

      @compile_target
    end

    def compile_file_using_sprockets
      begin
        asset = sprockets.find_asset(File.basename(compile_target))
        @output = asset.to_s
      ensure
        FileUtils.rm( compile_target )
      end
    end
end