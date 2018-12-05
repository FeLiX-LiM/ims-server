module.exports = {
    CAPTCHA_TYPE: ['sms', 'email'],
    CAPTCHA_OPERATING: {
        LOGIN: '登錄用戶',
        PASSWORD: '修改密碼',
        BINDING: '綁定用戶',
        REGISTER: '註冊用戶'
    },
    GRANT_TYPE: ['authorization_code', 'password'],
    LIVE_ROLE: [
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
    MUSIC_LIBRARY: ['TENCENT', 'NETEASE', 'ORIGINAL'],
    OS_TYPE: ['iOS', 'Android', 'Windows', 'macOS', 'Browser'],
    USER_ROLE: [
        //超级管理员
        'ADMINISTRATOR',
        //IMS用户
        'IMS_USER'
    ]
};
