module Luca
  module Cli
    class Sync < Thor
      namespace :sync  

      method_options :namespace => :string
      method_option :port, :default => 9292 
      method_option :timeout, :default => 25 
      method_option :channel, :default => "faye"
      method_option :root, :default => Dir.pwd()

      desc "sync", "sync APPLICATION_NAME [options]" 
      def sync application_name
        fork do
          watch(application_name)  
        end

        fork do
          server(application_name)
        end

        Process.waitpid
      end

      no_tasks do
        def watch application_name
          puts "Watching application assets for changes..."
          watcher = Luca::Watcher.new(application_name, options)
          watcher.start
        end        

        def server application_name
          puts "Running code sync faye process on channel #{ options[:channel] } port #{ options[:port] }"
          process = Luca::Server.new(:mount=>"/#{ options[:channel] }",:timeout=>options[:timeout])
          process.listen(options[:port])
        end      
      end
    end
  end
end