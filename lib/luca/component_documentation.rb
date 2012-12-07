#!/usr/bin/env ruby

if __FILE__==$0
  require 'pry'
end

class ComponentDocumentation
  attr_accessor :comments
  attr_accessor :arguments
  attr_accessor :method

  COMMENTS_REGEX =  /(^\s*#.*$\n)*/
  ARGUMENTS_REGEX = /^(.*)=(.+)/

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
    file = Dir.glob("#{ App.root }/src/**/#{underscore(@component_class_path.last)}.coffee")[0]
  end

  def underscore string
    string.gsub(/::/, '/').
    gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
    gsub(/([a-z\d])([A-Z])/,'\1_\2').
    tr("-", "_").
    downcase
  end

  def load_section
    @relevent_section = @file_contents.match(/(^\s*#.*$\n)*(\s*#{@method}\s*:\s*\(.*\)\s*-\>.*$)/)
  end

end


if __FILE__==$0
  pry
end
