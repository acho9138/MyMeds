// Models
const MedDB = require('../models/med');

// Controller
module.exports = {
  add: (req, res) => {
    MedDB.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  edit: (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    MedDB.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    MedDB.findByIdAndRemove(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  get: (req, res) => {
    MedDB.find({ userId: req.params.userId }).sort({ time: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}