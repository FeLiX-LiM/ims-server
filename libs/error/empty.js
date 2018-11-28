/**
 * Module dependencies.
 */

var _ = require('lodash');
var BaseError = require('./base-error');
var util = require('util');

/**
 * Constructor.
 */

function EmptyError(message, properties) {
    properties = _.assign(
        {
            code: -1,
            name: 'EMPTY',
            status: 200
        },
        properties
    );

    BaseError.call(this, message, properties);
}

/**
 * Inherit prototype.
 */

util.inherits(EmptyError, BaseError);

/**
 * Export constructor.
 */
module.exports = EmptyError;
