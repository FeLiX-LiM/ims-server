var moment = require('moment');
var fs = require('fs');
module.exports = {
    Title: 'iMusicShare Server',
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
    ILive: {
        sdk_appid: 1400116723,
        expire_after: 180 * 24 * 3600,
        private_key_string: fs.readFileSync('./keys/private_key'),
        public_key_string: fs.readFileSync('./keys/public_key')
    }
};
