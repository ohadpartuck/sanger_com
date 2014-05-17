var _ = require('underscore');
var passport = require('passport');
//var InstagramStrategy = require('passport-instagram').Strategy;
//var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy = require('passport-twitter').Strategy;
//var GitHubStrategy = require('passport-github').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//var OAuthStrategy = require('passport-oauth').OAuthStrategy; // Tumblr
//var OAuth2Strategy = require('passport-oauth').OAuth2Strategy; // Venmo, Foursquare
//var User = require('../models/User');
var secrets = require('./secrets');

//passport.serializeUser(function(user, done) {
//  done(null, user.id);
//});
//
//passport.deserializeUser(function(id, done) {
//  User.findById(id, function(err, user) {
//    done(err, user);
//  });
//});


/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a <provider> id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

// Sign in with Facebook.

passport.use(new FacebookStrategy(secrets.facebook, function(req, accessToken, refreshToken, profile, done) {
}));


// Login Required middleware.

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};

// Authorization Required middleware.

exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.findWhere(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};