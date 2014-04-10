
var facade = require('segmentio-facade');
var helpers = require('./helpers');
var integrations = require('..');
var should = require('should');
var settings = require('./auth.json').gochime;
var gc = new integrations.gochime();


describe('gochime', function () {
  describe('.enabled()', function () {
    it('should only be enabled for any messages', function () {
      gc.enabled(new facade.Alias({ channel : 'server' })).should.be.ok;
      gc.enabled(new facade.Alias({ channel : 'client' })).should.be.ok;
      gc.enabled(new facade.Alias({})).should.be.ok;
    });
  });

  describe('.validate()', function () {
    it('should require a token', function () {
      gc.validate({}, {}).should.be.an.instanceOf(Error);
      gc.validate({}, { token : ''}).should.be.an.instanceOf(Error);
    });

    it('should validate with the required settings', function () {
      should.not.exist(gc.validate({}, { API_KEY : 'xxx' }));
    });
  });

  describe('.track()', function () {
    it('should get a good response from the API with an email', function (done) {
      var track = helpers.track();
      track.properties.email = "tim@gochime.com";
      gc.track(track, settings, done);
    });

    it('should get a good response, but not hit the API without an email', function (done) {
      var track = helpers.track();
      gc.track(track, settings, done);
    });

    it('will error on an invalid set of keys', function (done) {
      var track = helpers.track();
      gc.track(track, { token : 'x' }, function (err) {
        should.exist(err);
        err.status.should.eql(401);
        done();
      });
    });
  });

  describe('.identify()', function () {
    it('should get a good response from the API', function (done) {
      var identify = helpers.identify();
      gc.identify(identify, settings, done);
    });

    it('will error on an invalid set of keys', function (done) {
      var identify = helpers.identify();
      gc.identify(identify, { token : 'x' }, function (err) {
        should.exist(err);
        err.status.should.eql(401);
        done();
      });
    });
  });

  describe('.alias()', function () {
    it('should get a good response from the api', function (done) {
      var alias = helpers.alias();
      gc.alias(alias, settings, done);
    });

    it('will error on an invalid set of keys', function (done) {
      var alias = helpers.alias();
      gc.alias(alias, { token : 'x' }, function (err) {
        should.exist(err);
        err.status.should.eql(401);
        done();
      });
    });
  });
});
