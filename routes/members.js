var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Live = require('../models/live');
var baseRouter = require('../services/base-router');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('MemberRouter');
/* eslint-enable */
router.post('/:id', (req, res, next) => {
    req.query.createBy = res.locals.oauth.token.user.id;
    Member.findOneAndUpdate(
        { live: req.params.id, createBy: res.locals.oauth.token.user.id },
        req.query,
        {
            upsert: true,
            new: true
        }
    )
        .exec()
        .then(() => {
            return Member.find({ live: req.params.id }).exec();
        })
        .then(docs => {
            return Live.findByIdAndUpdate(req.params.id, {
                members: docs.map(doc => {
                    return doc.id;
                })
            }).exec();
        })
        .then(live => {
            res.model.data(live.members);
        })
        .catch(err => {
            next(err);
        });
});
baseRouter(router, Member);
module.exports = router;
