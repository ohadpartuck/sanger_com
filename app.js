/**
 * Module dependencies.
 */

ROOT = __dirname;
ENV  = (process.env.NODE_ENV || 'DEVELOPMENT').toLowerCase();

require('./initialize/generic_methods/generic_methods.js');

var express = require('express');
var app     = express();

require('./initialize/app_setup')(app, express);


app.listen(9006, function() {
  console.log("✔ Express server listening on port %d in %s mode", 9006, app.get('env'));
});

module.exports = app;
