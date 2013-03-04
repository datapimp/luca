module Luca
  module Cli
    class Watch < Thor
      namespace :watch

      desc "watch", "watch APPLICATION_NAME [options]"
      method_options :name => :string
      method_option :root, :default => Dir.pwd()

      def watch application_name
        watcher = Luca::CodeSync::Watcher.new(application_name, options)
        watcher.start
      end
    end
  end
end