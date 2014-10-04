var schedule = require('node-schedule');
var Slackbot = require('slackbot');
var quotes = require('./handeyQuotes.json');

module.exports = function(app) {
  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(1, 5)];
  rule.hour = 11;
  rule.minute = 43;

  var slackbot = new Slackbot('webtime', '0qmXikAH8MnSgjbZDDy2LcsS');
  var j = schedule.scheduleJob(rule, function(){
      slackbot.send('#general', 'Time Bandits scrum is in 2 minutes: https://zoom.us/j/368835486', function(err, res, body) {
      if(err) return;
      console.log(body);
    });
  });
};