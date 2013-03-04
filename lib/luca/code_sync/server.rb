require 'rubygems'
require 'faye'

module Luca
  module CodeSync
    class Server < Faye::RackAdapter
      def start port
        listen(port)
      end 
    end
  end
end