var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');
var Schema = mongoose.Schema;
var Config = require('config');
var AuthAccessTokenSchema = new Schema({
    accessToken: { type: String, required: true },
    accessTokenExpiresAt: Date,
    scope: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'auth_client',
        autopopulate: true
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now,
        expires: Config.OAuth2.expiresIn.access.asSeconds()
    }
});
AuthAccessTokenSchema.plugin(autopopulate);
module.exports = mongoose.model('auth_access_token', AuthAccessTokenSchema);
