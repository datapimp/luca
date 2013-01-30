module Luca
  class Collection
    class FileBackend

      attr_accessor :namespace,
                    :required_attributes,
                    :file_storage,
                    :record_storage,
                    :data_dir

      def initialize options={}
        @options              = options.dup
        @namespace            = options[:namespace]
        @required_attributes  = options[:required_attributes]
        @data_dir             = options[:data_dir] || File.join(::Rails.root, "db", "collections")

        unless File.exists?( file_storage_location )
          FileUtils.mkdir_p(data_dir)
   
          flush_storage_to_disk
        end
      end

      def flush_storage_to_disk
        File.open(file_storage_location, 'w+') do |fh|
          payload = JSON.generate(record_storage)
          fh.puts(payload)
        end
      end

      def read_storage_from_disk
        data = IO.read( file_storage_location )  
        @record_storage = JSON.parse(data)
      end

      def file_storage_location
        File.join(data_dir, "#{ namespace }.json")
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

      def record_storage
        @record_storage ||= {
          :namespace => namespace,
          :id_counter => 0,
          :records => []
        }       

        @record_storage.symbolize_keys!
        @record_storage
      end

      def records
        Array(record_storage.try(:[], :records))
      end

      def index
        records
      end

      def show id
        record = records.detect {|r| r[:id].to_s == id.to_s }
        record.symbolize_keys!
        record
      end

      def allocate_id
        record_storage[:id_counter] += 1  
      end

      def create attributes={}
        attributes.symbolize_keys!
        attributes[:id] ||= allocate_id 
        records << attributes
        flush_storage_to_disk
        {success:true,id:attributes[:id],record:attributes} 
      end

      def update attributes={}
        attributes.symbolize_keys!
        record = show(attributes[:id])
        record.merge! attributes
        flush_storage_to_disk
        {success:true,record:record} 
      end

      def destroy id
        records.reject! do |record|
          record[:id] == id
        end
        flush_storage_to_disk
        {success:true}
      end

    end
  end
end