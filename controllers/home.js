var postman_config  = require('../config/postman_config')[ENV];
var appParams       = postman_config;


/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Shopping List',
    user: req.session.currentUser
  });
};

exports.allParams = function(req, res) {
    res.json(appParams);
};
