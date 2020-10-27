// Node Libraries
const passport = require('passport');
const router = require('express').Router();

// Controller
const userController = require('../../controllers/users');

router.route('/login')
  .post(passport.authenticate('local'), userController.login);

router.route('/logout')
  .get(userController.logout);

router.route('/signup')
  .post(userController.signup);

module.exports = router;