const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController'); 


router.get('/', cityController.getCitiesByName);
router.get('/:IdCity', cityController.getCitiesById);

module.exports = router;
