var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var autopopulate = require('mongoose-autopopulate');
var schema = new Schema({
    streamId: String,
    channelId: String,
    eventType: Number,
    duration: Number,
    fileId: String,
    fileFormat: String,
    videoUrl: String,
    fileSize: String,
    startTime: Number,
    endTime: Number,
    videoId: String,
    streamParam: String,
    groupId: Number,
    publish: Boolean,
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    live: {
        type: Schema.Types.ObjectId,
        ref: 'live',
        autopopulate: true
    }
});
schema.plugin(autopopulate);
schema.plugin(paginate);
module.exports = mongoose.model('video', schema);
