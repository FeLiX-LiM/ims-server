var log4js = require('log4js');
var Config = require('config');
log4js.configure({
    appenders: {
        console: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%[%c%]: [%d] %p %n%m'
            }
        },
        env: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern:
                    '%[%c%]: [%d] %p %n' +
                    '='.repeat(40) +
                    '%n%[%m%] %n' +
                    '='.repeat(40)
            }
        },
        file: { type: 'file', filename: './logs/error.log' }
    },
    categories: {
        default: { appenders: ['console'], level: Config.Level || 'debug' },
        NODE_ENV: { appenders: ['env'], level: 'info' },
        SERVER: { appenders: ['file', 'console'], level: 'error' }
    }
});
module.exports = log4js;
