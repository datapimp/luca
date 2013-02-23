module Luca
  module Cli
    class Server < Thor
      namespace :server

      desc "server", "server APPLICATION_NAME [options]"  

      method_options :namespace => :string
      method_option :port, :default => 9292 
      method_option :timeout, :default => 25 
      method_option :channel, :default => "faye"

      def server namespace
        process = Luca::Server.new(:mount=>"/#{ options[:channel] }",:timeout=>options[:timeout])
        process.listen(options[:port])
      end

    end
  end
end