var crypto = require('crypto');
module.exports = {
    md5: function(value) {
        return crypto
            .createHash('md5')
            .update(value)
            .digest('hex');
    },
    md5Hex: function(value) {
        return crypto
            .createHash('md5')
            .update(value)
            .digest('hex')
            .toUpperCase();
    }
};
