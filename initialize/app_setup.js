var _               = require('underscore');
var cookieParser    = require('cookie-parser');
var compress        = require('compression');
var session         = require('express-session');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var errorHandler    = require('errorhandler');
var csrf            = require('lusca').csrf();
var methodOverride  = require('method-override');

var MongoStore      = require('connect-mongo')({ session: session });
var flash           = require('express-flash');
var path            = require('path');
var mongoose        = require('mongoose');
var passport        = require('passport');
var expressValidator = require('express-validator');
var connectAssets   = require('connect-assets');
var postman_config  = require('../config/postman_config')[ENV];
var postman         = require('rest_postman')(postman_config);

var passportConf    = require('../config/passport');
var queryString     = require('querystring');
var i18n            = require('i18n');

var secrets         = require('../config/secrets');

var homeController = require('../controllers/home');
var userController = require('../controllers/user');
var contactController = require('../controllers/contact');


mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

/**
 * Express configuration.
 */

var hour = 3600000;
var day = hour * 24;
var week = day * 7;

var csrfWhitelist = [
    '/this-url-will-bypass-csrf'
];
module.exports = function (app, express) {
    app.set('views', ROOT + '/views');
    app.set('view engine', 'jade');
    app.use(connectAssets({
        paths: ['public/css', 'public/js'],
        helperContext: app.locals
    }));
    app.use(compress());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(expressValidator());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({
        secret: secrets.sessionSecret,
        store: new MongoStore({
            url: secrets.db,
            auto_reconnect: true
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function(req, res, next) {
        // Conditional CSRF.
        if (_.contains(csrfWhitelist, req.path)) return next();
        csrf(req, res, next);
    });
    app.use(function(req, res, next) {
        res.locals.user = req.user;
        next();
    });
    app.use(flash());
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));


    app.get('/', homeController.index);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/forgot', userController.getForgot);
    app.post('/forgot', userController.postForgot);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
    app.get('/signup', userController.getSignup);
    app.post('/signup', userController.postSignup);

    app.get('/contact', contactController.getContact);
    app.post('/contact', contactController.postContact);

    app.get('/account', passportConf.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

    //
    ///**
    // * OAuth routes for sign-in.
    // */

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));

    app.get('/auth/:providerName/callback', function(req, res, next) {
        postman.get('api', 'sanger/v1/users/auth/' + req.params.providerName + '/callback?' + queryString.stringify(req.query), null,
            GenericOnGetError,
            GenericOnLoginSuccess,
            {passToCallbacks:{req: req, res: res, next: next}});
    });

    app.get('/app_vars', homeController.allParams);

    i18n.configure({
        locales:['en', 'fr', 'he'],
        defaultLocale: 'he',
        cookie: 'locale',
        directory: ROOT + '/config/locales',
        indent: "\t"
    });

    i18n.setLocale('he');

    console.log(i18n.__('Hello'));

    app.use(errorHandler());

};