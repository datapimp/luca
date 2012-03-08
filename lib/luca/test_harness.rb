module Luca
  class TestHarness < Sinatra::Base
    get "/specs/:application_profile" do
      render :text => Rails.configuration.inspect
    end
  end
end