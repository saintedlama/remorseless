var expect = require('chai').expect;
var remorseless = require('../');

describe('remorseless', function() {
  var called = 0;

  beforeEach(function() {
    called = 0;
  });

  function fail(next) {
    called++;
    next(new Error('Failing'));
  }

  it('should retry a function 3 times', function(done) {
    var retryableFail = remorseless(fail);

    retryableFail(function(err) {
      expect(err).to.exist;
      expect(err.message).to.equal('Failing');

      expect(called).to.equal(3);
      done();
    });
  });

  it('should retry a function N times passed by options object', function(done) {
    var retryableFail = remorseless(fail, { times: 4 });

    retryableFail(function(err) {
      expect(err).to.exist;
      expect(err.message).to.equal('Failing');

      expect(called).to.equal(4);
      done();
    });
  });

  it('should retry a function N times passed as numeric option', function(done) {
    var retryableFail = remorseless(fail, 4);

    retryableFail(function(err) {
      expect(err).to.exist;
      expect(err.message).to.equal('Failing');

      expect(called).to.equal(4);
      done();
    });
  });
});
