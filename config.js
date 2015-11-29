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
      // Keep only the last posts of a supported type
      return data.posts.data.filter(function (post) {
        //console.log(post);
        var isStatusTypeSupported = config.facebook.supportedStatusTypes.indexOf(post.status_type) > -1;
        var isPostTypeSupported = config.facebook.unsupportedPostTypes.indexOf(post.type) === -1;
        return (isStatusTypeSupported && isPostTypeSupported);
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
