require('dotenv').load()
config = require './config'

roots_config = require 'roots-config'
roots_yaml = require 'roots-yaml'
contentful = require 'roots-contentful'
browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'

module.exports =
  ignores: [
    '*.md'
    '.git*'
    '**/_*'
    'views/layout.jade'
  ]

  extensions: [
    roots_config config
    
    roots_yaml
      source: 'data'
    
    contentful
      access_token: process.env.CONTENTFUL_KEY
      space_id: process.env.CONTENTFUL_SPACE
      content_types: config.contentTypes
    
    browserify
      files: 'assets/js/main.js'
      out: 'js/build.js'
      sourceMap: true
    
    css_pipeline
      files: 'assets/css/main.css'
      out: 'css/build.css'
  ]

  server:
    clean_urls: true

  postcss:
    use: [
      require('postcss-import')(path: 'assets/css')
      require('postcss-nested')
      require('postcss-custom-properties'),
      require('cssnano')(autoprefixer: ['> 2% in AU'])
    ]
    map: true

  jade:
    pretty: true
  