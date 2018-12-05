var express = require('express');
var router = express.Router();
var Captcha = require('../models/captcha');
var User = require('../models/user');
var CaptchaError = require('../libs/error/captcha');
var randomize = require('randomatic');
var InvalidRequestError = require('oauth2-server').InvalidRequestError;
var Config = require('config');
var Promise = require('bluebird');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('UsersRouter');
/* eslint-enable */
var sender = {
    email: require('../libs/sender/mail-sender'),
    sms: require('../libs/sender/sms-sender')
};
router.post('/verify', (req, res, next) => {
    Captcha.findOneAndDelete(req.body)
        .then(captcha => {
            if (!captcha) {
                return Promise.reject(
                    new CaptchaError('Captcha Verify:Invalid')
                );
            } else {
                if (captcha.operating === 'REGISTER') {
                    var user = new User({
                        username: captcha.sendTo,
                        password: captcha.code
                    });
                    if (captcha.type === 'sms') {
                        user.mobile = captcha.sendTo;
                    } else {
                        user.email = captcha.sendTo;
                    }
                    user.save();
                }
                return res.model.data(captcha);
            }
        })
        .catch(err => {
            next(err);
        });
});
router.all('/:type', (req, res, next) => {
    var captchaBody = {};
    captchaBody.sendTo = req.body.sendTo || req.query.sendTo;
    if (!captchaBody.sendTo) {
        next(
            new InvalidRequestError(
                'Invalid argument: Missing parameter `sendTo`'
            )
        );
    }
    captchaBody.operating = req.body.operating || req.query.operating;
    Captcha.findOneAndDelete({
        type: req.params.type,
        sendTo: captchaBody.sendTo
    })
        .then(() => {
            var captcha = new Captcha(captchaBody);
            captcha.code = randomize('0', 6);
            captcha.type = req.params.type;
            return captcha.save();
        })
        .then(captcha => {
            captcha.expireHumanize = req.moment
                .duration(
                    Config.Captcha.Expire.input,
                    Config.Captcha.Expire.unit
                )
                .humanize();
            sender[captcha.type].captcha(captcha);
            res.model.data(captcha);
        })
        .catch(err => {
            next(err);
        });
});
module.exports = router;
