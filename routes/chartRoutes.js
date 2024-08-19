const express = require('express');
const router = express.Router();
const authController = require('../controllers/chartControllers');

router.post('/getPlayData', authController.getPlayData);
router.post('/sendPlayData', authController.sendPlayData);
router.post('/getTableDatas', authController.getTableDatas);

module.exports = router;