# Note:
#
# This is a WIP and does not provide much in the way of configuration at the moment.  It requires a running instance of 
# Faye on port 9295, and a connection to redis.  I plan to make the Luca::Collection backend work against a file store
# in the most simple case
boot = File.join( Dir.pwd(), 'config', 'boot.rb' ) 
environment = File.join( Dir.pwd(), 'config', 'environment.rb' ) 

begin
  ENV['RAILS_ENV'] ||= 'development'
  require boot
  require environment
rescue
  throw "Doesn't make sense using this outside of rails at the moment"
end

module Guard
  class Luca < Guard
    attr_accessor :faye_notifier, :project

    def initialize(watchers=[],options={})
      super
      UI.info "Guard::Luca"
      @faye_notifier = FayeNotifier.new(faye_url)
      @project = ::Luca::Project.find_by_path( Dir.pwd() )

      throw "Could not find a luca project in redis.  Create one for this path." unless @project
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

    def faye_url
      ENV['LUCA_CODE_SYNC_URL'] || "//localhost:9292/faye"
    end

    def run_on_changes(paths)
      # temp
      paths.map(&:downcase!)
      notification_payload = generate_notification_payload_for(paths)
      UI.info notification_payload.to_json
      faye_notifier.publish("/changes", notification_payload )
    end
  end

  class FayeNotifier
    attr_reader :client, :url

    def initialize url 
      @url = url
    end

    def client
      @client ||= ::Faye::Client.new(url)
    end

    def shutdown
      EM.stop
    end

    def publish channel, message
      EM.run do
        UI.info "Publishing To #{ url }"
        client = ::Faye::Client.new(url)
        pub    = client.publish( channel, message )
        pub.callback { EM.stop }
        pub.errback { EM.stop }
      end
    end

  end

end
