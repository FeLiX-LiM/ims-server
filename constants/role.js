var Enum = require('enum');
module.exports = new Enum(
    [
        //超级管理员
        'ADMINISTRATOR',
        //IMS用户
        'IMS_USER'
    ],
    { ignoreCase: true, freez: true }
);
