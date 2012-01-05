# -*- encoding: utf-8 -*-
require File.expand_path('../lib/luca/rails/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = "luca"
  s.version     = Luca::Rails::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Jonathan Soeder"]
  s.email       = ["jonathan.soeder@gmail.com"]
  s.homepage    = "http://datapimp.github.com/luca"
  s.summary     = "A Backbone.JS Component Framework"
  s.description = "This gem allows you to use the luca-ui backbone.js component framework easily with the assets pipeline"

  s.required_rubygems_version = ">= 1.3.6"

  s.add_dependency "railties", "~> 3.1"
  s.add_dependency "thor",     "~> 0.14"
  s.add_development_dependency "bundler", "~> 1.0.0"
  s.add_development_dependency "rails",   "~> 3.1"

  s.files        = `git ls-files`.split("\n")
  s.executables  = `git ls-files`.split("\n").select{|f| f =~ /^bin/}
  s.require_paths = ['lib']
end

