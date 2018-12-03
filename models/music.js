var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate-v2');
var autopopulate = require('mongoose-autopopulate');
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
module.exports = mongoose.model('music', schema);
