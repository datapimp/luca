module Luca
  module Cli
    class Watch < Thor
      namespace :watch

      desc "watch", "watch APPLICATION_NAME [options]"
      method_options :name => :string
      method_option :assets_root, :default => File.join(Dir.pwd(),"app","assets")

      def watch application_name, options={}
        watcher = Luca::Watcher.new(application_name, options)
        watcher.start
      end
    end
  end
end