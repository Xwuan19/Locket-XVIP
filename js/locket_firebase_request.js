/**
 * @file locket_firebase_request.js
 * Modify Firebase Remote Config Request for Locket (Super VIP Pro Max)
 * By Xwuan
 */

var modifiedHeaders = $request.headers || {};

// Xóa header If-None-Match, If-Modified-Since hoặc X-Firebase-ETag để ngăn chặn server trả về 304 Not Modified
for (var key in modifiedHeaders) {
  var lower = key.toLowerCase();
  if (lower === "if-none-match" || lower === "x-firebase-etag" || lower === "if-modified-since") {
    delete modifiedHeaders[key];
  }
}

// Xử lý thông minh: bảo toàn device ID, token và account thật của người dùng
var reqBody = {};
if ($request.body) {
  try {
    reqBody = typeof $request.body === "string" ? JSON.parse($request.body) : $request.body;
  } catch (e) {
    reqBody = {};
  }
}

// Nếu thiết bị không gửi kèm body, sử dụng fallback cấu hình mặc định an toàn
if (!reqBody.app_id) {
  reqBody.app_id = "1:641029076083:ios:cc8eb46290d69b234fa606";
  reqBody.package_name = reqBody.package_name || "com.locket.Locket";
  reqBody.platform_version = reqBody.platform_version || "18.0";
  reqBody.country_code = reqBody.country_code || "vn";
  reqBody.language_code = reqBody.language_code || "vi_VN";
  reqBody.time_zone = reqBody.time_zone || "Asia/Ho_Chi_Minh";
}

// Bơm các thông số định danh VIP, TestFlight, Celebrity & Gold Member
reqBody.analytics_user_properties = Object.assign({}, reqBody.analytics_user_properties || {}, {
  notification_status: "0",
  tesflight: "true",
  testflight: "true",
  celebrity: "true",
  gold_member: "true",
  is_gold: "true",
  subscriber: "true",
  is_subscriber: "true",
  gold: "true",
  vip: "true",
  subscription_status: "active",
});

$done({
  headers: modifiedHeaders,
  body: JSON.stringify(reqBody),
});
