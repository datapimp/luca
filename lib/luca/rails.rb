module Luca
  module Rails
    require 'luca/template'
    require 'luca/test_harness'
    require 'luca/code_browser'
    
    if defined?(::Rails)
      require 'luca/rails/engine'
    end
  end
end

