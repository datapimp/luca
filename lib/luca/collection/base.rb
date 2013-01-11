# This is intended to provide a cheap, throw-away persistence solution
# for luca collections.  Based on redis.
#
# it provides a Backbone.sync adapter and API endpoint for accessing it.  
#
# It is used to make luca.collections persistent for
# multiple users.  Not intended to be used in production or for any apps
# which require data integrity. 

require 'json'
require 'redis'

module Luca
  module Collection
    class Base
      attr_accessor :namespace, 
                    :redis, 
                    :id_storage, 
                    :required_attributes, 
                    :redis_database

      def initialize options={}
        @namespace            = options[:namespace].to_s
        @redis                = options[:redis] ||= $redis
        @id_storage           = options[:id_storage] ||= "#{ @namespace }:ids"
        @required_attributes  = options[:required_attributes] || []

        validate_redis_connection
      end

      def sync method, hash={}, options={}
        if method == "read" and hash[:id].nil?
          return index()
        end

        if method == "read" and hash[:id].present?
          return show( hash[:id] )
        end

        if method == "create"
          return create( hash )
        end

        if method == "update"
          return update( hash )
        end

        if method == "delete"
          return destroy( hash )
        end
      end

      alias_method :backbone_sync, :sync  

      def validate_redis_connection
        unless @redis
          require 'redis'
          @redis ||= Redis.new host: "localhost", port: 6379, db: 5
        end

        unless @redis.respond_to?(:get) and @redis.respond_to?(:incr) and @redis.respond_to?(:mget)
          throw "Must specify a valid redis instance."      
        end
      end

      def record_ids
        Array(redis.smembers( id_storage )).map {|id| "#{ namespace }/#{ id }"}
      end

      def clear!
        return unless record_ids.length > 0
        redis.del( *record_ids )
        redis.del( id_storage ) 
      end

      def generate_id id_base=nil
        id_base ||= id_storage
        redis.incr("next:#{ id_base }:id")
      end

      def index search=nil
        return [] unless record_ids.length > 0
        
        redis.mget( *record_ids ).map {|serialized| JSON.parse(serialized) rescue nil }.compact
      end

      def show id
        record = redis.get("#{ namespace }/#{ id }")
        JSON.parse( record ) if record
      end

      def create hash
        hash.symbolize_keys!

        if required_attributes.any? {|attribute| hash[attribute].nil?}
          return {success: false, error:"Missing required attributes."}
        end 

        next_id = hash[:id] ||= generate_id 

        serialized = JSON.generate(hash)
        response = redis.set "#{ namespace }/#{ next_id }", serialized 

        if response == "OK"
          redis.sadd id_storage, hash[:id]
          return {success: true, id: hash[:id], record: hash}
        else
          return {success: false, error:"Error adding record in data store."}
        end  
      end

      def destroy hash
        hash.symbolize_keys!

        stored = redis.get("#{ namespace }/#{ hash[:id] }")  

        if stored
          redis.del "#{ namespace }/#{ hash[:id] }" 
          return {success: true}
        else
          return {success: false, error:"Could not find record with #{ hash[:id] }"}
        end
      end

      def update hash
        hash.symbolize_keys!

        if required_attributes.any? {|attribute| hash[attribute].nil?}
          return {success: false, error:"Missing required attributes."}
        end 

        stored = redis.get("#{ namespace }/#{ hash[:id] }")  

        if stored.nil?
          return {success: false, error:"Could not find record with #{ hash[:id] }"}
        end

        serialized = JSON.generate(hash)
        result = redis.set "#{ namespace }/#{ hash[:id] }", serialized

        if result == "OK"
          return {success: true}
        else
          return {success: false, error:"Error adding record in data store."}
        end        
      end
    end
  end  
end
