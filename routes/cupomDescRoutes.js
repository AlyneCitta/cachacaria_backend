const express = require('express');
const router = express.Router();
const cupomDescController = require('../controllers/cupomDescController'); 


router.get('/:codigo', cupomDescController.getCupomByCod);
router.get('/', cupomDescController.getCupomById);
router.put('/', cupomDescController.setCupomById);

module.exports = router;
