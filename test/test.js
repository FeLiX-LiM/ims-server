/* eslint-disable */
var Config = require('config');
var JWT = require('jsonwebtoken');
var uuid = require('uuid/v4');
var oauthConfig = Config.OAuth2;
var log4js = require('../services/log-service');
var loggger = log4js.getLogger('Test');
var TlsSig = require('tls-sig-api');
var crypto = require('crypto');
var Enums = require('../libs/enum');
var randomize = require('randomatic');
/* eslint-enable */
var XRegExp = require('xregexp');
var interPhone = XRegExp(
    '(?<nation>(CN|HK)-?)(?<code>[\\d|\\S]{2,4})-(?<number>d{7,11})',
    'x'
);
loggger.debug(XRegExp.exec('CN+86-15159596157', interPhone));
