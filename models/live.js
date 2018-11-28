var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var sequence = require('mongoose-sequence')(mongoose);
var schema = new Schema({
    title: String,
    cover: String,
    device: String,
    room: Number,
    record: {
        type: Schema.Types.ObjectId,
        ref: 'record'
    },
    roomType: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'member'
        }
    ]
});
schema.plugin(sequence, { inc_field: 'room' });
schema.plugin(paginate);
module.exports = mongoose.model('live', schema);
