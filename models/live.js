var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var sequence = require('mongoose-sequence')(mongoose);
var autopopulate = require('mongoose-autopopulate');
var schema = new Schema({
    title: String,
    cover: String,
    device: String,
    room: Number,
    record: {
        type: Schema.Types.ObjectId,
        ref: 'record'
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'member',
            autopopulate: true
        }
    ],
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
});
schema.plugin(autopopulate);
schema.plugin(sequence, { inc_field: 'room' });
schema.plugin(paginate);
module.exports = mongoose.model('live', schema);
