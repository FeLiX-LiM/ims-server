var express = require('express');
var router = express.Router();
var User = require('../models/user');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('UsersRouter');
/* eslint-enable */
/* GET users listing. */
router.get('/me', (req, res) => {
    return res.model.data(res.locals.oauth.token.user);
});

router.put('/me', (req, res, next) => {
    User.findByIdAndUpdate(res.locals.oauth.user.id, req.body, { new: true })
        .exec()
        .then(user => {
            return res.model.data(user);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                var name = Object.keys(err.errors).join('_');
                logger.debug(name);
                err.code = -10;
                err.name = name + '_error';
            }
            if (err.name === 'MONGOERROR' || err.code == 11000) {
                err.name = 'username_error';
            }
            next(err);
        });
});
baseRouter(router, User);
module.exports = router;
