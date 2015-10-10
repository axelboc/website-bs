
// Load initial config from package.json
var config = require('./package.json').config;

// Markdown filter for use in Jade templates
config.marked = require('marked');

// Custom Contentful content types 
config.contentTypes = {
  
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
  
};

module.exports = config;
