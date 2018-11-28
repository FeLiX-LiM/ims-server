var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var schema = new Schema({
    roomType: String,
    rtmpUrl: String,
    flvUrl: String,
    m3u8Url: String,
    longitude: Number,
    latitude: Number,
    address: String,
    finish: Boolean,
    live: {
        type: Schema.Types.ObjectId,
        ref: 'live'
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
});
schema.plugin(paginate);
module.exports = mongoose.model('record', schema);
