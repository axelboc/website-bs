require('dotenv').load()

marked = require 'marked'
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
    roots_config
      marked: marked
    
    roots_yaml
      source: 'data'
    
    contentful
      access_token: process.env.CONTENTFUL_KEY
      space_id: process.env.CONTENTFUL_SPACE
      content_types:
        sections:
          id: '4E63J3zDjOUE8k0ek0OM2K'
        members:
          id: '3tZoAWiIJ2aMYikSUkEyGc'
          filters:
            order: 'fields.order'
        albums:
          id: '4dQwa7ovxCwuAeAi0KE80G'
          filters:
            'fields.type': 'Studio album'
            order: 'fields.date'
        other_releases:
          id: '4dQwa7ovxCwuAeAi0KE80G'
          filters:
            'fields.type[ne]': 'Studio album'
            order: 'fields.date'
    
    browserify
      files: 'assets/js/main.js'
      out: 'js/build.js'
      minify: true
    
    css_pipeline
      files: 'assets/css/main.css'
      out: 'css/build.css'
      minify: true
      hash: true
  ]

  postcss:
    use: [
      require('postcss-import')(path: 'assets/css'),
      require('postcss-nested'),
      require('postcss-custom-properties'),
      require('cssnano')(autoprefixer: ['> 2% in AU'])
    ]
