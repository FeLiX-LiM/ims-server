var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var schema = new Schema({
    role: String,
    state: Boolean,
    thumbUp: Number,
    microphone: Boolean,
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
schema.plugin(paginate);
module.exports = mongoose.model('member', schema);
