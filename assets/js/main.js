
// Dependencies
var FacebookFeed = require('./facebook-feed').FacebookFeed;


document.addEventListener('DOMContentLoaded', function () {
  var fbFeedElem = document.querySelector('.FacebookFeed');
  if (fbFeedElem) {
    // Initialise the Facebook feed
    new FacebookFeed(fbFeedElem);
  }
  
});


// Track JS errors
window.addEventListener('error', function (evt) {
  /*ga('send', 'exception', {
    'exDescription': 'JS error in ' + evt.filename + ', line #' + evt.lineno + ': ' + evt.message,
    'exFatal': true
  });*/
});
