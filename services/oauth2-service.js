var Client = require('../models/auth-client');
var AccessToken = require('../models/auth-access-token');
var RefreshToken = require('../models/auth-refresh-token');
var User = require('../models/user');
var AuthCode = require('../models/auth-code');
var log4js = require('./log-service');
var logger = log4js.getLogger('OAuth2');
var Promise = require('bluebird');
var JWT = require('jsonwebtoken');
var uuid = require('uuid/v4');
var Config = require('config');
var _ = require('lodash');
var oauthConfig = Config.OAuth2;
var attributes = [
    'accessToken',
    'accessTokenExpiresAt',
    'refreshToken',
    'refreshTokenExpiresAt',
    'scope',
    'client',
    'user',
    'user_sig',
    'uid',
    'username'
];
var TlsSig = require('tls-sig-api');
var sign = new TlsSig.Sig(Config.ILive);
module.exports = {
    generateAccessToken: function(client, user, scope) {
        logger.debug('generateAccessToken');
        const payload = {
            username: user.username,
            scope: scope,
            client_id: client.id
        };
        return JWT.sign(payload, oauthConfig.jwtSigningKey, {
            jwtid: uuid(),
            expiresIn: oauthConfig.expiresIn.access.humanize()
        });
    },
    getAccessToken: function(accessToken) {
        logger.debug('getAccessToken');
        return AccessToken.findOne({ accessToken: accessToken }).exec();
    },
    getRefreshToken: function(refreshToken) {
        logger.debug('getRefreshToken');
        return RefreshToken.findOne({ refreshToken: refreshToken }).exec();
    },
    getAuthorizationCode: function(authorizationCode) {
        logger.debug('getAuthorizationCode');
        return AuthCode.findOne({ code: authorizationCode }).exec();
    },
    getClient: function(clientId, clientSecret) {
        logger.debug('getClient');
        var params = { clientId: clientId };
        return Client.findOne(params)
            .exec()
            .then(client => {
                var valid = client.verifyClientSecretSync(clientSecret);
                if (client && !valid) {
                    return;
                }
                return client;
            });
    },
    getUser: function(username, password) {
        logger.debug('getUser');
        return User.findOne({ username: username })
            .exec()
            .then(user => {
                var valid = user.verifyPasswordSync(password);
                if (user && !valid) {
                    return;
                }
                return user;
            });
    },
    getUserFromClient: function(client) {
        logger.debug('getUserFromClient');
        return User.findById(client.user).exec();
    },
    saveToken: function(token, client, user) {
        logger.debug('saveToken');
        var accessToken = new AccessToken(token);
        accessToken.client = client.id;
        accessToken.user = user.id;
        var accessPromise = AccessToken.findOne({ user: user.id })
            .exec()
            .then(doc => {
                if (doc) {
                    return doc;
                } else {
                    user.liveSig = sign.genSig(user.id);
                    User.findByIdAndUpdate(user.id, {
                        liveSig: user.liveSig
                    }).exec();
                    return accessToken.save();
                }
            });
        if (token.refreshToken) {
            var refreshToken = new RefreshToken(token);
            refreshToken.client = client.id;
            refreshToken.user = user.id;
            var refreshPromise = RefreshToken.findOne({ user: user.id })
                .exec()
                .then(doc => {
                    if (doc) {
                        return doc;
                    } else {
                        return refreshToken.save();
                    }
                });
            return Promise.all([accessPromise, refreshPromise]).spread(
                (accessToken, refreshToken) => {
                    var token = Object.assign(
                        refreshToken.toObject(),
                        accessToken.toObject(),
                        {
                            user_sig: user.liveSig,
                            uid: user.id,
                            username: user.username,
                            client: client
                        }
                    );
                    return _.pick(token, attributes);
                }
            );
        } else {
            return accessPromise;
        }
    },
    saveAuthorizationCode: function(code, client, user) {
        logger.debug('saveAuthorizationCode');
        var authCode = new AuthCode(code);
        authCode.code = code.authorizationCode;
        authCode.client = client.id;
        authCode.user = user.id;
        return authCode.save();
    },
    revokeToken: function(token) {
        logger.debug('revokeToken');
        return RefreshToken.findOneAndDelete({
            refreshToken: token.refreshToken
        }).exec();
    },
    revokeAuthorizationCode: function(code) {
        logger.debug('revokeAuthorizationCode');
        return AuthCode.findOneAndDelete({ code: code.code }).exec();
    },
    revokeAccessToken: function(token) {
        logger.debug('revokeAccessToken');
        return AccessToken.findOneAndDelete({
            accessToken: token.accessToken
        }).exec();
    }
};
