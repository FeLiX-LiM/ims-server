var Config = require('config');
var log4js = require('../../services/log-service');
var qcloudsms = require('qcloudsms_js');
var logger = log4js.getLogger('SMSSender');
var XRegExp = require('xregexp');
var Promise = require('bluebird');
var CAPTCHA_OPERATING = require('../../libs/enum').CAPTCHA_OPERATING;
var PhoneReg = XRegExp(
    '(?<code>  \\d{2,4} ) -?  # code  \n\
            (?<number>   \\d{7,11} )     # number   ',
    'x'
);
function SMSSender() {
    this.smsSender = qcloudsms(
        Config.QCloud.AppId,
        Config.QCloud.SMS.AppKey
    ).SmsSingleSender();
}
logger.debug(Config.QCloud.AppId, Config.QCloud.SMS.AppKey);
SMSSender.prototype.captcha = function(captcha) {
    var match = XRegExp.exec(captcha.sendTo, PhoneReg);
    captcha.operating = CAPTCHA_OPERATING[captcha.operating];
    var promise = new Promise((resolve, reject) => {
        this.smsSender.send(
            0,
            match.code,
            match.number,
            `【${Config.AppName}】驗證碼: ${captcha.code},有效期${
                captcha.expireHumanize
            }。您正在进行${captcha.operating}，如非本人操作，請忽略此短信。`,
            '',
            '',
            (err, res, data) => {
                if (err) {
                    return reject(err);
                }
                if (data.result != 0) {
                    return reject({
                        req: res.req,
                        data: data
                    });
                }
                return resolve({
                    req: res.req,
                    data: data
                });
            }
        );
    });
    promise
        .then(res => {
            logger.debug(res);
        })
        .catch(err => {
            logger.error(err);
        });
};
module.exports = new SMSSender();
