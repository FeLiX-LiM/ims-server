var Enum = require('enum');
module.exports = new Enum(['iOS', 'Android', 'Windows', 'macOS', 'Browser'], {
    ignoreCase: true,
    freez: true
});
