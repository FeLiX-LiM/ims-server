var Enum = require('enum');
module.exports = new Enum(
    [
        /**
         * 主播
         */
        'HOST',
        /**
         * 观众
         */
        'MEMBER',
        /**
         * 互动者
         */
        'INTERACTOR'
    ],
    {
        ignoreCase: true,
        freez: true
    }
);
