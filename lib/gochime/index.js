var integration = require('segmentio-integration')
  , gochime = require('gochime');

var GoChime = module.exports = integration('gochime');

GoChime.prototype.validate =
  function (message, settings) {
    return this.ensure(settings.API_KEY, "GoChime API KEY");
  };


GoChime.prototype.enabled =
  function () {
    return true;
  };

GoChime.prototype.identify =
  function (message, settings, cb) {
    return cb(new Error("Not ready yet!"));
    // gochime.identify(settings.API_KEY, message, cb);
  };

GoChime.prototype.track =
  function (message, settings, cb) {
    if (!message || !message.properties || !message.properties.email) { return cb(null); }
    return cb(new Error("Not ready yet!"));
    // gochime.track(settings.API_KEY, message, cb);
  };

GoChime.prototype.alias =
  function (message, settings, cb) {
    return cb(new Error("Not ready yet!"));

    // gochime.alias(settings.API_KEY, message, cb);
  };



