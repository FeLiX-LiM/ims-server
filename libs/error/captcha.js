/**
 * Module dependencies.
 */

var _ = require('lodash');
var BaseError = require('./base-error');
var util = require('util');

/**
 * Constructor.
 */

function CaptchaError(message, properties) {
    properties = _.assign(
        {
            code: -1,
            name: 'Captcha',
            status: 400
        },
        properties
    );

    BaseError.call(this, message, properties);
}

/**
 * Inherit prototype.
 */

util.inherits(CaptchaError, BaseError);

/**
 * Export constructor.
 */
module.exports = CaptchaError;
