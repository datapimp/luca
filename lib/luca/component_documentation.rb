#!/usr/bin/env ruby

if __FILE__==$0
  require 'pry'
end

class ComponentDocumentation
  def initialize component_name
    @component_name = component_name
    file_root = ""
    filename = @component_name.split('.')[1].downcase
    @file_path = "#{file_root}/src/components/#{filename}.coffee"
    @file_contents = File.open(file_path).read()
  end

  def method_data
  end

  def comments
  end

  def arguments

  end
end

class DocumentationGenerator
  FILE_ROOT = "/Users/alexsmith/Development/luca"
  def initialize options={}
    raise "Must pass options[:class_name]" if options[:class_name].nil?
    raise "Myst pass options[:property]" if options[:property].nil?
    @class_name = options[:class_name]
    @property_name = options[:property]
    load_target_file
  end

  def load_target_file
    file_path = "#{FILE_ROOT}/src/components/#{@class_name}.coffee"
    @file_contents = File.open(file_path).read()
    @property_match = @file_contents.match(/(^\s*#.*$\n)*(\s*#{@property_name}\s*:\s*\(.*\)\s*-\>.*$)/)
  end

  def args
    args = @property_match[0].match(/^\s*#{@property_name}\s*:\s*\((.*)\)\s*-\>.*$/)[1]
    args = args.gsub(/\s/,'').split(',')
    args.inject({}) do |memo, arg|
      if default_args = arg.match(/^(.*)=(.+)/)
        memo[default_args[1].to_sym] = default_args[2]
      else
        memo[arg.to_sym] = nil
      end
      memo
    end
  end

  def comments
    @comments = @property_match[0].match(/(^\s*#.*$\n)*/)[0]
  end

  def function_signature

  end

  def docs
    @property_match[0]
  end

end

if __FILE__==$0
  pry
end
