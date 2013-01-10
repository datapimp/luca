# Note:
#
# This is a WIP and does not provide much in the way of configuration at the moment.  It requires a running instance of 
# Faye on port 9295.
ENV['RAILS_ENV'] ||= 'development'
require File.expand_path('../../../config/boot',  __FILE__)
require File.expand_path('../../../config/environment',  __FILE__)
Dir.glob("./app/models/**/*.rb").each {|f| require(f) }

module Guard
  class Luca < Guard
    attr_accessor :faye_notifier, :project

    def initialize(watchers=[],options={})
      super
      UI.info "Guard::Luca"
      @faye_notifier = FayeNotifier.new(url:"/faye")
      @project = Project.find_by_path( Dir.pwd() )
    end

    def start
      UI.info "Guard::Luca has been started"
    end

    def generate_notification_payload_for(paths=[])
      paths.compact.inject({}) do |memo,guard_path|
        base = "stylesheets"
        base = "javascripts" if guard_path.match(/(coffee|js|ejs.haml|mustache)$/)
        path = File.join(".","app","assets", base , guard_path)
        memo[path] = project.app.find_asset_wrapper_for(guard_path).to_change_notification
        memo
      end      
    end

    def run_on_changes(paths)
      notification_payload = generate_notification_payload_for(paths)
      UI.info notification_payload.to_json
      faye_notifier.publish("/changes", notification_payload )
    end
  end

  class FayeNotifier
    attr_reader :client

    def initialize options={}
      @url = options[:url] 
    end

    def client
      @client ||= ::Faye::Client.new("http://localhost:9295/faye")
    end

    def shutdown
      EM.stop
    end

    def publish channel, message
      EM.run do
        client = ::Faye::Client.new("http://localhost:9295/faye")
        pub    = client.publish( channel, message )
        pub.callback { EM.stop }
        pub.errback { EM.stop }
      end
    end

  end

end
