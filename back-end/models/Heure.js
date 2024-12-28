const mongoose = require('mongoose');

const HeureSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
});

const Heure = mongoose.model('Heure', HeureSchema);
module.exports = Heure;
