var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ROLE = require('../constants/role');
var Validators = require('../libs/validators');
var paginate = require('mongoose-paginate-v2');
var bcrypt = require('mongoose-bcrypt');
var Config = require('config');
var schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, bcrypt: true },
    email: {
        type: String,
        validate: { validator: Validators.email, message: 'error email' }
    },
    phone: {
        type: String,
        validate: { validator: Validators.phone, message: 'error phone' }
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    role: { type: String, require: true, default: ROLE.IMS_USER.key },
    status: { type: Boolean, require: true, default: true },
    liveSig: String,
    signature: String,
    avatar: String
});
schema.plugin(paginate);
schema.plugin(bcrypt, Config.Salt);
module.exports = mongoose.model('user', schema);
