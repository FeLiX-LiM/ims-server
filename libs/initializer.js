var mongoose = require('mongoose');
var Config = require('config');
var mongooseConfig = Config.Mongoose;
var Client = require('../models/auth-client');
var User = require('../models/user');
var Enums = require('./enum');
var log4js = require('../services/log-service');
var logger = log4js.getLogger('Initializer');
var Bluebird = require('bluebird');
var adminConfig = Config.Admin;
var crypto = require('./crypto');
module.exports = {
    mongoose: function() {
        mongoose.Promise = Bluebird;
        mongoose.connect(
            mongooseConfig.uri,
            mongooseConfig.options
        );
        var connection = mongoose.connection;
        connection.once('open', function() {
            logger.info(mongooseConfig);
        });
        connection.on('error', function(err) {
            logger.error('Mongoose connection error: ', err);
        });
        if (Config.Level == 'debug') {
            mongoose.set('debug', mongooseConfig.debug);
            mongoose.set('toObject', { virtuals: true });
        }
    },
    data: function() {
        User.findOne({ username: adminConfig.username })
            .exec()
            .then(user => {
                if (user) {
                    return user;
                } else {
                    var admin = new User(adminConfig);
                    admin.role = Enums.USER_ROLE[0];
                    admin.password = crypto.md5Hex(admin.password);
                    logger.debug(admin.username, admin.password);
                    return admin.save();
                }
            })
            .then(admin => {
                var clients = Config.Clients;
                clients.forEach(client => {
                    Client.findOne(client)
                        .exec()
                        .then(doc => {
                            if (!doc) {
                                var clientModel = new Client(client);
                                clientModel.grants = Enums.GRANT_TYPE;
                                clientModel.clientSecret = crypto.md5Hex(
                                    clientModel.clientId
                                );
                                clientModel.user = admin.id;
                                clientModel.save().then(() => {});
                                doc = clientModel;
                            }
                            logger.debug(
                                doc.clientId,
                                crypto.md5Hex(doc.clientId)
                            );
                        });
                });
            });
    }
};
