/* */ 
"use strict";
var dom_adapter_1 = require('../dom/dom_adapter');
var lang_1 = require('../facade/lang');
var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm));base64,[a-z0-9+\/]+=*$/i;
function sanitizeUrl(url) {
  url = String(url);
  if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN))
    return url;
  if (lang_1.assertionsEnabled())
    dom_adapter_1.getDOM().log('WARNING: sanitizing unsafe URL value ' + url);
  return 'unsafe:' + url;
}
exports.sanitizeUrl = sanitizeUrl;
