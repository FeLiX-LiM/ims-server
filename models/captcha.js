var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Validators = require('../libs/validators');
var Enums = require('../libs/enum');
var moment = require('moment');
var CaptchaExpire = require('config').Captcha.Expire;
var schema = new Schema({
    code: String,
    type: { type: String, enum: Enums.CAPTCHA_TYPE },
    createAt: {
        type: Date,
        default: Date.now,
        expires: moment
            .duration(CaptchaExpire.input, CaptchaExpire.unit)
            .asSeconds()
    },
    operating: {
        type: String,
        enum: Object.keys(Enums.CAPTCHA_OPERATING),
        default: 'LOGIN'
    },
    sendTo: {
        type: String,
        required: true,
        validate: {
            validator: Validators.emailOrPhone,
            message: 'error sendTo'
        }
    }
});
module.exports = mongoose.model('captcha', schema);
