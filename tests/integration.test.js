const fs = require('fs');
const assert = require('assert');

console.log('--- 1. Testing locket_firebase_request.js ---');

const reqCode = fs.readFileSync('js/locket_firebase_request.js', 'utf8');

// Test 1.1: Request with existing device headers and body
{
  let doneResult = null;
  const mockRequest = {
    headers: {
      'Host': 'firebaseremoteconfig.googleapis.com',
      'If-None-Match': 'W/"6630"',
      'X-Firebase-ETag': 'W/"6630"',
      'If-Modified-Since': 'Mon, 02 Nov 2026 00:00:00 GMT',
      'User-Agent': 'Locket/2716 CFNetwork/1498 Darwin/23.6.0'
    },
    body: JSON.stringify({
      app_instance_id: 'REAL_FID_123',
      app_instance_id_token: 'LIVE_JWT_TOKEN_ABC',
      app_id: '1:641029076083:ios:cc8eb46290d69b234fa606',
      analytics_user_properties: {
        custom_prop: 'abc'
      }
    })
  };

  const sandbox = {
    $request: mockRequest,
    $done: (res) => { doneResult = res; }
  };

  const run = new Function('$request', '$done', reqCode);
  run(sandbox.$request, sandbox.$done);

  assert(doneResult, 'Request $done was not called');
  assert(!doneResult.headers['If-None-Match'], 'If-None-Match was not stripped');
  assert(!doneResult.headers['X-Firebase-ETag'], 'X-Firebase-ETag was not stripped');
  assert(!doneResult.headers['If-Modified-Since'], 'If-Modified-Since was not stripped');
  assert.strictEqual(doneResult.headers['User-Agent'], mockRequest.headers['User-Agent']);

  const parsedBody = JSON.parse(doneResult.body);
  assert.strictEqual(parsedBody.app_instance_id, 'REAL_FID_123');
  assert.strictEqual(parsedBody.app_instance_id_token, 'LIVE_JWT_TOKEN_ABC');
  assert.strictEqual(parsedBody.analytics_user_properties.celebrity, 'true');
  assert.strictEqual(parsedBody.analytics_user_properties.gold_member, 'true');
  assert.strictEqual(parsedBody.analytics_user_properties.vip, 'true');
  console.log('✓ Request modification with real credentials: PASS');
}

// Test 1.2: Request with empty body (fallback test)
{
  let doneResult = null;
  const mockRequest = {
    headers: {},
    body: ''
  };

  const run = new Function('$request', '$done', reqCode);
  run(mockRequest, (res) => { doneResult = res; });

  assert(doneResult, 'Fallback $done was not called');
  const parsedBody = JSON.parse(doneResult.body);
  assert.strictEqual(parsedBody.app_id, '1:641029076083:ios:cc8eb46290d69b234fa606');
  assert.strictEqual(parsedBody.analytics_user_properties.gold, 'true');
  console.log('✓ Request fallback for empty body: PASS');
}

console.log('--- 2. Testing locket_firebase_response.js ---');

const resCode = fs.readFileSync('js/locket_firebase_response.js', 'utf8');

// Test 2.1: Response merging and VIP unlocking
{
  let doneResult = null;
  const mockResponse = {
    body: JSON.stringify({
      entries: {
        server_new_experiment_flag: 'true',
        max_friends_count: '5'
      },
      appName: 'com.locket.Locket',
      state: 'UPDATE',
      templateVersion: '7000'
    })
  };

  const run = new Function('$response', '$done', resCode);
  run(mockResponse, (res) => { doneResult = res; });

  assert(doneResult, 'Response $done was not called');
  assert(typeof doneResult.body === 'string', 'Response body must be a string');

  const finalBody = JSON.parse(doneResult.body);
  assert.strictEqual(finalBody.state, 'UPDATE');
  assert.strictEqual(finalBody.templateVersion, '7000');
  assert.strictEqual(finalBody.entries.server_new_experiment_flag, 'true', 'Preserved server new flag');
  
  // VIP Checks:
  assert.strictEqual(finalBody.entries.purchases_entitlement, 'Gold');
  assert.strictEqual(finalBody.entries.android_gold_subscription_override, 'true');
  assert.strictEqual(finalBody.entries.max_friends_count, '999999');
  assert.strictEqual(finalBody.entries.upload_main_image_quality, '1.0');
  assert.strictEqual(finalBody.entries.upload_main_image_size, '4096');
  assert.strictEqual(finalBody.entries.moment_views_enabled, 'true');
  assert.strictEqual(finalBody.entries.notify_moment_views, 'true');
  assert.strictEqual(finalBody.entries.video_max_duration, '30');

  const gates = JSON.parse(finalBody.entries.feature_gates);
  assert.strictEqual(gates.longer_video, 'enabled');
  assert.strictEqual(gates.unlimited_friends, 'enabled');
  assert.strictEqual(gates.camera_roll, 'enabled');
  assert.strictEqual(gates.remove_ads, 'enabled');
  assert.strictEqual(gates.profile_badge, 'enabled');

  const streak = JSON.parse(finalBody.entries.streak_config);
  assert.strictEqual(streak.free_recovery, true);

  console.log('✓ Response Super VIP Pro Max merging & feature gates: PASS');
}

// Test 2.2: Ensure all JSON strings inside entries parse validly
{
  let doneResult = null;
  const run = new Function('$response', '$done', resCode);
  run(undefined, (res) => { doneResult = res; });

  const finalBody = JSON.parse(doneResult.body);
  for (const [k, v] of Object.entries(finalBody.entries)) {
    if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
      try {
        JSON.parse(v);
      } catch (e) {
        assert.fail(`Invalid JSON in entry key ${k}: ${e.message}`);
      }
    }
  }
  console.log('✓ All JSON entry fields parse without error: PASS');
}

console.log('\nAll integration tests PASSED successfully!');
