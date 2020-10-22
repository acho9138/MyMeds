const mongoose = require('mongoose');

const MedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  strength: String,
  frequency: String,
  startDate: Date,
  endDate: Date
});

const Med = mongoose.model('Med', MedSchema);

module.exports = Med;