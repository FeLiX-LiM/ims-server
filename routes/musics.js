var express = require('express');
var router = express.Router();
var Music = require('../models/music');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('LivesRouter');
/* eslint-enable */
baseRouter(router, Music);
module.exports = router;
