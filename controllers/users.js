// Models
const UserDB = require('../models/user');

// Controller
module.exports = {
  login: function (req, res) {
    UserDB.findOne({
      username: req.body.username
    }, (err, person) => {
      if (err) {
        console.log(err);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: true,
          status: 'You are successfully logged in!',
          userId: person.id,
        });
      }

    })
  },
  logout: function (req, res, next) {
    if (req.session) {
      req.logout();
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.clearCookie('session-id');
          res.json({
            message: 'You are successfully logged out!'
          });
        }
      });
    } else {
      const err = new Error('You are not logged in!');
      err.status = 403;
      next(err);
    }
  },
  signup: function (req, res, next) {
    UserDB.register(new UserDB({
      username: req.body.username
    }),
      req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            err: err
          });
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            userId: user._id,
            success: true,
            message: 'Registration Successful!',
          });
        }
      })
  }
}