
// Load initial config from package.json
var config = require('./package.json').config;

// Markdown filter for use in Jade templates
config.marked = require('marked');

// Cloudinary API for assets
config.cloudinary = require('cloudinary');

// Custom Contentful content types 
config.contentTypes = {
  
  homepages: {
    id: config.contentTypeIds.homepage,
    filter: {
      'fields.isCurrent': true
    }
  },
  
  sections: {
    id: config.contentTypeIds.section
  },
  
  members: {
    id: config.contentTypeIds.member,
    filters: {
      order: 'fields.order'
    }
  },
  
  albums: {
    id: config.contentTypeIds.release,
    filters: {
      'fields.type': 'Studio album',
      order: 'fields.date'
    }
  },
  
  otherReleases: {
    id: config.contentTypeIds.release,
    filters: {
      'fields.type[ne]': 'Studio album',
      order: 'fields.date'
    }
  },
  
  videoPlaylists: {
    id: config.contentTypeIds.videoPlaylist,
    filters: {
      order: 'fields.order'
    }
  }
  
};

module.exports = config;
