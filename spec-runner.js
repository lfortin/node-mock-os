

var assert = require('assert'),
    os = require('os'),
    mock = require('./mock-os');

function getEOL(n) {
  var lines = [];
  for(var i = 0; i < n; i++) {
    lines.push(os.EOL);
  }
  return lines.join('');
}

process.stdout.write("running tests..." + getEOL(2));


assert.doesNotThrow(function() {

  // API signature
  assert.ok(mock.restore, ".restore() method expected");

  //assert.ok(monitor.whatever, "whatever expected");

  process.stdout.write("API signature OK" + getEOL(1));

  // TODO: more tests

});

