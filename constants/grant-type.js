var Enum = require('enum');
module.exports = new Enum(['authorization_code', 'password'], {
    ignoreCase: true,
    freez: true
});
