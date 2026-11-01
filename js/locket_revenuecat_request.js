/**
 * @file locket_revenuecat_request.js
 * Remove ETag header from RevenueCat requests to prevent 304 Not Modified
 * By Xwuan
 */

var modifiedHeaders = $request.headers || {};

for (var key in modifiedHeaders) {
  var lower = key.toLowerCase();
  if (lower === "x-revenuecat-etag" || lower === "if-none-match" || lower === "if-modified-since") {
    delete modifiedHeaders[key];
  }
}

$done({ headers: modifiedHeaders });
