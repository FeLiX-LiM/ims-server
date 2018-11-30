var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crate = require('mongoose-crate');
var Storage = require('../libs/storage-provider');
//安装GraphicsMagick http://www.graphicsmagick.org/download.html
var GraphicsMagic = require('mongoose-crate-gm');
var Config = require('config');
var schema = new Schema(
    {
        category: String,
        extension: String,
        path: String,
        original: String,
        mimetype: String
    },
    { _id: true }
);
schema.plugin(crate, {
    storage: new Storage(),
    fields: {
        image: {
            processor: new GraphicsMagic({
                tmpDir: Config.TempDir, // Where transformed files are placed before storage, defaults to os.tmpdir()
                transforms: {
                    original: {
                        // keep the original file
                    },
                    small: {
                        resize: '150x150'
                    },
                    medium: {
                        resize: '250x250'
                    }
                }
            })
        },
        file: {}
    }
});
module.exports = mongoose.model('upload', schema);
