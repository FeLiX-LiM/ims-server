var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');
var AuthCodeSchema = new Schema({
    code: { type: String, required: true },
    expiresAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'auth_client',
        autopopulate: true
    }
});
AuthCodeSchema.plugin(autopopulate);
module.exports = mongoose.model('auth_code', AuthCodeSchema);
