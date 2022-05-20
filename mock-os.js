// mock-os
// Testing module for the os built-in module in Node.js

// Copyright (c) 2015-2022 lfortin
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var os       = require('os'),
    _os      = {},
    registry = [];

for(var k in os) {
  _os[k] = os[k];
  registry.push(k);
}

function mock(config) {
  registry.forEach(function(k) {
    if(config[k]) {
      os[k] = typeof os[k] === 'function' ? function() {
        return config[k];
      } : config[k];
    }
  });
  
  return os;
}

mock.restore = function() {
  for(var k in os) {
    os[k] = _os[k];
  }
  
  return os;
};

module.exports = mock;

