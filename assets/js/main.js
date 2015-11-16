"use strict";

var YOUTUBE_URL = 'https://www.youtube.com/embed/';
var YOUTUBE_PARAMS = [
  'autoplay=1',
  'rel=0',
  'showinfo=0',
  'iv_load_policy=3'
];

// Track JS errors
window.addEventListener('error', function (evt) {
  if (!('ga' in window)) { return; }
  ga('send', 'exception', {
    'exDescription': 'JS error in ' + evt.filename + ', line #' + evt.lineno + ': ' + evt.message,
    'exFatal': true
  });
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  
  /**
   * Load YouTube videos when clicked.
   */
  var previewLinks = document.querySelectorAll('.video__preview');
  [].slice.call(previewLinks, 0).forEach(function (link) {
    link.addEventListener('click', handleLinkPreviewClick);
  });

  function handleLinkPreviewClick(evt) {
    var link = evt.currentTarget;
    var videoId = link.getAttribute('data-video-id');
    
    if (videoId) {
      evt.preventDefault();
      link.removeEventListener('click', handleLinkPreviewClick);
      
      // Add page language to YouTube params
      var params = YOUTUBE_PARAMS.slice(0);
      params.push('hl=' + document.documentElement.getAttribute('lang') || 'en');

      var iframe = document.createElement('iframe');
      iframe.className = 'video__inner';
      iframe.setAttribute('src', YOUTUBE_URL + videoId + '?' + params.join('&amp;'));
      iframe.setAttribute('width', link.getAttribute('data-width') || 640);
      iframe.setAttribute('height', link.getAttribute('data-height') || 360);
      iframe.setAttribute('frameborder', 0);
      iframe.setAttribute('allowFullScreen', 'allowFullScreen');
      
      link.parentNode.appendChild(iframe);
      link.className += ' video__preview--loading';
      setTimeout(function () {
        link.parentNode.removeChild(link);
      }, 500);
    }
  }
  
});

