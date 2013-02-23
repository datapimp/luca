# -*- encoding: utf-8 -*-
require File.expand_path('../lib/luca/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = "luca"
  s.version     = Luca::Version
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Jonathan Soeder"]
  s.email       = ["jonathan.soeder@gmail.com"]
  s.homepage    = "http://datapimp.github.com/luca"
  s.summary     = "A Backbone.JS Component Framework"
  s.description = "This gem allows you to use the luca-ui backbone.js component framework easily with the assets pipeline"

  s.required_rubygems_version = ">= 1.3.6"

  s.add_dependency "railties", ">= 3.1"
  s.add_dependency "thor",     "~> 0.14"
  s.add_dependency "sinatra", ">= 0.9.2"
  s.add_dependency "ejs"
  s.add_dependency "hogan_assets"
  s.add_dependency "redcarpet", "~> 2.2.2"
  s.add_dependency "activesupport", ">= 3.2.12"
  s.add_dependency "sprockets", ">= 2.4.5"
  s.add_dependency "listen", ">= 2.4.5"
  s.add_dependency "faye", ">= 0.8.8"
  s.add_dependency "thin"

  s.add_development_dependency "bundler", "~> 1.0.0"
  s.add_development_dependency "rails",   ">= 3.2"

  s.files        = `git ls-files`.split("\n")
  s.executable = "luca"
  s.require_paths = ['lib']
end

