
var package = require('./package.json');
var marked = require('marked');

var config = package.config;

// Markdown filter for use in Jade templates
config.marked = marked;

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
  
  other_releases: {
    id: config.contentTypeIds.release,
    filters: {
      'fields.type[ne]': 'Studio album',
      order: 'fields.date'
    }
  }
  
};

module.exports = config;
