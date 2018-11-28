var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var cors = require('cors');
var i18n = require('i18n');
var log4js = require('./services/log-service');
var serverLogger = log4js.getLogger('Server');
var registerLogger = log4js.getLogger('RegisteredRouter');
var Initializer = require('./libs/initializer');
var unless = require('express-unless');
var reponseModel = require('./libs/respone-model');
var Routers = require('./routes/routes');
var Config = require('config');
log4js.getLogger('NODE_ENV').info(Config.util.getEnv('NODE_ENV'));
i18n.configure({
    locales: ['en', 'zh-HK', 'zh-CN'],
    directory: __dirname + '/locales',
    defaultLocale: 'zh-CN'
});
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
if (Config.Level == 'debug') {
    var toolkit = require('morgan-toolkit')(morgan);
    app.use(toolkit());
} else {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(reponseModel);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cors({
        origin: '*',
        methods: 'PUT,POST,GET,DELETE,OPTIONS'
    })
);
app.use(
    '/api/*',
    unless(Routers.OAUTH2.oauth.authenticate(), {
        path: [/api\/login.*/, /api\/register.*/]
    })
);
for (const key in Routers) {
    if (Routers.hasOwnProperty(key)) {
        const router = Routers[key];
        var contextPath = router.contextPath;
        if (!contextPath) {
            contextPath = `/api/${key.toLowerCase()}`;
        }
        app.use(contextPath, router);
        registerLogger.debug(contextPath);
    }
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

/* eslint-disable */
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    serverLogger.error(err);
    // render the error page

    res.model.error(err);
});
/* eslint-enable */
Initializer.mongoose();
Initializer.oauth();
module.exports = app;
