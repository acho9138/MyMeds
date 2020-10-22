// Node Libraries
const router = require('express').Router();

// Controller
const medsController = require('../../controllers/meds');

router.route('/')
  .post(medsController.add);

router.route('/:id')
  .put(medsController.edit);

router.route('/:id')
  .delete(medsController.delete);

module.exports = router;