const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
