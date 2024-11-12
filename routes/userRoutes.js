const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/add-identification', userController.addIdentification);

module.exports = router;
