roots_yaml = require('roots-yaml')
browserify = require 'roots-browserify'
css_pipeline = require 'css-pipeline'

module.exports =
  ignores: [
    '*.md'
    '.gitignore'
    '**/_*'
    'views/layout.jade'
  ]

  extensions: [
    roots_yaml
      source: 'data'
    
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
  