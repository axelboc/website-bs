// Load environment configuration
require('dotenv').load({ silent: true });

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

// Globs for Roots to ignore
config.ignores = [
  '*.md',
  '.git*',
  '**/_*',
  'views/layout.jade'
];


/**
 * Roots extensions.
 */

// Records
config.records = {
  // Facebook posts
  fbPosts: {
    url: ('https://graph.facebook.com/v2.5/benightedsoul?fields=posts{created_time,type,status_type,message,picture,link,source}&access_token=' + process.env.FACEBOOK_APP_ID + '|' + process.env.FACEBOOK_SECRET),
    hook: function (data) {
      // Keep only the last two posts of a supported type
      return data.posts.data.filter(function (post) {
        return ((post.status_type === 'mobile_status_update'
          || post.status_type === 'shared_story')
          && post.type !== 'video');
      }).slice(0, 2);
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
    albums: {
      id: config.contentTypeIds.release,
      filters: {
        'fields.type': 'Studio album',
        order: '-fields.date'
      }
    },
    homepages: {
      id: config.contentTypeIds.homepage
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

// Browserify
config.browserify = {
  files: 'assets/js/main.js',
  out: 'js/build.js'
};

// CSS pipeline
config.cssPipeline = {
  files: 'assets/css/main.css',
  out: 'css/build.css'
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
