const express = require('express');
const router = express.Router();
const identController = require('../controllers/identController'); 


router.get('/:IdUser', identController.getIdentByIdUser);

module.exports = router;
