

var assert = require('assert'),
    os = require('os'),
    mock = require('./mock-os');

console.log("running tests...");
console.log("");


(function() {

  // API signature
  assert.ok(mock.restore, ".restore() method expected");

  //assert.ok(monitor.whatever, "whatever expected");

  console.log("API signature OK");

  // fake system metrics
  mock({
    freemem: 100,
    loadavg: [1, 2, 3],
    uptime: 0, // falsy value
    release: 'fake_release'
  });
  
  assert.strictEqual(os.freemem(), 100, ".freemem() expected to return 100");
  assert.strictEqual(os.loadavg()[0], 1, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.loadavg()[1], 2, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.loadavg()[2], 3, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.uptime(), 0, ".uptime() expected to be === 0");
  assert.strictEqual(os.release(), 'fake_release', ".release() expected to be === 'fake_release'");

  console.log("mock() OK");
  
  mock.restore();
  
  assert.notStrictEqual(os.freemem(), 100, ".freemem() expected to not return 100");
  assert.notStrictEqual(os.loadavg()[0], 1, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.loadavg()[1], 2, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.loadavg()[2], 3, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.uptime(), 0, ".uptime() expected to be !== 0");
  assert.notStrictEqual(os.release(), 'fake_release', ".release() expected to be !== 'fake_release'");

  console.log("mock.restore() OK");
})();
