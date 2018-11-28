var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');
var Config = require('config');
var AuthRefreshTokenSchema = new Schema({
    refreshToken: { type: String, required: true },
    refreshTokenExpiresAt: Date,
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
        expires: Config.OAuth2.expiresIn.refresh.asSeconds()
    }
});
AuthRefreshTokenSchema.plugin(autopopulate);
module.exports = mongoose.model('auth_refresh_token', AuthRefreshTokenSchema);
