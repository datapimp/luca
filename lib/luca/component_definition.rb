require 'rubygems'
require 'redcarpet'
require 'active_support/core_ext'

module Luca
  class ComponentDefinition
    attr_accessor :source, :markdown

    ARGUMENTS_REGEX = /^\w+\:\s*\((.+)\)/

    class << self
      attr_accessor :markdown
    end

    begin
      self.markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
    rescue Exception => e
       
    end 

    def initialize source 
      @source     = source
      read_source()
    end

    def read_source
      raise "Invalid source type" unless source.match(/.coffee|.js/)
      @contents   = IO.read(source)
    end

    def update contents
    #  File.open(source,'w+') do |fh|
    #    fh.puts(contents)
    #  end
    end

    def to_change_notification
      as_json(compile:true, include_contents:true)
    end

    def as_json options={} 
      base = {
        source: source,
        defined_in_file: source,
        type: "javascript",
        starts_on_line: definition_line.line_number
      }

      unless class_name.nil?
        base.merge!({ :class_name           => class_name,
                      :defined_in_file      => source,
                      :header_documentation => header_documentation,
                      :type_alias           => type_alias,
                      :type                 => "component_definition",
                      :css_class_identifier => css_class_identifier,
                      :defines_methods      => method_definition_map,
                      :defines_properties   => property_definition_map })
      end

      if options[:include_contents]
        base.merge!(:source_file_contents => contents)
      end

      if options[:compile]
        base.merge!(:compiled => compiled_contents)
      end

      base
    end

    def method_definition_map
      defines_methods.inject({}) do |memo, meth|
        definition_line = find_definition_of(meth)
        memo[meth] = {
          defined_on_line: definition_line.line_number,
          documentation: documentation_for(meth) || "",
          arguments: argument_information_for(meth)        
        } 
        memo
      end
    end

    def property_definition_map
      defines_properties.inject({}) do |memo,property|
        definition_line = find_definition_of(property)
        memo[property] = {
          defined_on_line: definition_line.line_number,
          documentation: documentation_for(property),
          default: ''
        }
        memo
      end
    end

    def argument_information_for method
      information = []
      definition = find_definition_of(method).line.strip

      if arguments  = definition.match(ARGUMENTS_REGEX)
        arguments = arguments.to_a[1]
        information = arguments.split(',').map(&:strip).inject(information) do |memo, argument|
          parts = argument.split('=').map(&:strip)
          memo << {:argument=>parts[0],:value=>parts[1]}
        end
      end

      information
    end

    def valid?
      !class_name.nil?
    end

    def parse
    end

    def contents
      @contents.to_s
    end

    def compiler
      AssetCompiler.new(input: contents, type: "coffeescript")
    end

    def compiled
      compiled_contents
    end

    def compiled_contents
      compiler.output
    end 

    def type_alias
      classified = class_name && class_name.split('.').last
      classified && classified.underscore
    end

    def view_based?
      extends && !(
        extends.match('.models.') || 
        extends.match('.collections.') || 
        extends.match(/Collection$/) || 
        extends.match(/Model$/)
        )
    end

    def css_class_identifier
      return '' unless view_based?

      parts = class_name.split('.')
      parts -= ['views','components'] 

      parts.map!(&:underscore)
      parts.map!(&:dasherize)

      parts.join('-')
    end

    def extends
      extends_line.split(' ').last.gsub(/"|'/,'')
    end

    def class_name 
      match = definition_line && definition_line.match(/register.*["|'](.*)["|']/)
      match && match[1]
    end

    def component_definition
      self
    end

    def lines
      line_number = 0
      contents.lines.map do |line|
        Line.new(line, (line_number += 1) )
      end
    end

    def extends_line
      match = lines.detect do |line|
        line.component_extension?(definition_proxy_variable_name)
      end

      match && match.strip
    end

    def documentation_for method_or_property, compile=true
      comment_lines = find_comments_above(method_or_property).collect(&:line)
      comments = comment_lines.map do |comment_line|
        comment_line.gsub(/\A\s*\#/,'').strip
      end

      data = comments.reverse.join("\n")

      docs = if compile == true
        self.class.markdown.render(data) rescue data
      end

      docs
    end

    def header_documentation
      header_comments(true)
    end

    def header_comment_lines
      header_lines  = lines[ (0..(definition_line.line_number || 0) ) ]
      comments      = header_lines.select(&:comment?).map(&:line)
      
      comments.map! {|line| line.gsub(/\A\s*\#[\ |\n]/,'') }
      comments.reject! {|line| line.match(/\=\s*require/) }

      comments
    end

    def header_comments compile=true
      combined = header_comment_lines.join("")

      if compile && self.class.markdown && self.class.markdown.respond_to?(:render)
        self.class.markdown.render(combined)
      else
        combined
      end
    end

    def find_comments_above method_or_property
      comment_lines = []
      if line = find_definition_of( method_or_property )
        line_number = line.line_number
        indentation_level = line.indentation_level        

        next_line = find_line_by_number( line_number -= 1)
        while !next_line.nil? && next_line.indentation_level == indentation_level && next_line.comment?
          comment_lines << next_line
          next_line = find_line_by_number( line_number -= 1)
        end
      end

      comment_lines
    end

    def definition_proxy_variable_name
      definition_line.split('=').first.strip
    end

    def find_line_by_number line_number=1
      lines.detect {|line| line.line_number == line_number }
    end

    def definition_line
      lines.detect do |line|
        !line.comment? && line.component_definition?
      end
    end

    def defines
      lines.select(&:defines_property_or_method?).collect(&:defines)
    end

    def defines_methods
      lines.select(&:defines_method?).collect(&:defines)
    end

    def find_definition_of method_or_property
      lines.select(&:defines_property_or_method?).detect {|line| line.defines && line.defines.length > 0 && line.defines == method_or_property }
    end

    def defines_properties
      lines.select(&:defines_property?).collect(&:defines)
    end

    class Line
      attr_accessor :line, :line_number, :found_in

      def initialize(line,line_number)
        @line = line
        @line_number = line_number
      end

      def match pattern
        line.match(pattern)
      end

      def split delimiter
        line.split(delimiter)
      end

      def strip
        line.strip 
      end

      def details
        {
          type:                 type,
          line_number:          line_number,
          indentation_level:    indentation_level 
        }
      end

      def indentation_level
        space_count = if match = line.match(/\A */)[0] and match.length > 0
          match.length
        else
          0
        end

        space_count / 2
      end

      def defines_method?
        !comment? && indentation_level == 1 && line.match(/\s*\w+\:\s*\(.*\)/)      
      end

      def comment?
        line.match(/^(\s*)\#/) or line == "#\n"
      end

      def defines_property?
        !comment? && !defines_method? && indentation_level == 1 && line.match(/\s*\w+\:.*\w*/)
      end

      def body?
        indentation_level == 1 && line.match(/^\s+/)
      end

      def component
        found_in
      end

      def component_definition?
        line.match(/[A-Z].+\.register/)
      end

      def component_extension?(proxy)
        line.include?("#{ proxy }.extends") 
      end    

      def defines_property_or_method?
        defines_method? || defines_property?
      end

      def defines
        if defines_property_or_method? 
          line.split(':').first.strip
        end
      end
    end

  end  
end
