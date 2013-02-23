module Luca
  class Watcher
    attr_reader :app,
                :listener,
                :notifier

    def initialize(name, options={})
      @app      = Luca::LucaApplication.new(name, options)
      @notifier = FayeNotifier.new(options[:url] || "//localhost:9292/faye")
      @listener = Listen.to(app.assets_root)
                    .filter(options[:filter] || /(\.coffee|\.css|\.jst|\.mustache)/)
                    .latency(options[:latency] || 1)
                    .change do |modified, added, removed|
                      notify(modified, added, removed)
                    end
    end

    def notify modified, added, removed
      payload = change_payload_for(modified + added)
      notifier.publish("/luca-code-sync", payload)
    end

    def change_payload_for paths     
      paths.inject({}) do |memo, path| 
        file = path.gsub( app.assets_root, '')

        if file && asset = app.find_asset_wrapper_for(file)
          memo[path] = asset.to_change_notification
        end  

        memo
      end
    end

    def start
      puts "Looking for changes in #{ app.application_name }: #{ app.assets_root }"
      @listener.start
    end
  end


  class Watcher::FayeNotifier
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
        client = ::Faye::Client.new(url)
        pub    = client.publish( channel, message )
        pub.callback { EM.stop }
        pub.errback { EM.stop }
      end
    end

  end

end