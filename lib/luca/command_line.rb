require 'optparse'

module Luca
  class CommandLine
    BANNER = <<-EOS
Usage luca [command] [options] 

Luca is a generator for apps based on the luca-ui framework.

Options:
  EOS

    def initialize
      parse_options
      Sidecar::Message.new(@options)
    end

    def parse_options
      @options = {
        :message_type   => nil,
        :contents       => nil,
        :config_path    => nil,
        :base_url       => nil,
        :project_root   => Dir.getwd,
        :channel        => "client"
      }

      @option_parser = OptionParser.new do |opts|
        opts.on('-r','--root',)

        opts.on('-W','--disable-watcher') do
          @options[:disable_watcher] = true
        end

        opts.on('-d','--debug','Enable debugging mode') do
          @options[:debug] = true
        end

        opts.on('-c','--config PATH','Path to sidecar.yml') do |config_path|
          @options[:config_path] = config_path
        end

        opts.on('-a', '--assets LIST','List of files to evaluate in the target environment') do |assets|
          @options[:contents] = assets
        end

        opts.on_tail('-v','--version','display Sidecar version') do
          puts "Sidecar version #{Sidecar::VERSION}"
          exit
        end
      end
      
      arguments = ARGV.dup
      
      @options[:channel] = arguments[0]
      @options[:message_type] = arguments[1]

      @option_parser.banner = BANNER
      @option_parser.parse!(arguments)
    end
  end
end
