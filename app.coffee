config = require './config'

# Extensions
rootsConfig = require 'roots-config'
records = require 'roots-records'
yaml = require 'roots-yaml'
contentful = require 'roots-contentful'
browserify = require 'roots-browserify'

# Custom configuration in developement
config.browserify.sourceMap = true;
config.postcss.map = true;

# Configuration
module.exports =
  ignores: config.ignores
  watcher_ignores: config.watcherIgnores
  dump_dirs: config.dumpDirs
  extensions: [
    rootsConfig config
    records config.records
    yaml config.yaml
    contentful config.contentful
    browserify config.browserify
  ]
  postcss: config.postcss
  jade:
    pretty: true
  server:
    clean_urls: true
  