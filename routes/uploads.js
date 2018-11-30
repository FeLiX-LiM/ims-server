var express = require('express');
var router = express.Router();
var path = require('path');
var Upload = require('../models/upload');
var InvalidArgumentError = require('oauth2-server').InvalidArgumentError;
var uuid = require('uuid/v4');
var Config = require('config');
var Promise = require('bluebird');
/* eslint-disable */
var log4js = require('../services/log-service');
var logger = log4js.getLogger('FilesRouter');
const url = require('url');
/* eslint-enable */
/* GET home page. */
var fs = require('fs-extra');
var multer = require('multer');
const XRegExp = require('xregexp');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dir = path.join(Config.UploadDir, req.params.category);
        fs.access(dir)
            .then(() => {
                cb(null, dir);
            })
            .catch(() => {
                fs.mkdirs(dir)
                    .then(() => {
                        cb(null, dir);
                    })
                    .catch(err => {
                        cb(err, dir);
                    });
            });
    },
    filename: function(req, file, cb) {
        var extName = path.extname(file.originalname);
        cb(null, uuid().replace(/-/g, '') + extName);
    }
});
var multerHandler = multer({ storage: storage });
router.post('/:category', multerHandler.any(), function(req, res, next) {
    if (!Array.isArray(req.files) || req.files.length == 0) {
        next(new InvalidArgumentError('No files were uploaded.'));
    }
    var promises = req.files.map(file => {
        var upload = new Upload({
            original: file.originalname,
            extension: path.extname(file.originalname),
            category: req.params.category,
            mimetype: file.mimetype
        });
        var tempPath = file.path;
        file.path = path.join(file.destination, upload._id + upload.extension);
        upload.path = url.parse(file.path).path;
        return fs
            .rename(tempPath, file.path)
            .then(() => {
                return upload.attach(
                    XRegExp.test(file.mimetype, /image\/*/) ? 'image' : 'file',
                    file
                );
            })
            .then(() => {
                logger.debug('files');
                return upload.save();
            });
    });
    return Promise.all(promises)
        .then(docs => {
            if (docs.length == 1) {
                res.model.data(docs[0]);
            } else {
                res.model.data(docs);
            }
        })
        .catch(err => {
            req.files.forEach(file => {
                fs.unlink(file.path).then();
            });
            next(err);
        });
});
module.exports = router;
