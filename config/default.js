var moment = require('moment');
var fs = require('fs');
module.exports = {
    AppName: 'iMusicShare',
    Port: '8888',
    Salt: {
        rounds: 8
    },
    OAuth2: {
        jwtSigningKey: 'iMusicShare',
        expiresIn: {
            access: moment.duration(18, 'days'),
            refresh: moment.duration(3, 'months')
        }
    },
    Clients: [
        {
            name: 'Web-Management',
            clientId: 'iMusicShare-Management'
        },
        {
            name: 'Web',
            clientId: 'iMusicShare-Web'
        },
        {
            name: 'Android',
            clientId: 'iMusicShare-Android'
        },
        {
            name: 'iOS',
            clientId: 'iMusicShare-iOS'
        }
    ],
    Admin: {
        username: 'admin',
        password: 'admin'
    },
    Captcha: {
        Expire: {
            input: 5,
            unit: 'minutes'
        }
    },
    QCloud: {
        AppId: 1400116723,
        TlsSig: {
            expire_after: 180 * 24 * 3600,
            private_key_string: fs.readFileSync('./keys/private_key'),
            public_key_string: fs.readFileSync('./keys/public_key')
        },
        SMS: {
            AppKey: '0f242c6d6838056e626e55e318d27610',
            '86': { TemplateId: 243348, Sign: '' },
            '852': { TemplateId: 243345, Sign: 'iMusicShare' }
        },
        BizId: 27277
    },
    UploadDir: './file',
    TempDir: './file/temp'
};
