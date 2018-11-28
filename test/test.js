/* eslint-disable */
var Config = require('config');
var JWT = require('jsonwebtoken');
var uuid = require('uuid/v4');
var oauthConfig = Config.OAuth2;
var log4js = require('../services/log-service');
var loggger = log4js.getLogger('Test');
var TlsSig = require('tls-sig-api');
var crypto = require('crypto');
/* eslint-enable */
loggger.debug(crypto.createHash('md5').update('123456').digest('hex').toUpperCase());