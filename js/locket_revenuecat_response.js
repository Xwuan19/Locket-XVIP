/**
 * @file locket_revenuecat_response.js
 * Unlock Locket Gold Lifetime via RevenueCat
 * By Xwuan
 */

var obj = {};
if (typeof $response !== "undefined" && $response.body) {
  try {
    obj = typeof $response.body === "string" ? JSON.parse($response.body) : $response.body;
  } catch (e) {
    obj = {};
  }
}

obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};

var expireDate = "2099-12-31T23:59:59Z";
var purchaseDate = "2026-01-01T00:00:00Z";

var goldSubscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: expireDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: purchaseDate,
  purchase_date: purchaseDate,
  store: "app_store"
};

var goldEntitlement = {
  grace_period_expires_date: null,
  purchase_date: purchaseDate,
  product_identifier: "com.locket02.premium.yearly",
  expires_date: expireDate
};

obj.subscriber.subscriptions["com.locket02.premium.yearly"] = goldSubscription;
obj.subscriber.subscriptions["locket_1600_1y"] = goldSubscription;
obj.subscriber.entitlements["Gold"] = goldEntitlement;
obj.subscriber.entitlements["gold"] = goldEntitlement;
obj.subscriber.entitlements["pro"] = goldEntitlement;

obj.Attention = "Locket-XVIP Activated by Xwuan!";

$done({ body: JSON.stringify(obj) });
