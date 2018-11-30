var fs = require('fs-extra');
function StorageProvider() {}
StorageProvider.prototype.save = function(file, callback) {
    callback(null, file.path);
};
StorageProvider.prototype.remove = function(file, callback) {
    fs.unlink(file.path, callback);
};
module.exports = StorageProvider;
