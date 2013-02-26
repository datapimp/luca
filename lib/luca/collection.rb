# The Luca::Collection can be exposed via a Rack based Luca::Collection::Endpoint.
# It allows for a cheap persistence mechanism to support front end Luca.Collection objects.
module Luca
  class Collection
    require 'luca/collection/redis_backend'
    require 'luca/collection/file_backend'
    require 'luca/collection/endpoint'

    attr_accessor :backend,
                  :options,
                  :namespace

    def initialize options={}
      @options    = options.dup
      @backend    = options[:backend]
      @namespace  = options[:namespace]

      setup_backend
    end    

    def sync method, hash={}, options={}
      backend.sync(method, hash, options)
    end

    def index
      backend.index
    end

    def create hash={}
      backend.create(hash)
    end

    def update hash={}
      backend.update(hash)
    end

    def show id
      backend.show(id)
    end

    def destroy id
      backend.destroy(id)
    end

    protected
      def setup_backend
        if backend.nil?
          if options[:backend] == "file"
            self.backend = Luca::Collection::FileBackend.new(namespace: namespace)
          end

          if options[:backend] == "redis"
            self.backend = Luca::Collection::RedisBackend.new(namespace: namespace)
          end  

          if backend.nil? and defined?(Redis)
            self.backend = Luca::Collection::RedisBackend.new(namespace: namespace)
          else
            self.backend = Luca::Collection::FileBackend.new(namespace: namespace)
          end
        end        
      end
  end
end
