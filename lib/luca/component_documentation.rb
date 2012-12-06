#!/usr/bin/env ruby

if __FILE__==$0
  require 'pry'
end

class ComponentDocumentation
  attr_accessor :comments
  attr_accessor :arguments
  attr_accessor :method_signature
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
    @component_class_path = component_name.split('.').map { |el| el.downcase! }
    read_file
  end

  def method_data_for method
    @method = method
    load_section
    load_comments
    load_arguments
    load_method_signature
    self
  end

  def all
    { comments:@comments, arguments:@arguments, method_signature:@method_signature, method:@method }
  end

  private

  def load_comments
    @comments = @relevent_section[0].match(COMMENTS_REGEX)[0]
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

  def load_method_signature
    @method_signature = @relevent_section[0].match(/^\s*(#{@method})\s*(:)\s*(\(.*\)\-\>)/)[0].strip()
  end

  def read_file
    file_path = find_file
    @file_contents = File.open(file_path).read()
  end

  def find_file
    FILE_PATHS.each do |path|
      if File.exists?("#{base_path}/#{path}/#{@component_class_path.last}.coffee")
        return "#{base_path}/#{path}/#{@component_class_path.last}.coffee"
      end
    end
    nil
  end

  def base_path
    "/Users/alexsmith/Development/luca"
  end
  
  def load_section
    @relevent_section = @file_contents.match(/(^\s*#.*$\n)*(\s*#{@method}\s*:\s*\(.*\)\s*-\>.*$)/)
  end


end

if __FILE__==$0
  pry
end
