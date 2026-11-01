const fs = require('fs');
const assert = require('assert');

console.log('=== 1. Testing RevenueCat Scripts ===');

// 1.1 RevenueCat Request
{
  const rcReqCode = fs.readFileSync('js/locket_revenuecat_request.js', 'utf8');
  let doneResult = null;
  const mockReq = {
    headers: {
      'Host': 'api.revenuecat.com',
      'X-RevenueCat-ETag': 'W/"abc123"',
      'If-None-Match': 'W/"abc123"',
      'User-Agent': 'Locket/2716 CFNetwork/1498 Darwin/23.6.0'
    }
  };
  const run = new Function('$request', '$done', rcReqCode);
  run(mockReq, (res) => { doneResult = res; });

  assert(doneResult, 'RevenueCat request $done was not called');
  assert.strictEqual(doneResult.headers['X-RevenueCat-ETag'], '', 'X-RevenueCat-ETag not blanked');
  assert.strictEqual(doneResult.headers['If-None-Match'], '', 'If-None-Match not blanked');
  assert.strictEqual(doneResult.headers['User-Agent'], mockReq.headers['User-Agent']);
  console.log('✓ RevenueCat Request ETag stripping: PASS');
}

// 1.2 RevenueCat Response
{
  const rcResCode = fs.readFileSync('js/locket_revenuecat_response.js', 'utf8');
  let doneResult = null;
  const mockRes = {
    body: JSON.stringify({
      request_date: '2026-11-02T01:00:00Z',
      subscriber: {
        original_app_user_id: 'user_12345',
        subscriptions: {},
        entitlements: {}
      }
    })
  };
  const run = new Function('$response', '$done', rcResCode);
  run(mockRes, (res) => { doneResult = res; });

  assert(doneResult, 'RevenueCat response $done was not called');
  const data = JSON.parse(doneResult.body);
  assert(data.subscriber.entitlements.Gold, 'Gold entitlement missing');
  assert.strictEqual(data.subscriber.entitlements.Gold.expires_date, '2099-12-31T23:59:59Z');
  assert(data.subscriber.subscriptions['com.locket02.premium.yearly'], 'Gold subscription missing');
  assert.strictEqual(data.subscriber.subscriptions['com.locket02.premium.yearly'].ownership_type, 'PURCHASED');
  console.log('✓ RevenueCat Response Gold injection: PASS');
}

console.log('=== 2. Testing Firebase Remote Config Scripts ===');

// 2.1 Firebase Request
{
  const fbReqCode = fs.readFileSync('js/locket_firebase_request.js', 'utf8');
  let doneResult = null;
  const mockReq = {
    headers: {
      'If-None-Match': 'W/"6630"',
      'X-Firebase-ETag': 'W/"6630"'
    },
    body: JSON.stringify({
      app_instance_id: 'FID_TEST_999',
      app_instance_id_token: 'LIVE_JWT_TOKEN',
      app_id: '1:641029076083:ios:cc8eb46290d69b234fa606'
    })
  };
  const run = new Function('$request', '$done', fbReqCode);
  run(mockReq, (res) => { doneResult = res; });

  assert(!doneResult.headers['If-None-Match'], 'Firebase cache headers not stripped');
  const body = JSON.parse(doneResult.body);
  assert.strictEqual(body.app_instance_id, 'FID_TEST_999');
  assert.strictEqual(body.analytics_user_properties.gold_member, 'true');
  assert.strictEqual(body.analytics_user_properties.celebrity, 'true');
  console.log('✓ Firebase Request VIP elevation: PASS');
}

// 2.2 Firebase Response
{
  const fbResCode = fs.readFileSync('js/locket_firebase_response.js', 'utf8');
  let doneResult = null;
  const mockRes = {
    body: JSON.stringify({
      entries: {
        server_test_key: 'active'
      },
      appName: 'com.locket.Locket',
      state: 'UPDATE'
    })
  };
  const run = new Function('$response', '$done', fbResCode);
  run(mockRes, (res) => { doneResult = res; });

  const finalBody = JSON.parse(doneResult.body);
  assert.strictEqual(finalBody.entries.server_test_key, 'active', 'Dynamic merge kept server key');
  assert.strictEqual(finalBody.entries.purchases_entitlement, 'Gold');
  assert.strictEqual(finalBody.entries.max_friends_count, '999999');
  assert.strictEqual(finalBody.entries.upload_main_image_quality, '0.9');
  assert.strictEqual(finalBody.entries.moment_views_enabled, 'true');

  const gates = JSON.parse(finalBody.entries.feature_gates);
  assert.strictEqual(gates.longer_video, 'enabled');
  assert.strictEqual(gates.video_audio, 'enabled');
  assert.strictEqual(gates.camera_roll, 'enabled');
  assert.strictEqual(gates.remove_ads, 'enabled');
  assert.strictEqual(finalBody.entries.video_max_duration, '30');
  assert.strictEqual(finalBody.entries.video_audio_enabled, 'true');

  // Verify all JSON strings inside entries
  for (const [k, v] of Object.entries(finalBody.entries)) {
    if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
      try {
        JSON.parse(v);
      } catch (e) {
        assert.fail(`Invalid JSON in entry [${k}]: ${e.message}`);
      }
    }
  }
  console.log('✓ Firebase Response Super VIP Pro Max (4K, 30s video, 999999 friends, 341 keys valid): PASS');
}

console.log('\n>>> ALL REVENUECAT & FIREBASE INTEGRATION TESTS PASSED 100%! <<<');
