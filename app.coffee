require('dotenv').load()

marked = require 'marked'
roots_config = require 'roots-config'
roots_yaml = require 'roots-yaml'
contentful = require 'roots-contentful'
browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'

contentTypeIds = 
  homepage: '2R0y7K4EZGuiAKE2SQi8q4'
  section: '4E63J3zDjOUE8k0ek0OM2K'
  member: '3tZoAWiIJ2aMYikSUkEyGc'
  release: '4dQwa7ovxCwuAeAi0KE80G'

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
      contentTypeIds: contentTypeIds
    
    roots_yaml
      source: 'data'
    
    contentful
      access_token: process.env.CONTENTFUL_KEY
      space_id: process.env.CONTENTFUL_SPACE
      content_types:
        homepages:
          id: contentTypeIds.homepage
          filter: 'fields.isCurrent': true
        sections: id: contentTypeIds.section
        members:
          id: contentTypeIds.member
          filters: order: 'fields.order'
        albums:
          id: contentTypeIds.release
          filters:
            'fields.type': 'Studio album'
            order: 'fields.date'
        other_releases:
          id: contentTypeIds.release
          filters:
            'fields.type[ne]': 'Studio album'
            order: 'fields.date'
    
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
  