var moment = require('moment');
module.exports = function() {
    return function(req, res, next) {
        moment.locale(req.locale);
        req.moment = moment;
        next();
    };
};
