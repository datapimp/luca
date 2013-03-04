module Luca
  module Cli
    class Server < Thor
      namespace :server

      desc "server", "server APPLICATION_NAME [options]"  

      method_options :namespace => :string
      method_option :port, :default => 9295 
      method_option :timeout, :default => 25 
      method_option :channel, :default => "luca"
      method_option :root, :default => Dir.pwd() 

      def server namespace
        fork do
          process = Luca::CodeSync::Server.new(:mount=>"/#{ options[:channel] }",:timeout=>options[:timeout])
          process.listen(options[:port])          
        end

        fork do
          listener = Luca::CodeSync::Listener.new(namespace, root:options[:root])
          listener.start
        end

        Process.waitpid
      end

    end
  end
end