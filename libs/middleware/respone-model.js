var moment = require('moment');
var EmptyError = require('../error/empty');
/* eslint-disable */
var log4js = require('../../services/log-service');
var logger = log4js.getLogger('ResponseModel');
var statuses = require('statuses');
var InvalidRequestError = require('oauth2-server').InvalidRequestError;
/* eslint-enable */
function ResponseModel(respone, next) {
    this.respone = respone;
    this.next = next;
}
ResponseModel.prototype.error = function(err, code) {
    logger.debug(err.name);
    if (err.name === 'ValidationError') {
        err = new InvalidRequestError(err.message);
    }
    var error = {
        code: err.code || err.statusCode || code || -999999,
        status: err.name || 'ERROR',
        timestamp: moment().unix(),
        message: err.message
    };
    if (process.env.NODE_ENV != 'production') {
        error.exception = err.stack;
    }
    error.status = error.status.toUpperCase();
    var status = err.statusCode;
    if (!status || statuses.empty[status]) {
        status = 500;
    }
    this.respone.status(status).json(error);
    return error;
};
ResponseModel.prototype.failure = function(code, message) {
    var failure = {
        code: code || 999999,
        status: 'FAILURE',
        timestamp: moment().unix(),
        message: message
    };
    this.respone.json(failure);
};
ResponseModel.prototype.data = function(data) {
    if (!data) {
        this.next(new EmptyError());
    } else {
        var model = {
            code: 0,
            status: 'SUCCESS',
            timestamp: moment().unix(),
            data: data
        };
        this.respone.json(model);
    }
};
module.exports = function() {
    return function(req, res, next) {
        if (res) {
            res.model = new ResponseModel(res, next);
        }
        if (next) {
            return next();
        }
    };
};
