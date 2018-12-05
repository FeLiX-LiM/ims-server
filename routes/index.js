var express = require('express');
var router = express.Router();
var Config = require('config');
var randomize = require('randomatic');
var CAPTCHA_OPERATING = require('../libs/enum').CAPTCHA_OPERATING;
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('IndexRouter');
var moment = require('moment');
/* eslint-enable */
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: Config.AppName + ' Server' });
});
router.get('/captcha', function(req, res) {
    var code = randomize('0', 6);
    res.render('captcha', {
        code: code,
        sendTo: 'xinjie.lim@jenmate.com',
        operating: CAPTCHA_OPERATING.LOGIN,
        title: `您${CAPTCHA_OPERATING.LOGIN}的驗證碼是：${code}`
    });
});
router.contextPath = '/';
module.exports = router;
