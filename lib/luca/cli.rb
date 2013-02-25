require 'thor'
require "thor/group"
require "pry"

module Luca
  module Cli
    class Base < Thor
      class << self
        def start(*args)
          # Change flag to a module
          ARGV.unshift("help") if ARGV.delete("--help")

          # Default command is help
          if ARGV[0] != "help" && (ARGV.length < 1 || ARGV.first.include?("-"))
            ARGV.unshift("server")
          end

          super
        end
      end

      desc "version", "Show version"
      def version
        require 'luca/version'
        say "Luca #{Luca::Version}"
      end

      def help(meth = nil, subcommand = false)
        if meth && !self.respond_to?(meth)
          klass, task = Thor::Util.find_class_and_task_by_namespace("#{meth}:#{meth}")
          klass.start(["-h", task].compact, :shell => self.shell)
        else
          list = []
          Thor::Util.thor_classes_in(Luca::Cli).each do |klass|
            list += klass.printable_tasks(false)
          end
          list.sort!{ |a,b| a[0] <=> b[0] }

          shell.say "Tasks:"
          shell.print_table(list, :ident => 2, :truncate => true)
          shell.say
        end
      end

      def method_missing(meth, *args)
        meth = meth.to_s

        if self.class.map.has_key?(meth)
          meth = self.class.map[meth]
        end

        klass, task = Thor::Util.find_class_and_task_by_namespace("#{meth}:#{meth}")

        if klass.nil?
          super
        else
          args.unshift(task) if task
          klass.start(args, :shell => self.shell)
        end
      end
    end
  end
end

require "luca/cli/generate"
require "luca/cli/watch"
require "luca/cli/server"
require "luca/cli/sync"
