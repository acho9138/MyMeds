const mongoose = require('mongoose');

const MedSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  strength: String,
  frequency: String,
  time: String,
  startDate: Date,
  endDate: Date
});

const Med = mongoose.model('Med', MedSchema);

module.exports = Med;