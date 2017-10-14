// Load environment configuration
require('dotenv').config();
var FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_APP_ID + '|' + process.env.FACEBOOK_SECRET;

// Load initial config from package.json
var config = require('./package.json').config;


/**
 * Template helpers.
 */

// Markdown filter
config.marked = require('marked');

// Moment.js for manipulating dates
config.moment = require('moment');

// Configure French locale
config.moment.locale('fr', {
  months: [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ],
  monthsShort: [
    'janv', 'févr', 'mars', 'avr', 'mai', 'juin',
    'juil', 'août', 'sept', 'oct', 'nov', 'déc'
  ],
  weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
});


/**
 * Roots configuration.
 */

// Globs for Roots to ignore when compiling
config.ignores = [
  '.*',
  '.*/**',
  '*.md',
  'config.js',
  'assets/css/_*',
  'views/**/_*',
  'views/layout.pug'
];

// Globs for Roots to ignore when watching
config.watcherIgnores = [];

// Transparent root folders (e.g. assets/images/** -> output/images/**)
config.dumpDirs = ['assets', 'data', 'views'];


/**
 * Roots extensions.
 */

// Records
config.records = {
  // Facebook posts
  fbPosts: {
    url: (config.facebook.apiUrl + config.facebook.query + '&access_token=' + FACEBOOK_ACCESS_TOKEN),
    hook: function (data) {
      console.log(data.posts.data);
      return data.posts.data.filter(function (post) {
        return !!post.message;
      }).slice(0, config.facebook.postsCount);
    }
  }
};

// YAML
config.yaml = {
  source: 'data'
};

// Contentfull
config.contentful = {
  access_token: process.env.CONTENTFUL_KEY,
  space_id: 'v8by0dt6oh1j',
  content_types: {
    homepages: {
      id: config.contentTypeIds.homepage
    },
    members: {
      id: config.contentTypeIds.member,
      filters: {
        order: 'fields.order'
      }
    },
    photoGalleries: {
      id: config.contentTypeIds.photoGallery,
      filters: {
        order: 'fields.order'
      }
    },
    products: {
      id: config.contentTypeIds.product
    },
    releases: {
      id: config.contentTypeIds.release,
      filters: {
        order: '-fields.releaseDate'
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

// Browserify
config.browserify = {
  files: 'assets/js/index.js',
  out: 'js/index.js'
};


/**
 * Roots compilers.
 */

// PostCSS
config.postcss = {
  use: [
    require('postcss-import')({ path: 'assets/css' }),
    require('postcss-nested'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('cssnano')({ autoprefixer: ['> 2% in AU'] })
  ]
};


// Export configuration
module.exports = config;
