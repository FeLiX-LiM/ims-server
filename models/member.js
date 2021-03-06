var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var autopopulate = require('mongoose-autopopulate');
var LIVE_ROLE = require('../libs/enum').LIVE_ROLE;
var schema = new Schema({
    role: {
        type: String,
        enum: LIVE_ROLE
    },
    exit: { type: Boolean, default: false },
    thumbUp: Number,
    microphone: Boolean,
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    live: {
        type: Schema.Types.ObjectId,
        ref: 'live'
    }
});
schema.plugin(autopopulate);
schema.plugin(paginate);
module.exports = mongoose.model('member', schema);
