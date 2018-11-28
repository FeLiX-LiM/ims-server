var Enum = require('enum');
module.exports = new Enum(
    {
        /**
         * QQ音乐
         */
        TENCENT: 'QQ音乐',

        /**
         * 网易云音乐
         */
        NETEASE: '网易云音乐',

        /**
         * 原创音乐
         */
        ORIGINAL: '原创音乐'
    },
    {
        ignoreCase: true,
        freez: true
    }
);
