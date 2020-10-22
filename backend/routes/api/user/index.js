const router = require("express").Router();
const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");

// Routes
router.use("/login", login);
router.use("/signup", signup);
router.use("/logout", logout);

module.exports = router;
