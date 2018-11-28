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
        Model.paginate(req.body.query, req.body.options)
            .then(docs => {
                return res.model.data(docs);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/find', (req, res, next) => {
        Model.find(req.body)
            .then(docs => {
                return res.model.data(docs);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/', (req, res, next) => {
        var model = new Model(req.body);
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
        var model = new Model(req.body);
        model
            .findByIdAndUpdate(req.params.id, model, { new: true })
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.delete('/:id', (req, res, next) => {
        Model.findByIdAndDelete(req.params.id)
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });

    router.post('/delete', (req, res, next) => {
        Model.deleteMany({ _id: req.body })
            .then(doc => {
                return res.model.data(doc);
            })
            .catch(err => {
                next(err);
            });
    });
}

module.exports = baseRouter;
