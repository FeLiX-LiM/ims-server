var express = require('express');
var router = express.Router();
var Live = require('../models/live');
var Record = require('../models/record');
var playUrl = require('../libs/play-url');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('LivesRouter');
/* eslint-enable */
router.post('/', (req, res, next) => {
    var model = new Live(req.body);
    model.createBy = res.locals.oauth.token.user.id;
    model
        .save()
        .then(doc => {
            return res.model.data(doc);
        })
        .catch(err => {
            next(err);
        });
});
router.put('/:id', (req, res, next) => {
    delete req.body._id;

    Live.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(doc => {
            var record = {
                live: req.params.id,
                createBy: res.locals.oauth.token.user.id,
            };
            playUrl(record, doc.room, res.locals.oauth.token.user.id);
            Record.findOneAndUpdate({ live: req.params.id }, record, {
                upsert: true,
                new: true
            }).exec();
            return res.model.data(doc);
        })
        .catch(err => {
            next(err);
        });
});
router.delete('/:id', (req, res, next) => {
    var query = { live: req.params.id };
    query.createBy = res.locals.oauth.token.user.id;
    Record.findOneAndUpdate(query, { finish: true }, { new: true })
        .then(doc => {
            return res.model.data(doc);
        })
        .catch(err => {
            next(err);
        });
});
module.exports = router;
