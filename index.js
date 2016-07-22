var debug = require('debug')('remorseless');

module.exports = function(fn, options) {
  options = options || {};

  if (typeof options == 'number') {
    options = {
      times: options
    }
  }

  options.times = options.times || 3;

  var retryCount = 1;

  return function tryCall(next) {
    fn(function(err, results) {
      if (err) {
        debug('Function executed with error. Retry %s of %s', retryCount, options.times, err);

        if (retryCount < options.times) {
          retryCount++;

          return setTimeout(function() {
            tryCall(next);
          }, 100);
        } else {
          return next(err);
        }
      }

      next(null, results);
    });
  }
};