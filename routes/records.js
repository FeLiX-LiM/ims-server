var express = require('express');
var router = express.Router();
var Record = require('../models/record');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('LivesRouter');
/* eslint-enable */
baseRouter(router, Record);
module.exports = router;
