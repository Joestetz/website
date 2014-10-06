/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/messages', require('./api/message'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/reminders', require('./showcase/slackbotReminders/api/reminder'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
  
  // route added for xo
  app.route('/showcase/xo/*')
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/showcase/xo/index.html');
  });
  
  // route added for xo
  app.route('/showcase/slackbotReminders/*')
  .get(function(req, res) {
    res.sendfile(app.get('appPath') + '/showcase/slackbotReminders/index.html');
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
