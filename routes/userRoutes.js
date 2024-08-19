const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/getRivals', authController.getRivals);

module.exports = router;