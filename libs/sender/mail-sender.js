var Config = require('config');
var nodemailer = require('nodemailer');
var log4js = require('../../services/log-service');
var logger = log4js.getLogger('MailSender');
var CAPTCHA_OPERATING = require('../enum').CAPTCHA_OPERATING;
var pug = require('pug');
function MailSender() {
    this.transporter = nodemailer.createTransport(Config.Mail);
    this.transporter
        .verify()
        .then(() => {
            logger.debug(Config.Mail);
        })
        .catch(err => {
            logger.error(err);
        });
}
MailSender.prototype.captcha = function(captcha) {
    captcha.operating = CAPTCHA_OPERATING[captcha.operating];
    captcha.title = `您${captcha.operating}的驗證碼是：${captcha.code}`;
    var html = pug.renderFile('views/captcha.pug', captcha);
    this.transporter
        .sendMail({
            from: `"${Config.AppName}" <${Config.Mail.auth.user}>`,
            to: captcha.sendTo,
            subject: captcha.title,
            html: html
        })
        .then(info => {
            logger.debug(info);
            logger.debug(captcha);
        })
        .catch(err => {
            logger.error(err);
        });
};
module.exports = new MailSender();
