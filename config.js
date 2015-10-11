
// Load initial config from package.json
var config = require('./package.json').config;

// Markdown filter for use in Jade templates
config.marked = require('marked');

// Slugify a string
config.slugify = function (str) {
  return str.replace(/\s+/g, '-').toLowerCase();
};

config.getLocalisedPaths = function (path) {
  return config.languages.map(function (lang) {
    return lang + '/' + path;
  });
};

// Custom Contentful content types 
config.contentTypes = {
  
  albums: {
    id: config.contentTypeIds.release,
    filters: {
      'fields.type': 'Studio album',
      order: '-fields.date'
    },
    template: 'views/entries/_release.jade',
    path: function (entry) {
      return config.getLocalisedPaths('discography/' + config.slugify(entry.title));
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
    },
    template: 'views/entries/_release.jade',
    path: function (entry) {
      return config.getLocalisedPaths('discography/' + config.slugify(entry.title));
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
  
};

module.exports = config;
