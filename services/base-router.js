var InvalidArgumentError = require('oauth2-server').InvalidArgumentError;
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('BaseRouter');
/* eslint-enable */
function baseRouter(router, Model) {
    if (!router) {
        throw new InvalidArgumentError(
            'Invalid argument: Missing parameter `router`'
        );
    }

    if (!Model) {
        throw new InvalidArgumentError(
            'Invalid argument: Missing parameter `Model`'
        );
    }
    var createBy = !!Model.schema.obj.createBy;
    // logger.debug(Model.collection.name);
    router.get('/', (req, res, next) => {
        Model.find()
            .then(docs => {
                return res.model.data(docs);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/pages', (req, res, next) => {
        if (createBy && res.locals.oauth.token) {
            req.body.query.createBy = res.locals.oauth.token.user.id;
        }
        Model.paginate(req.body.query, req.body.options)
            .then(docs => {
                return res.model.data(docs);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/find', (req, res, next) => {
        if (createBy && res.locals.oauth.token) {
            req.body.createBy = res.locals.oauth.token.user.id;
        }
        Model.find(req.body)
            .then(docs => {
                return res.model.data(docs);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/one', (req, res, next) => {
        if (createBy && res.locals.oauth.token) {
            req.body.createBy = res.locals.oauth.token.user.id;
        }
        Model.findOne(req.body)
            .then(doc => {
                if (!doc) {
                    return res.model.data({});
                } else {
                    return res.model.data(doc);
                }
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/', (req, res, next) => {
        var model = new Model(req.body);
        if (createBy && res.locals.oauth.token) {
            model.createBy = res.locals.oauth.token.user.id;
        }
        model
            .save()
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.get('/:id', (req, res, next) => {
        Model.findById(req.params.id)
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.put('/:id', (req, res, next) => {
        delete req.body._id;
        var query = { _id: req.params.id };
        if (createBy && res.locals.oauth.token) {
            query.createBy = res.locals.oauth.token.user.id;
        }
        Model.findOneAndUpdate(query, req.body, { new: true })
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.delete('/:id', (req, res, next) => {
        var query = { _id: req.params.id };
        if (createBy && res.locals.oauth.token) {
            query.createBy = res.locals.oauth.token.user.id;
        }
        Model.findOneAndDelete(query)
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/delete', (req, res, next) => {
        var query = { _id: req.body };
        if (createBy && res.locals.oauth.token) {
            query.createBy = res.locals.oauth.token.user.id;
        }
        Model.deleteMany(query)
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });
}

module.exports = baseRouter;
