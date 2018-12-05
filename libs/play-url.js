const RTMP_PROTOCOL = 'rtmp://';
const HTTP_PROTOCOL = 'http://';
const URL = '.liveplay.myqcloud.com/live/';
const MAIN_SUFFIX = '_main';
const FLV_SUFFIX = '.flv';
const M3U8_SUFFIX = '.m3u8';
const crypto = require('./crypto');
const Config = require('config');
const BizId = Config.QCloud.BizId;
module.exports = function(record, roomId, userId) {
    const code = BizId + '_' + crypto.md5(roomId + '_' + userId + MAIN_SUFFIX);
    record.rtmpUrl = RTMP_PROTOCOL + BizId + URL + code;
    record.flvUrl = HTTP_PROTOCOL + BizId + URL + code + FLV_SUFFIX;
    record.m3u8Url = HTTP_PROTOCOL + BizId + URL + code + M3U8_SUFFIX;
};
