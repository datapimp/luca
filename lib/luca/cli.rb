require 'thor'
require 'thor/group'

module Luca
  module Cli
    class Base < Thor
      class << self
        def start(*args)
          # Change flag to a module
          ARGV.unshift("help") if ARGV.delete("--help")

          # Default command is server
          if ARGV[0] != "help" && (ARGV.length < 1 || ARGV.first.include?("-"))
            ARGV.unshift("help")
          end

          super
        end
      end
    end
  end
end
