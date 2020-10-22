// Node Libraries
const passport = require('passport');
const router = require("express").Router();

// Model
const User = require('../../../models/user');

router.post('/', passport.authenticate('local'), (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, person) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      status: 'You are successfully logged in!',
    });
  })
});

module.exports = router;