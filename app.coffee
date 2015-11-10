config = require './config'

# Extensions
rootsConfig = require 'roots-config'
records = require 'roots-records'
yaml = require 'roots-yaml'
contentful = require 'roots-contentful'
browserify = require 'roots-browserify'
cssPipeline = require 'css-pipeline'

# Custom configuration in developement
config.browserify.sourceMap = true;
config.postcss.map = true;

# Configuration
module.exports =
  ignores: config.ignores
  extensions: [
    rootsConfig config
    records config.records
    yaml config.yaml
    contentful config.contentful
    browserify config.browserify
    cssPipeline config.cssPipeline
  ]
  postcss: config.postcss
  server:
    clean_urls: true
  jade:
    pretty: true
  