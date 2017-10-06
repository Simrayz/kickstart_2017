$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "kickstart_2017/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "kickstart_2017"
  s.version     = Kickstart2017::VERSION
  s.authors     = ["Simrayz"]
  s.email       = ["simenabelsen@hotmail.no"]
  s.homepage    = "www.abelweb.no"
  s.summary     = "Fork of Kickstart 3"
  s.description = "The kickstart_rails gem depends on an old version of autoprefixer. This uses an updated version."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.6"

  s.add_development_dependency "sqlite3"
end
