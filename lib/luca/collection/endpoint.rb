module Luca
  module Collection
    class Endpoint < Sinatra::Base
      # Index
      get "/collections/:namespace" do  
        @collection = Luca::Collection::Base.new(namespace: params[:namespace])
        @collection.index.to_json
      end

      # Show
      get "/collections/:namespace/:id" do
        @collection = Luca::Collection::Base.new(namespace: params[:namespace])
        @collection.show( params[:id] ).to_json
      end

      # Create
      post "/collections/:namespace" do
        @collection = Luca::Collection::Base.new(namespace: params[:namespace])
        payload = JSON.parse( request.body.read.to_s )
        @collection.create(payload).to_json
      end

      # Update
      put "/collections/:namespace/:id" do
        @collection = Luca::Collection::Base.new(namespace: params[:namespace])
        payload = JSON.parse( request.body.read.to_s )
        @collection.update(payload).to_json
      end

      # Destroy
      delete "/collections/:namespace/:id" do
        @collection = Luca::Collection::Base.new(namespace: params[:namespace])
        @collection.destroy(params).to_json
      end
    end
  end
end