var express = require('express');
var router = express.Router();
var Record = require('../models/record');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('LivesRouter');
/* eslint-enable */
router.post('/pages', (req, res, next) => {
    Record.paginate(req.body.query, req.body.options)
        .then(docs => {
            return res.model.data(docs);
        })
        .catch(err => {
            next(err);
        });
});
baseRouter(router, Record);
module.exports = router;
