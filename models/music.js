var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var schema = new Schema({
    id: String,
    name: String,
    singer: String,
    url: String,
    pic: String,
    lrc: String,
    library: String,
    favorite: Boolean,
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    //创建时间
    createAt: {
        type: Date,
        default: Date.now
    }
});
schema.plugin(paginate);
module.exports = mongoose.model('music', schema);
