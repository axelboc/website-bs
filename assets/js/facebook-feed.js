/**
 * Facebook feed.
 * @param {Element} elem
 */
function FacebookFeed(elem) {
  this.elem = elem;
  this.loading = this.elem.querySelector('.FacebookFeed__loading');
  
  // Show loading spinner
  this.loading.removeAttribute('hidden');
  
  // Insert the Facebook SDK on the page
  var fbScript = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0];
  fbScript.src = '//connect.facebook.net/en_US/sdk.js';
  firstScript.parentNode.insertBefore(fbScript, firstScript);
  window.fbAsyncInit = this.initSDK.bind(this);
}

/**
 * Initialise the Facebook SDK then load the feed.
 */
FacebookFeed.prototype.initSDK = function () {
  // Initialise SDK
  FB.init({
      xfbml: false,
      version: 'v2.4'
  });

  // Parse the feed
  FB.XFBML.parse(this.elem, this.feedParsed.bind(this));
};

/**
 * Function called once the feed is parsed by the SDK.
 */
FacebookFeed.prototype.feedParsed = function () {
  // Hide spinner
  this.loading.setAttribute('hidden', 'hidden');
};

module.exports.FacebookFeed = FacebookFeed;
