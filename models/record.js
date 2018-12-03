var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var autopopulate = require('mongoose-autopopulate');
var schema = new Schema({
    rtmpUrl: String,
    flvUrl: String,
    m3u8Url: String,
    longitude: Number,
    latitude: Number,
    address: String,
    finish: { type: Boolean, default: false },
    live: {
        type: Schema.Types.ObjectId,
        ref: 'live',
        autopopulate: true
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
});
schema.plugin(autopopulate);
schema.plugin(paginate);
module.exports = mongoose.model('record', schema);
