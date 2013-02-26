module Luca
  module Rails
    require 'luca/template'
    require 'luca/test_harness'
    require 'luca/project_harness'
        
    if defined?(::Rails)
      require 'luca/rails/engine'
    end
  end
end

