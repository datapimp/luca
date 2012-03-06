require 'optparse'

module Luca
  class CommandLine
    BANNER = <<-EOS
    luca-ui generator

    used to generate an application skeleton, or components

    example:

    luca new MyApp

    EOS

    attr_accessor :keystore, :arguments

    GRAMMAR = %w{}

    def initialize arguments=[]
      arguments = arguments.split if arguments.is_a? String
      parse_options arguments

      if !@options[:action]
        puts @option_parser.banner
        exit
      end
    end

    def options
      @options
    end

    def parse_options arguments=[]
      @options = {}

      @option_parser = OptionParser.new do |opts|
        opts.separator ""
        opts.separator "Actions:"

        opts.on("-n",'--new APPLICATION_NAME','Create a new luca-ui app skeleton') do |s|
          @options[:action] = "new"
        end

        opts.separator ""
        opts.separator "Common Options:"

        opts.on_tail("-h","--help",'You are looking at it') do
          puts opts
          exit
        end

        opts.on_tail('-v','--version','display Sentry version') do
          puts "Luca Version #{ Luca::VERSION }"
          exit
        end
      end

      @option_parser.banner = BANNER

      arguments.collect! do |arg|
        GRAMMAR.include?(arg.downcase) ? "--#{ arg.downcase }" : arg
      end

      @option_parser.parse!( arguments )
    end

  end
end
