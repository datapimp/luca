module Luca
  class TestHarness < Sinatra::Base
    get "/specs/:application_profile" do
      'sup baby'
    end
  end
end