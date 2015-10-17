// Load environment configuration
require('dotenv').load({ silent: true });

// Load initial config from package.json
var config = require('./package.json').config;

// Markdown filter for use in Jade templates
config.marked = require('marked');

// Globs for Roots to ignore
config.ignores = [
  '*.md',
  '.git*',
  '**/_*',
  'views/layout.jade'
];

// YAML (Roots extension)
config.yaml = {
  source: 'data'
};

// Contentfull (Roots extension)
config.contentful = {
  access_token: process.env.CONTENTFUL_KEY,
  space_id: 'v8by0dt6oh1j',
  content_types: {
    albums: {
      id: config.contentTypeIds.release,
      filters: {
        'fields.type': 'Studio album',
        order: '-fields.date'
      }
    },
    homepages: {
      id: config.contentTypeIds.homepage,
      filter: {
        'fields.isCurrent': true
      }
    },
    members: {
      id: config.contentTypeIds.member,
      filters: {
        order: 'fields.order'
      }
    },
    otherReleases: {
      id: config.contentTypeIds.release,
      filters: {
        'fields.type[ne]': 'Studio album',
        order: '-fields.date'
      }
    },
    photoGalleries: {
      id: config.contentTypeIds.photoGallery,
      filters: {
        order: 'fields.order'
      }
    },
    sections: {
      id: config.contentTypeIds.section
    },
    videoPlaylists: {
      id: config.contentTypeIds.videoPlaylist,
      filters: {
        order: 'fields.order'
      }
    }
  }
};

// Browserify (Roots extension)
config.browserify = {
  files: 'assets/js/main.js',
  out: 'js/build.js'
};

// CSS pipeline (Roots extension)
config.cssPipeline = {
  files: 'assets/css/main.css',
  out: 'css/build.css'
};

// PostCSS (Roots plugin)
config.postcss = {
  use: [
    require('postcss-import')({ path: 'assets/css' }),
    require('postcss-nested'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('cssnano')({ autoprefixer: ['> 2% in AU'] })
  ]
};

module.exports = config;
