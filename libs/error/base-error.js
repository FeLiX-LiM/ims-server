var _ = require('lodash');
var util = require('util');
var statuses = require('statuses');
function BaseError(messageOrError, properties) {
    var message =
        messageOrError instanceof Error
            ? messageOrError.message
            : messageOrError;
    var error = messageOrError instanceof Error ? messageOrError : null;
    if (_.isEmpty(properties)) {
        properties = {};
    }

    _.defaults(properties, { code: 500 });

    if (error) {
        properties.inner = error;
    }
    if (_.isEmpty(message)) {
        message = statuses[properties.code];
    }
    this.code = properties.code;
    this.statusCode = properties.status;
    this.status = properties.name;
    this.message = message;
    for (var key in properties) {
        if (key !== 'code') {
            this[key] = properties[key];
        }
    }
    Error.captureStackTrace(this, BaseError);
}

util.inherits(BaseError, Error);
module.exports = BaseError;
