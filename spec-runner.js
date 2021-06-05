

var assert = require('assert'),
    os = require('os'),
    mock = require('./mock-os'),
    EOL = os.EOL;

function getEOL(n) {
  var lines = [];
  for(var i = 0; i < n; i++) {
    lines.push(EOL);
  }
  return lines.join('');
}

process.stdout.write("running tests..." + getEOL(2));


(function() {

  // API signature
  assert.ok(mock.restore, ".restore() method expected");

  //assert.ok(monitor.whatever, "whatever expected");

  process.stdout.write("API signature OK" + getEOL(1));

  // fake system metrics
  mock({
    freemem: 100,
    loadavg: [1, 2, 3],
    uptime: 10000,
    release: 'fake_release'
  });
  
  assert.strictEqual(os.freemem(), 100, ".freemem() expected to return 100");
  assert.strictEqual(os.loadavg()[0], 1, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.loadavg()[1], 2, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.loadavg()[2], 3, ".loadavg() expected to return [1, 2, 3]");
  assert.strictEqual(os.uptime(), 10000, ".loadavg() expected to be === 10000");
  assert.strictEqual(os.release(), 'fake_release', ".release() expected to be === 'fake_release'");

  process.stdout.write("mock() OK" + getEOL(1));
  
  mock.restore();
  
  assert.notStrictEqual(os.freemem(), 100, ".freemem() expected to not return 100");
  assert.notStrictEqual(os.loadavg()[0], 1, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.loadavg()[1], 2, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.loadavg()[2], 3, ".loadavg() expected to not return [1, 2, 3]");
  assert.notStrictEqual(os.uptime(), 10000, ".loadavg() expected to be !== 10000");
  assert.notStrictEqual(os.release(), 'fake_release', ".release() expected to be !== 'fake_release'");

  process.stdout.write("mock.restore() OK" + getEOL(1));
})();

