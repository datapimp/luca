require 'eventmachine'

module Luca
  module CodeSync
    class Listener
      attr_reader :client,
                  :channel,
                  :app

      def initialize application_name, options={}
        @client   = Faye::Client.new("http://localhost:#{ options[:port] || 9292 }/faye")
        @app      = Luca::LucaApplication.new(appication_name, options)
        @channel  = options[:channel] || "/code-sync/write"
      end

      def start ch=nil
        EM.run do
          client.subscribe(ch || channel) do |message|
            puts message.inspect
          end
        end
      end
    end
  end
end