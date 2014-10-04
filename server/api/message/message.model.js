'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true},
  message: { type: String, required: true},
  date: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', MessageSchema);