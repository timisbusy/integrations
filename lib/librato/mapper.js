
/**
 * Module dependencies.
 */

var time = require('unix-time');

/**
 * Map track.
 *
 * @param {Track} track
 * @return {Object}
 * @api private
 */

exports.track = function(track){
  var event = clean(track.event());
  return {
    name: event,
    value: track.value() || 1,
    measure_time: time(track.timestamp()),
    source: track.options(this.name).source || event
  };
};

/**
 * Clean event for klaviyo.
 *
 * @param {String} event
 * @return {String}
 * @api private
 */

function clean(event){
  return event
    .replace(/[^a-z0-9._-]/gi, '-')
    .substring(0, 255);
}
