var express = require('express');
var router = express.Router();
var Video = require('../models/video');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('LivesRouter');
/* eslint-enable */
baseRouter(router, Video);
module.exports = router;
