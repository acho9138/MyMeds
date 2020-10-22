const router = require('express').Router();
const userRoutes = require('./user');
const medRoutes = require('./med');

// Routes
router.use('/user', userRoutes);
router.use('/med', medRoutes);

module.exports = router;
