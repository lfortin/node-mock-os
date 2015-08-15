

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


assert.doesNotThrow(function() {

  // API signature
  assert.ok(mock.restore, ".restore() method expected");

  //assert.ok(monitor.whatever, "whatever expected");

  process.stdout.write("API signature OK" + getEOL(1));

  // fake system metrics
  mock({
    freemem: 100,
    loadavg: [1, 2, 3],
    EOL: 'TEST'
  });
  
  assert.deepEqual(os.freemem(), 100, ".freemem() expected to return 100");
  assert.deepEqual(os.loadavg()[0], 1, ".loadavg() expected to return [1, 2, 3]");
  assert.deepEqual(os.loadavg()[1], 2, ".loadavg() expected to return [1, 2, 3]");
  assert.deepEqual(os.loadavg()[2], 3, ".loadavg() expected to return [1, 2, 3]");
  assert.deepEqual(os.EOL, 'TEST', "EOL expected to be === 'TEST'");

  process.stdout.write("mock() OK" + getEOL(1));
  
  mock.restore();
  
  assert.notDeepEqual(os.freemem(), 100, ".freemem() expected to not return 100");
  assert.notDeepEqual(os.loadavg()[0], 1, ".loadavg() expected to not return [1, 2, 3]");
  assert.notDeepEqual(os.loadavg()[1], 2, ".loadavg() expected to not return [1, 2, 3]");
  assert.notDeepEqual(os.loadavg()[2], 3, ".loadavg() expected to not return [1, 2, 3]");
  assert.notDeepEqual(os.EOL, 'TEST', "EOL expected to be !== 'TEST'");
  
  process.stdout.write("mock.restore() OK" + getEOL(1));
});

