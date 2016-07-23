# remorseless

Retry failed functions

## Usage

    npm install remoreseless --save


```js
var remorseless = require('remorseless');

function fn(next) {
  // Do something
  return next(err);
}

// Wrap fn to be retryable
var retryable = remorseless(fn);

retryable(function(err) {
  // Will be called with original error object if fn fails more than 3 times
});

// Set retry count to 5
var retryable5Times = remorseless(fn, 5);

// Use options object
var retryable5Times = remorseless(fn, { times: 5 });
```
