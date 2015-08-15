mock-os
==============

`mock-os` is a testing module for the [os](http://nodejs.org/api/os.html) core module in Node.js.


## Installation

    npm install --save-dev mock-os


## Example

The code below makes it so the `os` module can output fake system metrics.

```js
var mock = require('mock-os');

mock({
  'freemem': 100000,
  'loadavg': [2, 2, 2]
});
```

When you are ready to restore the `os` module to its original behavior, call [`mock.restore()`](#mockrestore).

```js
// after a test runs
mock.restore();
```


## API

(stay tuned for more docs...)

