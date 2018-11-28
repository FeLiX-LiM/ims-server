var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('MemberRouter');
/* eslint-enable */
baseRouter(router, Member);
module.exports = router;
