class ComponentDocumentation
  attr_accessor :comments
  attr_accessor :arguments
  attr_accessor :method

  COMMENTS_REGEX =  /(^\s*#.*$\n)*/
  ARGUMENTS_REGEX = /^(.*)=(.+)/
  FILE_PATHS = ['src/components',
                'src/concerns',
                'src/containers',
                'src/core',
                'src/managers',
                'src/plugins',
                'src/samples',
                'src/templates',
                'src/tools',
                'src',
                'src/components/fields']

  def initialize component_name
    @component_class_path = component_name.split('.')
    read_file
  end

  def method_data_for method
    @method = method
    load_section
    load_comments
    load_arguments
    self
  end

  def all
    { comments:@comments, arguments:@arguments, method:@method }
  end

  private

  def load_comments
    unless @relevent_section.nil?
      @comments = @relevent_section[0].match(COMMENTS_REGEX)[0]
    end
  end

  def load_arguments
    args = @relevent_section[0].match(/^\s*#{@method}\s*:\s*\((.*)\)\s*-\>.*$/)[1].gsub(/\s/,'').split(',')
    @arguments = args.inject({}) do |memo, arg|
      if default_args = arg.match(ARGUMENTS_REGEX)
        memo[default_args[1].to_sym] = default_args[2]
      else
        memo[arg.to_sym] = nil
      end
      memo
    end
  end

  def read_file
    file_path = find_file
    @file_contents = File.open(file_path).read()
  end

  def find_file
    search_path = []
    FILE_PATHS.each do |path|
      search_path.push "#{base_path}/#{path}/#{underscore(@component_class_path.last)}.coffee"
      if File.exists?("#{base_path}/#{path}/#{underscore(@component_class_path.last)}.coffee")
        return "#{base_path}/#{path}/#{underscore(@component_class_path.last)}.coffee"
      end
    end
    raise "Couldn't find file: #{underscore(@component_class_path.last)}\n Search Path: #{search_path.join("\n")}"
  end

  def underscore string
    string.gsub(/::/, '/').
    gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
    gsub(/([a-z\d])([A-Z])/,'\1_\2').
    tr("-", "_").
    downcase
  end

  def base_path
    "/Users/alexsmith/Development/luca"
  end
  
  def load_section
    @relevent_section = @file_contents.match(/(^\s*#.*$\n)*(\s*#{@method}\s*:\s*\(.*\)\s*-\>.*$)/)
  end


end
