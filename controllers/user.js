var postman_config  = require('../config/postman_config')[ENV];
var postman         = require('rest_postman')(postman_config);

//var User = require('../models/User');
var appPrefix = 'sanger/v1/users/' ;

/**
 * GET /login
 * Login page.
 */

exports.getLogin = function(req, res) {
  if (isLoggedIn(req)) return res.redirect('/');
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 * @param email
 * @param password
 */

exports.postLogin = function(req, res, next) {
    //TODO add validations on the view in js
    postman.post('api', appPrefix +  'login', req.body,
        GenericOnGetError,
        GenericOnLoginSuccess,
        {passToCallbacks:{req: req, res: res, next: next}});
};

/**
 * GET /logout
 * Log out.
 */

exports.logout = function(req, res, next) {
    postman.get('api', appPrefix + 'logout' , null,
        GenericOnGetError,
        GenericOnLogoutSuccess,
        {passToCallbacks:{req: req, res: res, next: next}});
};

/**
 * GET /signup
 * Signup page.
 */

exports.getSignup = function(req, res) {
  if (isLoggedIn(req)) return res.redirect('/');
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 * @param email
 * @param password
 */

exports.postSignup = function(req, res, next) {
    //TODO add validations on the view in js
    postman.post('api', appPrefix +  'signup', req.body,
        GenericOnGetError,
        GenericOnLoginSuccess,
        {passToCallbacks:{req: req, res: res, next: next}});
};

/**
 * GET /account
 * Profile page.
 */

exports.getAccount = function(req, res) {
  res.render('account/profile', {
    title: 'Account Management'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */

exports.postUpdateProfile = function(req, res, next) {
//  User.findById(req.user.id, function(err, user) {
//    if (err) return next(err);
//    user.email = req.body.email || '';
//    user.profile.name = req.body.name || '';
//    user.profile.gender = req.body.gender || '';
//    user.profile.location = req.body.location || '';
//    user.profile.website = req.body.website || '';
//
//    user.save(function(err) {
//      if (err) return next(err);
//      req.flash('success', { msg: 'Profile information updated.' });
//      res.redirect('/account');
//    });
//  });
};

/**
 * POST /account/password
 * Update current password.
 * @param password
 */

exports.postUpdatePassword = function(req, res, next) {
//  req.assert('password', 'Password must be at least 4 characters long').len(4);
//  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
//
//  var errors = req.validationErrors();
//
//  if (errors) {
//    req.flash('errors', errors);
//    return res.redirect('/account');
//  }
//
//  User.findById(req.user.id, function(err, user) {
//    if (err) return next(err);
//
//    user.password = req.body.password;
//
//    user.save(function(err) {
//      if (err) return next(err);
//      req.flash('success', { msg: 'Password has been changed.' });
//      res.redirect('/account');
//    });
//  });
};

/**
 * POST /account/delete
 * Delete user account.
 * @param id - User ObjectId
 */

exports.postDeleteAccount = function(req, res, next) {

};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth2 provider from the current user.
 * @param provider
 * @param id - User ObjectId
 */

exports.getOauthUnlink = function(req, res, next) {

};

/**
 * GET /reset/:token
 * Reset Password page.
 */

exports.getReset = function(req, res) {

};

/**
 * POST /reset/:token
 * Process the reset password request.
 */

exports.postReset = function(req, res, next) {

};

/**
 * GET /forgot
 * Forgot Password page.
 */

exports.getForgot = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Forgot Password'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 * @param email
 */

exports.postForgot = function(req, res, next) {

};
