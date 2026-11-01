/**
 * @file locket_revenuecat_request.js
 * Remove ETag header from RevenueCat requests to prevent 304 Not Modified
 * By Xwuan
 */

function setHeaderValue(headers, key, val) {
  var lower = key.toLowerCase();
  for (var k in headers) {
    if (k.toLowerCase() === lower) {
      headers[k] = val;
      return;
    }
  }
  headers[key] = val;
}

var modifiedHeaders = $request.headers || {};
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
setHeaderValue(modifiedHeaders, "If-None-Match", "");
setHeaderValue(modifiedHeaders, "If-Modified-Since", "");

$done({ headers: modifiedHeaders });
