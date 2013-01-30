module Luca
  class Project
    class << self
      attr_accessor :storage
    end


    attr_accessor :name, 
                  :path

    def self.store
      self.storage ||= Luca::Collection.new(namespace:"projects")
    end

    def self.create attributes={}
      store.create(attributes)
    end

    def self.index
      store.index
    end

    def self.find_by_path path
      data = index.detect do |project_data|
        project_data['path'] == path
      end
      
      return nil unless data 

      new(path: data['path'], name: data['name'])    
    end

    def self.find_or_create_by_name(name, attributes={})
      if existing = find_by_name(name)
        return existing
      else
        attributes[:name] = name  
        create(attributes)
      end
    end

    def self.find_by_name name
      data = index.detect do |project_data|
        project_data['name'] == name
      end

      return nil unless data

      new(path: data['path'], name: data['name'])
    end

    def initialize options={}
      @path = options[:path]
      @name = options[:name] || File.basename(@path)
    end

    def as_json
      {path: path, name: name}
    end

    def git
      @git ||= Grit::Repo.new(path) 
    end

    def app
      luca_application
    end

    def luca_application
      @luca_application ||= LucaApplication.new(name.capitalize, root: path)
    end
  end  
end