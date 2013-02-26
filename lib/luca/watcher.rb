module Luca
  class Watcher
    attr_reader :app,
                :listener,
                :notifier,
                :id

    def initialize(name, options={})
      @app      = Luca::LucaApplication.new(name, options)
      @notifier = FayeNotifier.new(options[:url] || "//localhost:9292/faye")
      @id       = rand(36**36).to_s(36).slice(0,8)
      @listener = Listen.to(app.assets_root)
                    .filter(options[:filter] || /(\.coffee|\.css|\.jst|\.mustache)/)
                    .latency(options[:latency] || 1)
                    .change do |modified, added, removed|
                      notify(modified, added, removed)
                    end
    end

    def throttle?
      !@last_change_detected_at.nil? && seconds_since_last_change < 5
    end

    def seconds_since_last_change
      Time.now.to_i - (@last_change_detected_at || 0).to_i
    end

    def notify modified, added, removed
      return if throttle?
      @last_change_detected_at = Time.now.to_i 
      begin 
        payload = change_payload_for(modified + added)
        notifier.publish("/luca-code-sync", payload)
      rescue e
        puts "Error publishing payload: #{ $! }"
      end
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