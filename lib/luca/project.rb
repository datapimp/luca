module Luca
  class Project
    class << self
      attr_accessor :storage
    end


    attr_accessor :name, 
                  :path

    def self.storage
      self.storage ||= Luca::Collection::Base.new(namespace:"projects")
    end

    def self.create attributes={}
      storage.create(attributes)
    end

    def self.index
      storage.index
    end

    def self.find_by_path path
      data = storage.index.detect do |project_data|
        project_data['path'] == path
      end
      
      new(path: data['path'], name: data['name'])    
    end

    def self.find_by_name name
      data = storage.index.detect do |project_data|
        project_data['name'] == name
      end

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