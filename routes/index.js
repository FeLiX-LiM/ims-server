var express = require('express');
var router = express.Router();
var Config = require('config');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: Config.Title });
});
router.contextPath = '/';
module.exports = router;
