var express = require('express');
var router = express.Router();
var ExpressOAuthServer = require('express-oauth-server');
var OAuth2Server = require('oauth2-server');
var OAuth2Service = require('../services/oauth2-service');
var Config = require('config');
var oauthConfig = Config.OAuth2;
var User = require('../models/user');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('AuthRouter');
/* eslint-enable */
router.oauth = new ExpressOAuthServer({
    model: OAuth2Service,
    allowBearerTokensInQueryString: true,
    useErrorHandler: true,
    allowExtendedTokenAttributes: true,
    accessTokenLifetime: oauthConfig.expiresIn.access.asSeconds(),
    refreshTokenLifetime: oauthConfig.expiresIn.refresh.asSeconds()
});
router.post('/login', (req, res, next) => {
    var request = new OAuth2Server.Request(req);
    var response = new OAuth2Server.Response(res);
    router.oauth.server
        .token(request, response)
        .tap(token => {
            logger.debug(token);
            res.locals.oauth = { token: token };
            res.set(response.headers);
            res.status(response.status).model.data(response.body);
        })
        .catch(err => {
            next(err);
        });
});
router.all('/logout', (req, res, next) => {
    OAuth2Service.revokeAccessToken(res.locals.oauth.token)
        .then(token => {
            res.model.data(token);
        })
        .catch(err => {
            next(err);
        });
});
router.post('/register', (req, res, next) => {
    var user = new User(req.body);
    user.save()
        .then(data => {
            res.model.data(data);
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                var name = Object.keys(err.errors).join('_');
                logger.debug(name);
                err.code = -10;
                err.name = name + '_error';
            }
            if (err.name === 'MONGOERROR' || err.code == 11000) {
                err.name = 'username_error';
            }
            next(err);
        });
});
router.contextPath = '/api';
module.exports = router;
