var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');
var bcrypt = require('mongoose-bcrypt');
var Config = require('config');
var AuthClientSchema = new Schema({
    // 用于识别这个应用
    name: { type: String, required: true },
    // for oauth2.0 flow
    clientId: { type: String, required: true, unique: true },
    // for oauth2.0 flow
    clientSecret: { type: String, required: true, bcrypt: true },
    grants: [String],
    // 创建用户
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
});
AuthClientSchema.plugin(autopopulate);
AuthClientSchema.plugin(bcrypt, Config.Salt);
module.exports = mongoose.model('auth_client', AuthClientSchema);
